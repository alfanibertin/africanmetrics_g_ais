// Google Sheets & Google Drive Excel (.xlsx / .xls / .csv) Hybrid Service
import * as XLSX from 'xlsx';

export interface SheetTabInfo {
  sheetId: number | string;
  title: string;
  index: number;
  rowCount?: number;
  columnCount?: number;
}

export interface SpreadsheetMetadata {
  spreadsheetId: string;
  title: string;
  spreadsheetUrl: string;
  fileType: 'google-sheet' | 'excel' | 'csv' | 'local';
  sheets: SheetTabInfo[];
}

export interface SheetDataResult {
  spreadsheetId: string;
  sheetTitle: string;
  range: string;
  headers: string[];
  rows: string[][];
  rawValues: any[][];
  numericColumns: { index: number; name: string }[];
  totalRows: number;
  totalColumns: number;
}

export const DEFAULT_SPREADSHEET_ID = '1uTd3pZ2B0i4QKUFUoIQrQjaIz23Wgeuv';
export const DEFAULT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1uTd3pZ2B0i4QKUFUoIQrQjaIz23Wgeuv/edit?usp=drivesdk&ouid=108682097855232590211&rtpof=true&sd=true';

// In-memory cache for parsed Excel / Office workbooks
const workbookCache = new Map<string, { workbook: XLSX.WorkBook; title: string; url: string }>();

/**
 * Extracts Google Sheets spreadsheet ID from a URL or raw ID string.
 */
export function extractSpreadsheetId(input: string): string {
  if (!input) return DEFAULT_SPREADSHEET_ID;
  const trimmed = input.trim();
  
  // Match standard Google Sheets URL pattern: /spreadsheets/d/([a-zA-Z0-9-_]+)
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  
  // Match drive file url: /file/d/([a-zA-Z0-9-_]+)
  const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch && driveMatch[1]) {
    return driveMatch[1];
  }

  // Match id in query param ?id=([a-zA-Z0-9-_]+)
  const idQueryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (idQueryMatch && idQueryMatch[1]) {
    return idQueryMatch[1];
  }
  
  // If it's already a raw ID string
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  
  return DEFAULT_SPREADSHEET_ID;
}

/**
 * Helper to parse a WorkSheet into structured SheetDataResult.
 */
function parseWorksheetToResult(
  spreadsheetId: string,
  sheetTitle: string,
  worksheet: XLSX.WorkSheet
): SheetDataResult {
  const rawValues: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    raw: false,
    dateNF: 'yyyy-mm-dd'
  });

  if (!rawValues || rawValues.length === 0) {
    return {
      spreadsheetId,
      sheetTitle,
      range: 'A1:A1',
      headers: [],
      rows: [],
      rawValues: [],
      numericColumns: [],
      totalRows: 0,
      totalColumns: 0
    };
  }

  // Find the first row that actually has content to use as header
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(rawValues.length, 10); i++) {
    const nonBlankCount = (rawValues[i] || []).filter(c => c !== undefined && c !== null && String(c).trim() !== '').length;
    if (nonBlankCount > 1) {
      headerRowIndex = i;
      break;
    }
  }

  const rawHeaderRow = rawValues[headerRowIndex] || [];
  const maxCols = Math.max(...rawValues.map(r => (r ? r.length : 0)), rawHeaderRow.length, 1);

  const parsedHeaders: string[] = Array.from({ length: maxCols }, (_, idx) => {
    const h = rawHeaderRow[idx];
    return h !== undefined && h !== null && String(h).trim() !== '' 
      ? String(h).trim() 
      : `Column ${idx + 1}`;
  });

  // Data rows are rows after header row
  const rawDataRows = rawValues.slice(headerRowIndex + 1);
  const rows: string[][] = rawDataRows
    .filter(row => row && row.some((c: any) => c !== undefined && c !== null && String(c).trim() !== ''))
    .map(row => {
      return Array.from({ length: maxCols }, (_, idx) => {
        const val = row[idx];
        return val !== undefined && val !== null ? String(val).trim() : '';
      });
    });

  // Identify numeric columns
  const numericColumns: { index: number; name: string }[] = [];
  parsedHeaders.forEach((headerName: string, colIdx: number) => {
    let numericCount = 0;
    let nonBlankCount = 0;

    for (let r = 0; r < Math.min(rows.length, 30); r++) {
      const cellVal = rows[r][colIdx];
      if (cellVal && cellVal.trim() !== '') {
        nonBlankCount++;
        const cleaned = cellVal.replace(/[$,%]/g, '').trim();
        if (!isNaN(Number(cleaned))) {
          numericCount++;
        }
      }
    }

    if (nonBlankCount > 0 && numericCount / nonBlankCount >= 0.6) {
      numericColumns.push({ index: colIdx, name: headerName });
    }
  });

  return {
    spreadsheetId,
    sheetTitle,
    range: `A1:${XLSX.utils.encode_col(maxCols - 1)}${rows.length + 1}`,
    headers: parsedHeaders,
    rows,
    rawValues,
    numericColumns,
    totalRows: rows.length,
    totalColumns: parsedHeaders.length
  };
}

/**
 * Fetch Drive binary file (Excel .xlsx / .xls / .csv) and parse with SheetJS.
 */
async function fetchExcelFromDrive(
  fileId: string,
  accessToken: string
): Promise<SpreadsheetMetadata> {
  const reqHeaders: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`
  };

  // 1. Get file metadata (name, mimeType)
  let fileName = 'Excel Document';
  try {
    const metaRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,size`,
      { headers: reqHeaders }
    );
    if (metaRes.ok) {
      const fileData = await metaRes.json();
      if (fileData.name) fileName = fileData.name;
    }
  } catch (e) {
    console.warn('Could not fetch Drive file metadata:', e);
  }

  // 2. Fetch binary media content
  const mediaRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: reqHeaders }
  );

  if (!mediaRes.ok) {
    const errText = await mediaRes.text();
    let message = `Failed to download file from Google Drive (HTTP ${mediaRes.status})`;
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error?.message) {
        message = errJson.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const arrayBuffer = await mediaRes.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  workbookCache.set(fileId, {
    workbook,
    title: fileName,
    url: `https://docs.google.com/spreadsheets/d/${fileId}/edit`
  });

  const sheets: SheetTabInfo[] = workbook.SheetNames.map((name, idx) => ({
    sheetId: idx,
    title: name,
    index: idx
  }));

  return {
    spreadsheetId: fileId,
    title: fileName,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${fileId}/edit`,
    fileType: 'excel',
    sheets
  };
}

/**
 * Fetch spreadsheet metadata (title and sheet tabs).
 * Seamlessly handles:
 * 1. Native Google Sheets (Sheets API v4)
 * 2. Microsoft Excel (.xlsx/.xls) stored in Google Drive (Drive API v3 media + SheetJS)
 */
export async function fetchSpreadsheetMetadata(
  spreadsheetId: string,
  accessToken?: string | null
): Promise<SpreadsheetMetadata> {
  const cleanId = extractSpreadsheetId(spreadsheetId);

  // Check if we already have it in workbook cache
  if (workbookCache.has(cleanId)) {
    const cached = workbookCache.get(cleanId)!;
    return {
      spreadsheetId: cleanId,
      title: cached.title,
      spreadsheetUrl: cached.url,
      fileType: 'excel',
      sheets: cached.workbook.SheetNames.map((name, idx) => ({
        sheetId: idx,
        title: name,
        index: idx
      }))
    };
  }

  const reqHeaders: Record<string, string> = {};
  if (accessToken) {
    reqHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  // First, attempt standard Google Sheets API v4
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}?fields=spreadsheetId,properties.title,spreadsheetUrl,sheets.properties(sheetId,title,index,gridProperties)`;
    const res = await fetch(url, { headers: reqHeaders });

    if (res.ok) {
      const data = await res.json();
      const sheets: SheetTabInfo[] = (data.sheets || []).map((s: any) => ({
        sheetId: s.properties.sheetId,
        title: s.properties.title,
        index: s.properties.index,
        rowCount: s.properties.gridProperties?.rowCount,
        columnCount: s.properties.gridProperties?.columnCount
      }));

      return {
        spreadsheetId: data.spreadsheetId || cleanId,
        title: data.properties?.title || 'Google Spreadsheet',
        spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${cleanId}`,
        fileType: 'google-sheet',
        sheets
      };
    }

    // Check if error is specifically the Office/Excel file error
    const errText = await res.text();
    let isOfficeFile = false;
    let errMsg = '';
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error?.message || '';
      if (
        errMsg.toLowerCase().includes('office file') ||
        errMsg.toLowerCase().includes('not supported for this document')
      ) {
        isOfficeFile = true;
      }
    } catch {
      errMsg = errText;
    }

    // If it's an Office file or we have a token, attempt Drive API download and SheetJS parsing
    if (isOfficeFile || res.status === 400 || res.status === 404) {
      if (accessToken) {
        return await fetchExcelFromDrive(cleanId, accessToken);
      } else {
        throw new Error(
          'This document is a Microsoft Excel (.xlsx) file in Google Drive. Please click "Sign in with Google" to access and parse the dataset.'
        );
      }
    }

    throw new Error(errMsg || `Google Sheets API Error (${res.status})`);
  } catch (err: any) {
    // If it was already an Excel error and we have accessToken, try Drive fallback
    if (
      accessToken &&
      (err.message?.toLowerCase().includes('office file') ||
        err.message?.toLowerCase().includes('not supported'))
    ) {
      return await fetchExcelFromDrive(cleanId, accessToken);
    }
    throw err;
  }
}

/**
 * Fetch values for a specific sheet/tab and range.
 */
export async function fetchSheetValues(
  spreadsheetId: string,
  sheetTitle: string,
  rangeNotation: string = 'A1:ZZ1000',
  accessToken?: string | null
): Promise<SheetDataResult> {
  const cleanId = extractSpreadsheetId(spreadsheetId);

  // If in Excel workbook cache, parse directly from cached workbook
  if (workbookCache.has(cleanId)) {
    const cached = workbookCache.get(cleanId)!;
    const ws = cached.workbook.Sheets[sheetTitle] || cached.workbook.Sheets[cached.workbook.SheetNames[0]];
    if (!ws) {
      throw new Error(`Sheet tab "${sheetTitle}" not found in Excel workbook.`);
    }
    return parseWorksheetToResult(cleanId, sheetTitle, ws);
  }

  // Otherwise, use Sheets API v4
  const safeRange = sheetTitle.includes(' ') || sheetTitle.includes('-')
    ? `'${sheetTitle.replace(/'/g, "''")}'!${rangeNotation}`
    : `${sheetTitle}!${rangeNotation}`;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/${encodeURIComponent(safeRange)}?valueRenderOption=FORMATTED_VALUE`;

  const reqHeaders: Record<string, string> = {};
  if (accessToken) {
    reqHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, { headers: reqHeaders });
  if (!res.ok) {
    const errText = await res.text();
    let message = `Failed to fetch sheet values (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error?.message) {
        message = errJson.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const data = await res.json();
  const rawValues: any[][] = data.values || [];

  if (rawValues.length === 0) {
    return {
      spreadsheetId: cleanId,
      sheetTitle,
      range: data.range || safeRange,
      headers: [],
      rows: [],
      rawValues: [],
      numericColumns: [],
      totalRows: 0,
      totalColumns: 0
    };
  }

  // Row 0 is assumed to be headers
  const maxCols = Math.max(...rawValues.map(r => r.length));
  const rawHeaderRow = rawValues[0] || [];
  const parsedHeaders: string[] = Array.from({ length: maxCols }, (_, idx) => {
    const h = rawHeaderRow[idx];
    return h !== undefined && h !== null && String(h).trim() !== '' 
      ? String(h).trim() 
      : `Column ${idx + 1}`;
  });

  // Data rows (index 1 to end)
  const rows = rawValues.slice(1).map(row => {
    return Array.from({ length: maxCols }, (_, idx) => {
      const val = row[idx];
      return val !== undefined && val !== null ? String(val) : '';
    });
  });

  // Identify numeric columns
  const numericColumns: { index: number; name: string }[] = [];
  parsedHeaders.forEach((headerName: string, colIdx: number) => {
    let numericCount = 0;
    let nonBlankCount = 0;

    for (let r = 0; r < Math.min(rows.length, 30); r++) {
      const cellVal = rows[r][colIdx];
      if (cellVal && cellVal.trim() !== '') {
        nonBlankCount++;
        const cleaned = cellVal.replace(/[$,%]/g, '').trim();
        if (!isNaN(Number(cleaned))) {
          numericCount++;
        }
      }
    }

    if (nonBlankCount > 0 && numericCount / nonBlankCount >= 0.6) {
      numericColumns.push({ index: colIdx, name: headerName });
    }
  });

  return {
    spreadsheetId: cleanId,
    sheetTitle,
    range: data.range || safeRange,
    headers: parsedHeaders,
    rows,
    rawValues,
    numericColumns,
    totalRows: rows.length,
    totalColumns: parsedHeaders.length
  };
}

/**
 * Parse a local uploaded file (.xlsx, .xls, .csv).
 */
export async function parseLocalFile(file: File): Promise<{
  metadata: SpreadsheetMetadata;
  firstSheetData: SheetDataResult;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const fileId = `local_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

  workbookCache.set(fileId, {
    workbook,
    title: file.name,
    url: ''
  });

  const sheets: SheetTabInfo[] = workbook.SheetNames.map((name, idx) => ({
    sheetId: idx,
    title: name,
    index: idx
  }));

  const metadata: SpreadsheetMetadata = {
    spreadsheetId: fileId,
    title: file.name,
    spreadsheetUrl: '',
    fileType: 'local',
    sheets
  };

  const firstTab = workbook.SheetNames[0] || 'Sheet1';
  const worksheet = workbook.Sheets[firstTab];
  const firstSheetData = parseWorksheetToResult(fileId, firstTab, worksheet);

  return { metadata, firstSheetData };
}
