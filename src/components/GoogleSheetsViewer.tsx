import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  BarChart2, 
  Table as TableIcon, 
  Layers, 
  ArrowUpDown, 
  Info,
  LogOut,
  UserCheck,
  UploadCloud,
  FileCode,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  initAuth, 
  googleSignIn, 
  getAccessToken, 
  logout, 
  setCachedAccessToken 
} from '../lib/googleAuth';
import { 
  fetchSpreadsheetMetadata, 
  fetchSheetValues, 
  extractSpreadsheetId, 
  parseLocalFile,
  DEFAULT_SPREADSHEET_URL, 
  SpreadsheetMetadata, 
  SheetDataResult 
} from '../services/sheetsService';
import { User } from 'firebase/auth';

interface GoogleSheetsViewerProps {
  initialUrl?: string;
  onDataLoaded?: (data: SheetDataResult) => void;
}

export const GoogleSheetsViewer: React.FC<GoogleSheetsViewerProps> = ({
  initialUrl = DEFAULT_SPREADSHEET_URL,
  onDataLoaded
}) => {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Spreadsheet state
  const [sheetUrlInput, setSheetUrlInput] = useState<string>(initialUrl);
  const [metadata, setMetadata] = useState<SpreadsheetMetadata | null>(null);
  const [activeSheetTab, setActiveSheetTab] = useState<string>('');
  const [sheetData, setSheetData] = useState<SheetDataResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [chartMetricIndex, setChartMetricIndex] = useState<number>(1);
  const [chartLabelIndex, setChartLabelIndex] = useState<number>(0);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [sortColIndex, setSortColIndex] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const rowsPerPage = 15;

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        if (token) {
          setAccessToken(token);
          setCachedAccessToken(token);
          // Auto load on login if not yet loaded
          if (!metadata) {
            loadSpreadsheet(sheetUrlInput, token);
          }
        }
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );

    return () => unsubscribe();
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        // Automatically fetch and parse the spreadsheet (Google Sheet or Drive Excel .xlsx)
        loadSpreadsheet(sheetUrlInput, result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in failure:', err);
      setAuthError(err.message || 'Failed to authenticate with Google. Please ensure popups are allowed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setMetadata(null);
    setSheetData(null);
  };

  // Load Spreadsheet metadata and initial sheet (works for both Google Sheets & Drive Excel .xlsx files)
  const loadSpreadsheet = async (urlOrId: string, token: string | null = accessToken) => {
    const spreadsheetId = extractSpreadsheetId(urlOrId);
    if (!spreadsheetId) {
      setErrorMessage('Please provide a valid Google Sheets URL or Spreadsheet ID.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const meta = await fetchSpreadsheetMetadata(spreadsheetId, token);
      setMetadata(meta);

      if (meta.sheets.length > 0) {
        const firstTab = meta.sheets[0].title;
        setActiveSheetTab(firstTab);
        const data = await fetchSheetValues(spreadsheetId, firstTab, 'A1:ZZ1000', token);
        setSheetData(data);
        if (onDataLoaded) onDataLoaded(data);
      }
    } catch (err: any) {
      console.warn('Failed to load spreadsheet:', err);
      setErrorMessage(err.message || 'Unable to access spreadsheet. Please sign in with Google or verify file access.');
    } finally {
      setIsLoading(false);
    }
  };

  // Switch active tab
  const handleTabChange = async (tabName: string) => {
    if (!metadata || tabName === activeSheetTab) return;
    setActiveSheetTab(tabName);
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentPage(1);

    try {
      const data = await fetchSheetValues(metadata.spreadsheetId, tabName, 'A1:ZZ1000', accessToken);
      setSheetData(data);
      if (onDataLoaded) onDataLoaded(data);
    } catch (err: any) {
      console.warn('Failed to load tab values:', err);
      setErrorMessage(err.message || 'Unable to load tab data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle local file upload (.xlsx, .xls, .csv)
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { metadata: fileMeta, firstSheetData } = await parseLocalFile(file);
      setMetadata(fileMeta);
      setSheetUrlInput(file.name);
      setActiveSheetTab(fileMeta.sheets[0]?.title || 'Sheet1');
      setSheetData(firstSheetData);
      if (onDataLoaded) onDataLoaded(firstSheetData);
    } catch (err: any) {
      console.error('Error parsing uploaded file:', err);
      setErrorMessage(err.message || 'Failed to parse file. Please verify it is a valid .xlsx, .xls, or .csv spreadsheet.');
    } finally {
      setIsLoading(false);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Filter and sort rows
  const filteredAndSortedRows = useMemo(() => {
    if (!sheetData) return [];

    let list = sheetData.rows;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(row => row.some(cell => cell.toLowerCase().includes(term)));
    }

    if (sortColIndex !== null) {
      list = [...list].sort((a, b) => {
        const valA = a[sortColIndex] || '';
        const valB = b[sortColIndex] || '';
        const numA = Number(valA.replace(/[$,%]/g, ''));
        const numB = Number(valB.replace(/[$,%]/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortAsc ? numA - numB : numB - numA;
        }
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return list;
  }, [sheetData, searchTerm, sortColIndex, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRows.length / rowsPerPage) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedRows.slice(start, start + rowsPerPage);
  }, [filteredAndSortedRows, currentPage]);

  // Chart data extraction
  const chartData = useMemo(() => {
    if (!sheetData || sheetData.rows.length === 0) return [];

    return filteredAndSortedRows.slice(0, 30).map((row, idx) => {
      const label = row[chartLabelIndex] || `Row ${idx + 1}`;
      const rawVal = row[chartMetricIndex] || '0';
      const numVal = parseFloat(rawVal.replace(/[$,%]/g, '')) || 0;

      return {
        label: label.length > 22 ? label.substring(0, 20) + '…' : label,
        fullLabel: label,
        value: numVal
      };
    });
  }, [sheetData, filteredAndSortedRows, chartLabelIndex, chartMetricIndex]);

  // Export current table to CSV
  const handleExportTableCSV = () => {
    if (!sheetData) return;
    const headerRow = sheetData.headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',');
    const dataRows = filteredAndSortedRows.map(row => 
      row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headerRow, ...dataRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${metadata?.title || 'spreadsheet'}_${activeSheetTab || 'data'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-teal-600 bg-teal-500/5 shadow-lg transition-colors ${
        isDraggingFile ? 'border-dashed border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/30' : ''
      }`} 
      id="google-sheets-data-inspector"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header & Auth Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-teal-600/10 text-teal-700 rounded-2xl border border-teal-600/20 shrink-0">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-teal-500/10 text-teal-800 border border-teal-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Google Sheets & Drive Excel Engine
              </span>
              {metadata?.fileType === 'excel' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-500/10 text-blue-800 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  <FileCode className="w-3 h-3 text-blue-600" />
                  Excel (.xlsx) Mode
                </span>
              )}
              {user ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  OAuth Connected: {user.email || user.displayName || 'Google Account'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3 text-amber-600" />
                  Google Sign-In Ready
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-brand-text font-display">
              Google Spreadsheet & Excel Data Hub
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Live bi-directional parser for Google Sheets and Google Drive Office/Excel files
            </p>
          </div>
        </div>

        {/* Auth & File Actions */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-brand-text border border-brand-border shadow-2xs transition cursor-pointer"
            title="Upload local .xlsx or .csv file"
          >
            <UploadCloud className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Upload File</span>
          </button>

          {!accessToken ? (
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoggingIn}
              className="gsi-material-button flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm transition duration-200 cursor-pointer disabled:opacity-50"
              id="btn-google-signin-sheets"
            >
              <div className="w-4 h-4 shrink-0">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              </div>
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadSpreadsheet(sheetUrlInput, accessToken)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition duration-200 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-200' : ''}`} />
                <span>{isLoading ? 'Loading...' : 'Sync Dataset'}</span>
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-xl bg-white hover:bg-rose-50 text-brand-dim hover:text-rose-600 border border-brand-border transition duration-200 cursor-pointer"
                title="Disconnect Google Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spreadsheet URL Input & Selector */}
      <div className="bg-white/70 p-4 rounded-2xl border border-brand-border/50 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <FileSpreadsheet className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-700 pointer-events-none" />
            <input
              type="text"
              value={sheetUrlInput}
              onChange={(e) => setSheetUrlInput(e.target.value)}
              placeholder="Paste Google Sheets or Drive Excel file URL..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text placeholder:text-brand-dim/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => loadSpreadsheet(sheetUrlInput, accessToken)}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
              <span>Inspect Spreadsheet</span>
            </button>

            {metadata?.spreadsheetUrl && (
              <a
                href={metadata.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-brand-card hover:bg-white text-brand-dim hover:text-brand-text border border-brand-border rounded-xl transition duration-200"
                title="Open in Google Drive"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Active Spreadsheet Details */}
        {metadata && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-border/30 text-xs">
            <div className="flex items-center gap-2 font-medium text-brand-text">
              <span className="font-bold text-teal-800">{metadata.title}</span>
              <span className="text-brand-dim">•</span>
              <span className="text-brand-muted font-mono text-[11px]">{metadata.sheets.length} Sheet Tabs</span>
            </div>

            {/* Dynamic Tabs discovery */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-brand-dim uppercase font-bold mr-1">Tabs:</span>
              {metadata.sheets.map((tab) => (
                <button
                  key={tab.sheetId}
                  onClick={() => handleTabChange(tab.title)}
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition duration-150 cursor-pointer ${
                    activeSheetTab === tab.title
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-brand-input hover:bg-brand-card text-brand-dim hover:text-brand-text border border-brand-border/60'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ERROR OR AUTH REQUIRED BANNER */}
      {authError && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-800 text-xs rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Google Authentication Notice</span>
            <p className="text-rose-700">{authError}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Access Requirement</span>
              <p className="text-amber-800 text-[11px] mt-0.5">{errorMessage}</p>
            </div>
          </div>
          {!accessToken && (
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoggingIn}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs shadow-xs transition shrink-0 cursor-pointer"
            >
              Sign in with Google
            </button>
          )}
        </div>
      )}

      {/* MAIN DATA EXPLORER & CONTROLS */}
      {sheetData && sheetData.headers.length > 0 && (
        <div className="space-y-4">
          {/* Controls Bar: Search, View Mode, Export */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/50 p-3.5 rounded-2xl border border-brand-border/40">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search ${filteredAndSortedRows.length} rows in "${activeSheetTab}"...`}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* View Mode & Export */}
            <div className="flex items-center gap-2">
              <div className="flex bg-brand-input rounded-xl p-1 border border-brand-border">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition duration-150 cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-teal-800 shadow-xs' : 'text-brand-dim hover:text-brand-text'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition duration-150 cursor-pointer ${
                    viewMode === 'chart' ? 'bg-white text-teal-800 shadow-xs' : 'text-brand-dim hover:text-brand-text'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Chart</span>
                </button>
              </div>

              <button
                onClick={handleExportTableCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-brand-text border border-brand-border shadow-2xs transition duration-150 cursor-pointer"
                title="Download CSV"
              >
                <Download className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-brand-border/40 bg-white/80 shadow-2xs">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-brand-dim border-b border-brand-border/40">
                      <th className="py-2.5 px-3 text-center w-12 text-[10px] text-brand-dim/70">#</th>
                      {sheetData.headers.map((header, colIdx) => (
                        <th
                          key={colIdx}
                          onClick={() => {
                            if (sortColIndex === colIdx) {
                              setSortAsc(!sortAsc);
                            } else {
                              setSortColIndex(colIdx);
                              setSortAsc(true);
                            }
                          }}
                          className="py-2.5 px-3 font-semibold text-brand-text hover:bg-slate-200/50 cursor-pointer select-none transition"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{header}</span>
                            <ArrowUpDown className="w-3 h-3 text-brand-dim/50" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/20 text-brand-text">
                    {paginatedRows.length === 0 ? (
                      <tr>
                        <td colSpan={sheetData.headers.length + 1} className="py-8 text-center text-brand-dim">
                          No matching records found.
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((row, rIdx) => {
                        const globalIndex = (currentPage - 1) * rowsPerPage + rIdx + 1;
                        return (
                          <tr key={rIdx} className="hover:bg-teal-500/5 transition duration-150">
                            <td className="py-2 px-3 text-center text-[10px] text-brand-dim/70 font-bold bg-slate-50/50">
                              {globalIndex}
                            </td>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between text-xs text-brand-dim font-mono pt-1">
                <span>
                  Showing {paginatedRows.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{' '}
                  {Math.min(currentPage * rowsPerPage, filteredAndSortedRows.length)} of {filteredAndSortedRows.length} rows
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg bg-white border border-brand-border hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-bold text-brand-text">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg bg-white border border-brand-border hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHART VIEW */}
          {viewMode === 'chart' && (
            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-4 shadow-2xs">
              {/* Chart Series Selectors */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/30 pb-3">
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-brand-dim uppercase font-bold block mb-1">
                      Label Column (X-Axis)
                    </label>
                    <select
                      value={chartLabelIndex}
                      onChange={(e) => setChartLabelIndex(Number(e.target.value))}
                      className="px-2.5 py-1.5 bg-white border border-brand-border rounded-lg text-brand-text font-mono focus:outline-none"
                    >
                      {sheetData.headers.map((h, idx) => (
                        <option key={idx} value={idx}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-brand-dim uppercase font-bold block mb-1">
                      Value Column (Y-Axis)
                    </label>
                    <select
                      value={chartMetricIndex}
                      onChange={(e) => setChartMetricIndex(Number(e.target.value))}
                      className="px-2.5 py-1.5 bg-white border border-brand-border rounded-lg text-brand-text font-mono focus:outline-none"
                    >
                      {sheetData.headers.map((h, idx) => (
                        <option key={idx} value={idx}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex bg-brand-input rounded-xl p-1 border border-brand-border">
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${chartType === 'bar' ? 'bg-white text-teal-800 shadow-xs' : 'text-brand-dim'}`}
                  >
                    Bar Chart
                  </button>
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${chartType === 'line' ? 'bg-white text-teal-800 shadow-xs' : 'text-brand-dim'}`}
                  >
                    Line Chart
                  </button>
                </div>
              </div>

              {/* Chart Render */}
              <div className="h-[320px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="label" angle={-25} textAnchor="end" stroke="#8c7e6b" fontSize={11} interval={0} />
                      <YAxis stroke="#8c7e6b" fontSize={11} />
                      <Tooltip formatter={(value: any) => [value, sheetData.headers[chartMetricIndex]]} />
                      <Legend verticalAlign="top" />
                      <Bar dataKey="value" name={sheetData.headers[chartMetricIndex]} fill="#0f766e" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  ) : (
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="label" angle={-25} textAnchor="end" stroke="#8c7e6b" fontSize={11} interval={0} />
                      <YAxis stroke="#8c7e6b" fontSize={11} />
                      <Tooltip formatter={(value: any) => [value, sheetData.headers[chartMetricIndex]]} />
                      <Legend verticalAlign="top" />
                      <Line type="monotone" dataKey="value" name={sheetData.headers[chartMetricIndex]} stroke="#0f766e" strokeWidth={3} activeDot={{ r: 6 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State when no data is loaded yet */}
      {!sheetData && !isLoading && !errorMessage && (
        <div className="bg-white/40 border border-brand-border/40 rounded-2xl p-8 text-center space-y-3">
          <FileSpreadsheet className="w-10 h-10 mx-auto text-teal-600/60" />
          <h4 className="text-sm font-bold text-brand-text font-display">Ready to Inspect Dataset</h4>
          <p className="text-xs text-brand-muted max-w-md mx-auto">
            Click <strong>"Inspect Spreadsheet"</strong> above to load the sheets, indicators, and charts from your link or drag-and-drop a local .xlsx / .csv file.
          </p>
          <button
            onClick={() => loadSpreadsheet(sheetUrlInput, accessToken)}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-xs transition duration-150 cursor-pointer"
          >
            Load Dataset
          </button>
        </div>
      )}
    </div>
  );
};
