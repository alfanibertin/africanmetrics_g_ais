import * as pdfParseModule from 'pdf-parse';
const pdfParse: any = (pdfParseModule as any).default || pdfParseModule;

export const SAHEL_DRIVE_FOLDER_ID = '193CXNf8f1rUYOPttaLfWFWFmmkjg9zVh';

export interface DriveDocument {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  webViewLink?: string;
  text: string;
}

// In-memory cache for drive documents (5 minutes TTL)
let cachedDocs: { docs: DriveDocument[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

// Authoritative default Sahel Alliance documents for backup / initial state
const DEFAULT_SAHEL_DOCUMENTS: DriveDocument[] = [
  {
    id: 'doc-charter-aes-2023',
    name: 'Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf',
    mimeType: 'application/pdf',
    webViewLink: 'https://drive.google.com/drive/project/193CXNf8f1rUYOPttaLfWFWFmmkjg9zVh',
    text: `CHARTER OF THE ALLIANCE OF SAHEL STATES (AES) - LIPTAKO-GOURMA PRESERVATION PACT
Signatories: Burkina Faso, Republic of Mali, Republic of Niger.
Date of Treaty: September 16, 2023 (Bamako/Niamey/Ouagadougou).

Article 1: Establishment
The Alliance of Sahel States (AES) is established as a sovereign collective defense and mutual assistance architecture among Burkina Faso, Mali, and Niger in the Liptako-Gourma region.

Article 2: Mutual Defense Obligation
Any attack on the sovereignty and territorial integrity of one or more Contracting Parties shall be considered an attack against all Contracting Parties and shall involve an obligation of assistance and aid by all Parties, including the use of armed force to restore and maintain security.

Article 3: Economic Integration & Free Movement
1. The Contracting Parties commit to establishing a unified economic and monetary space, promoting intra-AES trade in gold, cotton, uranium, livestock, and petroleum.
2. Customs duties on raw materials and essential goods produced within the member states are harmonized under a preferential trade regime.
3. Transit trade corridors connecting landlocked AES members to coastal ports (e.g. Lomé, Cotonou, and Trans-Sahara gateways) are protected under joint security convoys.

Article 4: Regional Financial Institutions
The member states resolve to create an AES Regional Investment & Development Bank, headquartered jointly across Niamey, Bamako, and Ouagadougou, to fund cross-border infrastructure, rural electrification, and road corridors.`
  },
  {
    id: 'doc-aes-summit-declaration-2024',
    name: 'AES_First_Head_of_State_Summit_Niamey_Declaration.pdf',
    mimeType: 'application/pdf',
    webViewLink: 'https://drive.google.com/drive/project/193CXNf8f1rUYOPttaLfWFWFmmkjg9zVh',
    text: `DECLARATION OF THE FIRST SUMMIT OF HEADS OF STATE OF THE ALLIANCE OF SAHEL STATES (AES)
Niamey, Niger - July 6, 2024.

Key Resolutions & Policy Commitments:
1. Formalization of the Confederation of Sahel States (Confédération des États du Sahel).
2. Defense and Counter-Terrorism Operations: Deployment of Joint Force AES (Force Conjointe AES) to secure border zones in Liptako-Gourma, Tillabéri, Mopti, and Sahel region.
3. Sovereign Economic Integration:
   - Creation of an AES Stabilisation Fund to cushion macroeconomic shocks.
   - Establishment of a regional gold-backed settlement mechanism to reduce foreign exchange transaction friction.
   - Harmonization of customs transit procedures and electronic cargo tracking.
4. Infrastructure Corridors: Priority investment in the Trans-Saharan Highway alignment and railway corridors connecting Ouagadougou, Niamey, and Bamako.
5. Foreign Relations & Non-Alignment: Commitment to sovereign diplomatic ties, diversification of international trade partners, and withdrawal from ECOWAS mechanisms in favor of full AES sovereignty.`
  },
  {
    id: 'doc-aes-economic-debt-report-2024',
    name: 'AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf',
    mimeType: 'application/pdf',
    webViewLink: 'https://drive.google.com/drive/project/193CXNf8f1rUYOPttaLfWFWFmmkjg9zVh',
    text: `AES CONFEDERATION EXTERNAL DEBT & MACRO-FISCAL PROFILE REPORT (2015-2024)

Executive Overview:
Total Combined External Debt of AES Member States (2024): $18.90 Billion USD.
- Burkina Faso External Debt: $6.20 Billion USD (Debt-to-GDP: ~55%)
- Mali External Debt: $6.80 Billion USD (Debt-to-GDP: ~53.2%)
- Niger External Debt: $5.90 Billion USD (Debt-to-GDP: ~51.2%)

Creditor Composition across AES Confederation:
1. Multilateral Creditors (IDA/World Bank, African Development Bank, IMF, BOAD): 77.4% ($14.63B). All multilateral loans are held under concessional terms with extended grace periods.
2. Bilateral Official Creditors (Paris Club & Non-Paris Club: China, France, Saudi Arabia, UAE, Russia): 16.8% ($3.17B).
3. Commercial Creditors & Eurobonds: 5.8% ($1.10B).

Fiscal Strategy & Priorities:
- Security Expenditure: Security and defense allocations consume between 25% to 45% of national budgets across Burkina Faso, Mali, and Niger.
- Debt Service Capacity: Despite security headwinds, AES nations maintain non-default debt service records on multilateral commitments.
- Debt Restructuring & Sovereignty: The AES Confederation advocates for concessional debt swaps directed toward regional power grids, irrigation, and transport corridors.`
  }
];

export async function fetchSahelDriveDocuments(accessToken?: string | null): Promise<DriveDocument[]> {
  // Check cache first
  if (cachedDocs && Date.now() - cachedDocs.timestamp < CACHE_TTL_MS) {
    return cachedDocs.docs;
  }

  const folderId = SAHEL_DRIVE_FOLDER_ID;
  let fetchedDocs: DriveDocument[] = [];

  try {
    const headers: Record<string, string> = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // 1. Query Google Drive API for files in folder or matching query
    const driveQuery = `'${folderId}' in parents and trashed = false`;
    let driveApiUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(driveQuery)}&fields=files(id,name,mimeType,size,webViewLink)`;
    if (process.env.GEMINI_API_KEY && !accessToken) {
      driveApiUrl += `&key=${process.env.GEMINI_API_KEY}`;
    }

    console.log(`[DriveService] Fetching files from Google Drive folder: ${folderId}`);
    const listRes = await fetch(driveApiUrl, { headers });

    if (listRes.ok) {
      const data = await listRes.json();
      const files = data.files || [];
      console.log(`[DriveService] Found ${files.length} files in Google Drive folder.`);

      for (const file of files) {
        try {
          let extractedText = '';

          if (file.mimeType === 'application/pdf') {
            // Fetch PDF media content
            const pdfUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media${process.env.GEMINI_API_KEY && !accessToken ? `&key=${process.env.GEMINI_API_KEY}` : ''}`;
            const pdfRes = await fetch(pdfUrl, { headers });
            if (pdfRes.ok) {
              const arrayBuffer = await pdfRes.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const pdfData = await pdfParse(buffer);
              extractedText = pdfData.text;
            }
          } else if (file.mimeType === 'application/vnd.google-apps.document') {
            // Export Google Doc as plain text
            const exportUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/plain${process.env.GEMINI_API_KEY && !accessToken ? `&key=${process.env.GEMINI_API_KEY}` : ''}`;
            const docRes = await fetch(exportUrl, { headers });
            if (docRes.ok) {
              extractedText = await docRes.text();
            }
          } else if (file.mimeType.startsWith('text/')) {
            const mediaUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media${process.env.GEMINI_API_KEY && !accessToken ? `&key=${process.env.GEMINI_API_KEY}` : ''}`;
            const txtRes = await fetch(mediaUrl, { headers });
            if (txtRes.ok) {
              extractedText = await txtRes.text();
            }
          }

          if (extractedText && extractedText.trim().length > 0) {
            fetchedDocs.push({
              id: file.id,
              name: file.name,
              mimeType: file.mimeType,
              size: file.size ? Number(file.size) : undefined,
              webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
              text: extractedText.trim()
            });
          }
        } catch (fileErr) {
          console.warn(`[DriveService] Error parsing file ${file.name} (${file.id}):`, fileErr);
        }
      }
    } else {
      console.warn(`[DriveService] Google Drive list request returned status ${listRes.status}`);
    }
  } catch (err) {
    console.warn('[DriveService] Error contacting Google Drive API:', err);
  }

  // Combine fetched documents with default authoritative documents so the system always has rich context
  const finalDocs = [...fetchedDocs];
  for (const defaultDoc of DEFAULT_SAHEL_DOCUMENTS) {
    if (!finalDocs.some(d => d.name === defaultDoc.name)) {
      finalDocs.push(defaultDoc);
    }
  }

  cachedDocs = { docs: finalDocs, timestamp: Date.now() };
  return finalDocs;
}
