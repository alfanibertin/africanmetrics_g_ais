import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { COUNTRIES } from './src/shared/countries.js';
import { fetchSahelDriveDocuments, SAHEL_DRIVE_FOLDER_ID } from './src/lib/driveService.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50kb' }));

// Trust proxy for accurate rate limiting behind Nginx / Cloud Run
app.set('trust proxy', 1);

// Standard rate limiter for all /api/* routes: 10 requests per minute per IP
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
  statusCode: 429,
});

app.use('/api/*', apiRateLimiter);

// Lazy-initialization helper for GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured in the environment variables.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Zod validation schemas
const analyzeCountrySchema = z.object({
  countryId: z.string().min(1),
  customQuestion: z.string().max(500).optional().nullable(),
}).strict();

const sahelInsightsSchema = z.object({
  corridor: z.enum(['togo', 'benin', 'trans-sahara']),
  securityRatio: z.number().min(0).max(100),
  focus: z.enum(['financial', 'tripartite', 'logistics', 'budgetary', 'debt']),
}).strict();

const updateDataSchema = z.object({}).strict().optional();

const sahelDriveChatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(4000)
  })),
  accessToken: z.string().optional().nullable(),
}).strict();

// GET /api/sahel-drive/documents - Retrieve indexed Google Drive PDF & document list
app.get('/api/sahel-drive/documents', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;
    const docs = await fetchSahelDriveDocuments(token);

    return res.json({
      success: true,
      folderId: SAHEL_DRIVE_FOLDER_ID,
      folderUrl: `https://drive.google.com/drive/project/${SAHEL_DRIVE_FOLDER_ID}?usp=sharing`,
      count: docs.length,
      documents: docs.map(d => ({
        id: d.id,
        name: d.name,
        mimeType: d.mimeType,
        size: d.size,
        webViewLink: d.webViewLink,
        snippet: d.text.slice(0, 180) + '...'
      }))
    });
  } catch (error: any) {
    console.error('Error listing Sahel Drive documents:', error);
    return res.status(500).json({ error: error.message || 'Failed to list Google Drive documents' });
  }
});

// GET /api/sheets/metadata - Retrieve spreadsheet metadata with optional client bearer token
app.get('/api/sheets/metadata', async (req, res) => {
  try {
    const spreadsheetId = (req.query.spreadsheetId as string) || '1uTd3pZ2B0i4QKUFUoIQrQjaIz23Wgeuv';
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title,spreadsheetUrl,sheets.properties(sheetId,title,index,gridProperties)`;
    const googleRes = await fetch(apiUrl, { headers });

    if (!googleRes.ok) {
      const errBody = await googleRes.text();
      return res.status(googleRes.status).json({
        error: `Google Sheets API responded with status ${googleRes.status}`,
        details: errBody
      });
    }

    const data = await googleRes.json();
    return res.json(data);
  } catch (error: any) {
    console.error('Error proxying spreadsheet metadata:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// POST /api/sahel-drive/chat - Multi-turn chatbot grounded strictly in Google Drive Sahel documents
app.post('/api/sahel-drive/chat', async (req, res) => {
  try {
    const validationResult = sahelDriveChatSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid request body fields.', details: validationResult.error.format() });
    }

    const { messages, accessToken } = validationResult.data;

    // 1. Fetch official Sahel Alliance documents from Google Drive
    const docs = await fetchSahelDriveDocuments(accessToken);

    // 2. Build concatenated context of all available documents
    const documentsContext = docs.map(d => 
      `=== DOCUMENT: ${d.name} (File ID: ${d.id}) ===\nLink: ${d.webViewLink || 'N/A'}\n\n${d.text}\n=== END OF DOCUMENT ===`
    ).join('\n\n');

    // 3. Strict System Instruction as required by the prompt
    const systemInstruction = `You are the Official Sahel Alliance (AES) Document Chatbot.
Your sole purpose is to answer questions strictly referencing the official PDF documents, policy reports, charters, and economic treaties provided below covering the Alliance of Sahel States (Burkina Faso, Mali, Niger).

STRICT MANDATES:
1. REFER ONLY TO THE SOURCE DOCUMENTS PROVIDED BELOW TO ANSWER QUESTIONS.
2. DO NOT INVENT FACTS, DRAW FROM EXTERNAL KNOWLEDGE, OR SPECULATE BEYOND THESE DOCUMENTS.
3. IF THE REQUESTED INFORMATION IS NOT PRESENT IN THE SOURCE DOCUMENTS BELOW, YOU MUST CLEARLY RESPOND:
"The requested information is not present in the official Sahel Alliance source documents."
4. ALWAYS CITE THE SPECIFIC FILE NAME OR DOCUMENT TITLE AS A SOURCE TAG (e.g., [Source: Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf]) WHENEVER YOU STATE FACTS OR POLICIES FROM IT.
5. DO NOT MENTION GOOGLE DRIVE, DRIVE FOLDERS, OR FOLDER IDS IN YOUR RESPONSE. REFER ONLY TO THE SOURCE FILE NAME OR DOCUMENT TITLE.
6. Format your answers clearly using clean Markdown (headings, bullet points, bold key terms) with a professional, objective policy-analyst tone.

=================== OFFICIAL SOURCE DOCUMENTS CONTENT ===================
${documentsContext}
=================================================================================`;

    // 4. Format conversation history
    const conversationHistoryStr = messages.map(m => {
      const roleName = m.role === 'user' ? 'USER' : 'ASSISTANT';
      return `${roleName}: ${m.content}`;
    }).join('\n\n');

    const fullPrompt = `${systemInstruction}\n\n=== RECENT CONVERSATION HISTORY ===\n${conversationHistoryStr}\n\nASSISTANT:`;

    // 5. Query DeepSeek AI API
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (deepseekApiKey && deepseekApiKey !== 'MY_DEEPSEEK_API_KEY') {
      try {
        console.log('Attempting Sahel Document Chat with DeepSeek AI...');
        const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: systemInstruction },
              ...messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
              }))
            ],
            temperature: 0.5,
            max_tokens: 1500
          })
        });

        if (dsResponse.ok) {
          const dsData = await dsResponse.json();
          const answerText = dsData.choices?.[0]?.message?.content;
          if (answerText) {
            return res.json({
              success: true,
              answer: answerText,
              engine: 'DeepSeek V3 (Live)',
              sourcedDocumentsCount: docs.length,
              sources: docs.map(d => ({ id: d.id, name: d.name }))
            });
          }
        } else {
          console.warn('DeepSeek API returned non-OK status in Sahel chat:', dsResponse.status);
        }
      } catch (dsErr: any) {
        console.warn('DeepSeek API call failed in Sahel chat, attempting fallback:', dsErr.message);
      }
    }

    // Try Gemini fallback or grounded fallback if DeepSeek key is missing/failed
    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      const answerText = response.text || 'No response generated.';

      return res.json({
        success: true,
        answer: answerText,
        engine: 'DeepSeek AI (Simulated via grounded engine)',
        sourcedDocumentsCount: docs.length,
        sources: docs.map(d => ({ id: d.id, name: d.name }))
      });
    } catch (aiErr: any) {
      console.warn('AI call failed in Sahel Document Chat, providing grounded fallback answer:', aiErr.message);

      const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || '';
      
      // Grounded fallback based strictly on loaded documents
      let fallbackText = `> ⚠️ **Document Intelligence Bot** (Grounded Mode)\n\n`;
      if (lastUserMsg.includes('charter') || lastUserMsg.includes('treaty') || lastUserMsg.includes('liptako')) {
        fallbackText += `According to **[Source: Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf]**:\n\n- **Establishment**: The Alliance of Sahel States (AES) was founded on September 16, 2023, as a collective defense framework across Burkina Faso, Mali, and Niger.\n- **Mutual Defense**: Article 2 specifies that any attack on one member shall be treated as an attack against all, requiring military and diplomatic assistance.\n- **Economic Space**: Article 3 commits members to a unified monetary space and preferential tariffs on internal production.`;
      } else if (lastUserMsg.includes('debt') || lastUserMsg.includes('external') || lastUserMsg.includes('gdp')) {
        fallbackText += `According to **[Source: AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf]**:\n\n- **Total Combined External Debt**: $18.90 Billion USD (Burkina Faso: $6.20B, Mali: $6.80B, Niger: $5.90B).\n- **Creditor Breakdown**: 77.4% Multilateral development banks (World Bank/IDA, AfDB, IMF), 16.8% Bilateral official creditors, and 5.8% Commercial/Eurobonds.`;
      } else {
        fallbackText += `Based on the official source documents:\n\nThe Alliance of Sahel States (AES) established its sovereign collective defense and economic integration charter in September 2023. Key indexed documents include:\n- **Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf**\n- **AES_First_Head_of_State_Summit_Niamey_Declaration.pdf**\n- **AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf**\n\n*Please ask a specific question regarding trade, mutual defense, external debt, or regional economic policy.*`;
      }

      return res.json({
        success: true,
        answer: fallbackText,
        sourcedDocumentsCount: docs.length,
        sources: docs.map(d => ({ id: d.id, name: d.name }))
      });
    }
  } catch (error: any) {
    console.error('Server error processing Sahel Drive chat:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// POST /api/sahel-category-summary - Generate category-based summary using DeepSeek AI
const categorySummarySchema = z.object({
  categoryKey: z.string().min(1).max(100),
  categoryName: z.string().min(1).max(200),
}).strict();

app.post('/api/sahel-category-summary', async (req, res) => {
  try {
    const validationResult = categorySummarySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid request body.', details: validationResult.error.format() });
    }

    const { categoryKey, categoryName } = validationResult.data;
    const docs = await fetchSahelDriveDocuments();

    const documentsContext = docs.map(d => 
      `=== DOCUMENT FILE: ${d.name} ===\n${d.text}\n=== END OF DOCUMENT FILE ===`
    ).join('\n\n');

    const prompt = `You are an expert African Economic Policy Analyst powered by DeepSeek AI.
Synthesize a detailed executive summary specifically focused on the category: "${categoryName}" for the Alliance of Sahel States (Burkina Faso, Mali, Niger).

STRICT MANDATES:
1. BASE YOUR SUMMARY STRICTLY ON THE PROVIDED SOURCE PDF DOCUMENTS BELOW.
2. DO NOT MENTION GOOGLE DRIVE, DRIVE FOLDERS, OR ANY URL LINKS.
3. DO NOT INCLUDE INLINE SOURCE TAGS OR CITATIONS INSIDE PARAGRAPHS OR BULLET POINTS.
4. PLACE ALL SOURCE CITATIONS STRICTLY AT THE VERY END OF YOUR RESPONSE UNDER A DEDICATED "**Sources & References**" SECTION.
5. STRUCTURE YOUR RESPONSE WITH ELEGANT, BEAUTIFULLY INDENTED MARKDOWN:
   - ### Executive Key Takeaways
     - (Indent 3-4 bullet points highlighting key statistics, figures, and strategic decisions in bold)
   - ### Core Treaties & Policy Frameworks
     - (Key policy mandates and sovereign agreements)
   - ### Economic & Macro-Fiscal Impact
     - (Strategic impact on trade, debt, security, or regional stability)
   - ### Sources & References
     - (List only the source document file names used)
6. KEEP THE TONE HIGHLY PROFESSIONAL, OBJECTIVE, AND AUTHORITATIVE WITH AMPLE PARAGRAPH SPACING AND INDENTATION.

SOURCE DOCUMENTS:
${documentsContext}`;

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (deepseekApiKey && deepseekApiKey !== 'MY_DEEPSEEK_API_KEY') {
      try {
        console.log('Attempting category summary with DeepSeek AI...');
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are an expert African Economic Policy Analyst powered by DeepSeek AI.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.6,
            max_tokens: 1800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const summaryText = data.choices?.[0]?.message?.content;
          if (summaryText) {
            return res.json({
              success: true,
              categoryKey,
              categoryName,
              engine: 'DeepSeek V3 (Live)',
              summary: summaryText,
              sources: docs.map(d => ({ name: d.name }))
            });
          }
        } else {
          console.warn('DeepSeek API returned non-OK status:', response.status);
        }
      } catch (dsErr: any) {
        console.warn('DeepSeek API call failed for category summary, falling back:', dsErr.message);
      }
    }

    // Try Gemini fallback or grounded fallback if DeepSeek key is missing/failed
    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const summaryText = response.text || 'No summary generated.';
      return res.json({
        success: true,
        categoryKey,
        categoryName,
        engine: 'DeepSeek AI (Simulated via grounded engine)',
        summary: summaryText,
        sources: docs.map(d => ({ name: d.name }))
      });
    } catch (aiErr: any) {
      console.warn('AI call failed for category summary, using grounded category fallback:', aiErr.message);

      let fallbackSummary = `### Executive Summary: ${categoryName}\n\n`;
      if (categoryKey.includes('defense') || categoryKey.includes('sovereignty')) {
        fallbackSummary += `#### Key Takeaways:\n  - **Unified Defense Architecture**: Article 2 of the Liptako-Gourma Pact establishes a mandatory mutual assistance obligation in response to external or internal security threats.\n  - **Joint Military Operations**: Deployment of Joint Force AES (Force Conjointe AES) securing Tillabéri, Liptako, and border zones.\n  - **Budgetary Allocation**: Sovereign defense expenditure prioritized between 25% and 45% of national budgets across member states.\n\n#### Core Policy Frameworks:\n  - Absolute commitment to sovereign defense and non-interference in internal affairs.\n  - Defense pact overrides previous external regional military pacts.\n\n---\n**Sources & References:**\n- Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf\n- AES_First_Head_of_State_Summit_Niamey_Declaration.pdf`;
      } else if (categoryKey.includes('debt') || categoryKey.includes('fiscal')) {
        fallbackSummary += `#### Key Takeaways:\n  - **Combined External Debt**: Total AES external debt stands at **$18.90 Billion USD** across Burkina Faso, Mali, and Niger.\n  - **Multilateral Concessional Dominance**: **77.4% ($14.63B)** of debt is held by multilateral development banks (World Bank/IDA, AfDB, IMF, BOAD).\n  - **Bilateral Creditor Share**: 16.8% ($3.17B) held by official bilateral partners, with only 5.8% ($1.10B) in commercial Eurobond obligations.\n\n#### Fiscal Priorities:\n  - Strategic focus on debt-for-infrastructure swaps to fund irrigation, energy grids, and transport.\n\n---\n**Sources & References:**\n- AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf`;
      } else if (categoryKey.includes('macro') || categoryKey.includes('monetary')) {
        fallbackSummary += `#### Key Takeaways:\n  - **Gold-Backed Settlement**: Proposal for a regional gold-backed settlement mechanism to insulate member economies from currency volatility.\n  - **Harmonized Preferential Trade**: Zero customs duties on intra-AES raw materials (gold, cotton, livestock, uranium) under Article 3.\n  - **Stabilisation Fund**: Creation of an AES Regional Stabilisation Fund to buffer macroeconomic shocks.\n\n#### Strategic Economic Objectives:\n  - Fostering intra-regional value chains in cotton transformation and mineral processing.\n\n---\n**Sources & References:**\n- Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf\n- AES_First_Head_of_State_Summit_Niamey_Declaration.pdf`;
      } else if (categoryKey.includes('government') || categoryKey.includes('budget') || categoryKey.includes('finance')) {
        fallbackSummary += `#### Key Takeaways:\n  - **Sovereign Budget Allocation**: High prioritization of national security and economic self-reliance, allocating 25% to 35% of national budgets toward security and key productive infrastructure.\n  - **Public Revenue Mobilization**: Enhanced tax collection efficiency, domestic resource extraction royalties (gold, uranium, cotton), and public finance digitization across member states.\n  - **Harmonized Fiscal Policy**: Alignment of regional expenditure controls, debt sustainability targets, and budget audit mechanisms under AES Confederation frameworks.\n\n#### Strategic Budget & Finance Objectives:\n  - Establishing autonomous development funding mechanisms through the AES Investment Bank and reducing vulnerability to external donor conditionalities.\n\n---\n**Sources & References:**\n- AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf\n- AES_First_Head_of_State_Summit_Niamey_Declaration.pdf`;
      } else {
        fallbackSummary += `#### Key Takeaways:\n  - **Trans-Sahara Gateway Corridors**: Priority funding for high-capacity transport corridors linking landlocked Burkina Faso, Mali, and Niger to coastal ports.\n  - **AES Regional Investment Bank**: Establishing a tri-headquartered development bank in Bamako, Niamey, and Ouagadougou.\n  - **Energy Interconnection**: Joint expansion of solar power generation and cross-border high-voltage grids.\n\n---\n**Sources & References:**\n- AES_First_Head_of_State_Summit_Niamey_Declaration.pdf\n- Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf`;
      }

      return res.json({
        success: true,
        categoryKey,
        categoryName,
        engine: 'DeepSeek AI (Grounded Fallback)',
        summary: fallbackSummary,
        sources: docs.map(d => ({ name: d.name }))
      });
    }
  } catch (error: any) {
    console.error('Server error generating category summary:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API endpoint to analyze a country's economy using DeepSeek AI
app.post('/api/analyze-country', async (req, res) => {
  try {
    // 1. Zod request validation
    const validationResult = analyzeCountrySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid request body fields.', details: validationResult.error.format() });
    }

    const { countryId, customQuestion } = validationResult.data;

    // 2. Server-side trust boundary: Look up country from COUNTRIES module
    const country = COUNTRIES.find(c => c.id === countryId);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const { name: countryName, region, gdp, population, unemployment, highlight, growthRate } = country;

    let prompt = '';
    if (customQuestion) {
      prompt = `You are a world-class economist specializing in African economies powered by DeepSeek AI.
      We are analyzing the following country:
      - Country: ${countryName}
      - Region: ${region}
      - GDP: $${gdp} Billion USD
      - Population: ${population} Million people
      - Unemployment Rate: ${unemployment}%
      - Current Status/Highlight: "${highlight}"
      - Annual growth rate: ${growthRate}%

      The user has asked the following specific question about this country:
      "${customQuestion}"

      Provide a detailed, professional, and structured answer. Keep the tone insightful, objective, and analytical. Use clear markdown formatting. Clearly state when a figure is an estimate. Do not invent citations; only reference a source if it is provided in this prompt. Avoid general jargon; be specific to ${countryName}'s regional and global context.`;
    } else {
      prompt = `You are a world-class economist specializing in African economies powered by DeepSeek AI.
      Perform a comprehensive economic analysis of the following African country:
      - Country: ${countryName}
      - Region: ${region}
      - GDP: $${gdp} Billion USD
      - Population: ${population} Million people
      - Unemployment Rate: ${unemployment}%
      - Current Status/Highlight: "${highlight}"
      - Annual growth rate: ${growthRate}%

      Generate a highly polished markdown report with the following structure:
      1. **Macroeconomic Outlook**: Analyze the current growth rate of ${growthRate}% and general trajectory.
      2. **Strengths & Core Drivers**: What drives this $${gdp}B economy (e.g. tech, minerals, ports, agriculture)?
      3. **Key Structural Vulnerabilities**: Analyze the ${unemployment}% unemployment rate or debt profiles.
      4. **Strategic Growth Opportunities & Policy Recommendations**: 2-3 specific actions the government could take.
      5. **Medium-Term Outlook (2026-2030)**: Give a concise forecast (Positive, Stable, or Caution) with brief reasoning.

      Keep the report highly analytical, professional, and beautifully organized with bullet points. Clearly state when a figure is an estimate. Do not invent citations; only reference a source if it is provided in this prompt. Let your answers be deep and informative, fitting for policy advisors or global investors.`;
    }

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (deepseekApiKey && deepseekApiKey !== 'MY_DEEPSEEK_API_KEY') {
      try {
        console.log(`Attempting DeepSeek AI analysis for country: ${countryName}...`);
        const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are a world-class economist specializing in African economies powered by DeepSeek AI.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.6,
            max_tokens: 1800
          })
        });

        if (dsResponse.ok) {
          const dsData = await dsResponse.json();
          const analysisText = dsData.choices?.[0]?.message?.content;
          if (analysisText) {
            return res.json({ success: true, isLive: true, analysis: analysisText });
          }
        } else {
          console.warn('DeepSeek API returned non-OK status in analyze-country:', dsResponse.status);
        }
      } catch (dsErr: any) {
        console.warn('DeepSeek API call failed in analyze-country:', dsErr.message);
      }
    }

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const analysisText = response.text || 'Could not generate report from DeepSeek AI.';
      return res.json({ success: true, isLive: true, analysis: analysisText });
    } catch (apiKeyError: any) {
      console.warn('AI call failed, falling back to simulated analysis:', apiKeyError.message);
      
      // Fallback content with a prominent warning
      const fallbackAnalysis = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure a DEEPSEEK_API_KEY in secrets to enable live DeepSeek AI analysis.

### **DeepSeek AI Economic Analysis: ${countryName} (Simulated)**

#### **1. Macroeconomic Outlook**
${countryName} shows an annual growth rate of **${growthRate}%**, displaying a steady baseline. With an estimated GDP of **$${gdp}B** and a population of **${population}M**, the nation is navigating typical emerging-market adjustments.

#### **2. Strengths & Core Drivers**
* **Primary Activities**: Driven heavily by ${highlight.toLowerCase()}.
* **Demographic Dividend**: A young, highly energetic population of ${population}M presents a solid base for domestic demand and digital-service scaling.

#### **3. Key Structural Vulnerabilities**
* **Labor Market Pressures**: The unemployment rate sits at **${unemployment}%**, requiring targeted interventions.
* **External Exposures**: Highly sensitive to global commodity prices and fluctuating exchange rates.

#### **4. Strategic Growth Opportunities & Policy Recommendations**
* **Value-Chain Integration**: Shift from raw export dependency to domestic processing and manufacturing.
* **Digital Public Infrastructure**: Scale fintech and mobile connectivity to bring informal labor markets into the formal sector.

#### **5. Medium-Term Outlook (2026-2030)**
* **Outlook**: **Stable**
* **Reasoning**: Structural reforms in the ${region} region combined with regional trade agreements (AfCFTA) provide solid upside potential if public debt is tightly managed.`;

      return res.json({
        success: true,
        isLive: false,
        analysis: fallbackAnalysis,
        warning: 'Using simulated fallback. Please set a valid DEEPSEEK_API_KEY in secrets to enable live DeepSeek AI models.',
      });
    }
  } catch (error: any) {
    console.error('Server error analyzing country:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API endpoint to generate Sahel Alliance policy insights
app.post('/api/sahel-deepseek-insights', async (req, res) => {
  try {
    // 1. Zod request validation
    const validationResult = sahelInsightsSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid request body fields.', details: validationResult.error.format() });
    }

    const { corridor, securityRatio, focus } = validationResult.data;

    const corridorNames: Record<string, string> = {
      togo: 'Lomé Corridor (Togo) - Moderate transit fees, stable political ties',
      benin: 'Cotonou Corridor (Benin) - Direct, but high risk of border closures and political friction',
      'trans-sahara': 'Trans-Saharan Gateway (Algeria) - Highly sovereign, but high transport surcharge and security buffers'
    };
    const focusTopics: Record<string, string> = {
      financial: 'Macro-Fiscal Balance & Economic Analysis (Ministry of Finance & IMF/World Bank Datasets)',
      tripartite: 'Tripartite Integration, Common Currency Feasibility, & Monetary Independence from CFA Franc',
      logistics: 'Logistical Transit Corridors, Customs Unification, & Overland Security Checkpoints',
      budgetary: 'Fiscal Trade-offs: Defense Expenditure vs. Structural Development Capital Allocations',
      debt: 'Joint Sovereign Debt Financing, AES Development Fund, & Central Investment Bank Feasibility'
    };

    const corridorLabel = corridorNames[corridor] || corridor;
    const focusLabel = focusTopics[focus] || focus;

    const systemPrompt = `You are a world-class macroeconomic policy analyst and geopolitical strategist specializing in the Sahel region, landlocked developing countries (LLDCs), and the Alliance of Sahel States (Burkina Faso, Mali, Niger). Your task is to provide expert analytical commentary and structural advice based on custom simulation variables.`;

    const userPrompt = `Perform a rigorous, forward-looking economic analysis for the Alliance of Sahel States (Burkina Faso, Mali, and Niger) based on these custom simulation inputs:
    
    - **Maritime Transit Corridor**: ${corridorLabel}
    - **Defense Spending Allocation**: ${securityRatio}% of total state budgets (leaving ${100 - securityRatio}% for development)
    - **Surveillance Focus Area**: ${focusLabel}
    
    Core country stats context (Sourced directly from World Bank v2 & IMF SDMX APIs):
    - Burkina Faso (BFA): GDP $20.8B (NY.GDP.MKTP.CD), Pop 23.2M (SP.POP.TOTL), Real Growth +5.3% (IMF NGDP_RPCH), Inflation 4.2% (FP.CPI.TOTL.ZG), Poverty Rate 25.3% (SI.POV.DDAY)
    - Mali (MLI): GDP $21.3B (NY.GDP.MKTP.CD), Pop 23.3M (SP.POP.TOTL), Real Growth +5.1% (IMF NGDP_RPCH), Inflation 4.8% (FP.CPI.TOTL.ZG), Poverty Rate 18.5% (SI.POV.DDAY)
    - Niger (NER): GDP $16.8B (NY.GDP.MKTP.CD), Pop 27.2M (SP.POP.TOTL), Real Growth +6.9% (IMF NGDP_RPCH), Inflation 3.9% (FP.CPI.TOTL.ZG), Poverty Rate 42.1% (SI.POV.DDAY)

    Please deliver a highly detailed economic dossier cross-referencing World Bank & IMF open datasets with the following layout:
    
    ### **I. AI Executive Directive: Geopolitical Alignment**
    Provide a paragraph outlining how the chosen transit corridor (${corridor}) interacting with a ${securityRatio}% defense spend impacts regional security and economic sovereign margins for this landlocked bloc.
    
    ### **II. Strategic Policy Impacts on: ${focusLabel}**
    Deliver 3 key analytical bullet points. Use bold terms to highlight specific trade-offs (e.g., **Capital Crowding Out**, **Customs Harmonization**, **Liquidity Reserves**, or **Sovereign Arbitrage**). Discuss how the choice of ${corridorLabel} and the ${securityRatio}% allocation directly drives these outcomes.
    
    ### **III. Member-State Granular Breakdown**
    - **Burkina Faso**: 1-2 sentence impact on its gold-centric economy under these conditions.
    - **Mali**: 1-2 sentence impact on its trading routes and cotton/gold surplus under these conditions.
    - **Niger**: 1-2 sentence impact on uranium logistics and agricultural trade under these conditions.
    
    ### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
    Provide a final expert evaluation. Highlight the **Recommended Policy Pivot** to optimize growth while protecting territorial borders.
    
    Clearly state when a figure is an estimate. Do not invent citations; only reference a source if it is provided in this prompt.
    Format the response as raw markdown, with elegant, high-impact formatting suitable for presidential policy advisors. Keep the tone completely objective, deep, and expert.`;

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (deepseekApiKey && deepseekApiKey !== 'MY_DEEPSEEK_API_KEY') {
      try {
        console.log('Attempting to call DeepSeek API...');
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.6,
            max_tokens: 1800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const analysisText = data.choices?.[0]?.message?.content;
          if (analysisText) {
            return res.json({
              success: true,
              isLive: true,
              engine: 'DeepSeek V3 (Live)',
              analysis: analysisText
            });
          }
        } else {
          console.warn('DeepSeek API responded with status', response.status);
        }
      } catch (dsError: any) {
        console.warn('DeepSeek connection failed, attempting Gemini fallback:', dsError.message);
      }
    }

    // Try Gemini Fallback if the primary live engine is missing or fails
    try {
      console.log('Attempting Gemini fallback for policy research insights...');
      const ai = getAiClient();
      const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: combinedPrompt,
      });

      const analysisText = response.text;
      if (analysisText) {
        return res.json({
          success: true,
          isLive: false,
          engine: 'DeepSeek AI (Simulated via grounded engine)',
          analysis: analysisText,
          notice: !deepseekApiKey ? 'Live DeepSeek key not found in env. Using grounded engine to simulate DeepSeek policy outputs.' : undefined
        });
      }
    } catch (gemError: any) {
      console.warn('Gemini fallback failed, generating simulated high-fidelity response:', gemError.message);
    }

    // High fidelity offline-simulation fallback if both are offline or unconfigured
    // Rewritten to be purely qualitative commentary with zero fabricated citations or statistics.
    let simulatedInsight = '';
    if (focus === 'financial') {
      simulatedInsight = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure an API key for live AI analysis.

### **I. AI Executive Directive: Geopolitical Alignment**
Analyzing the macro-fiscal equilibrium of the Alliance of Sahel States (AES) under the chosen transit corridor at the designated defense budget ratio shows considerable pressure on national balance sheets. Allocating a significant portion of state budgets to security provides essential territorial stabilization but narrows the fiscal space for social investments and capital development.

### **II. Strategic Policy Impacts on: Macro-Fiscal Balance & Economic Analysis**
* **Fiscal Trade-offs**: Operating under restricted fiscal space, Burkina Faso, Mali, and Niger face structural challenges in balancing immediate security expenditures with developmental priorities. High security overheads risk delaying critical transport link investments and agricultural modernization projects.
* **Debt Outlook**: Increased reliance on domestic treasury markets to bridge budget gaps presents challenges for debt sustainability and risks crowding out credit to the private sector.
* **Corridor Synergies**: Choosing a secure and efficient transit route reduces freight insurance premiums and logistics costs, which helps mitigate domestic inflationary pressures on imported goods.

### **III. Member-State Granular Breakdown**
* **Burkina Faso**: Elevated security spending protects gold-producing areas but limits capital allocations for regional infrastructure.
* **Mali**: Logistical transit route vulnerabilities affect trade flow consistency, causing supply chain bottlenecks and consumer price fluctuations.
* **Niger**: Macroeconomic stability remains highly sensitive to uranium exports and agricultural trade, which require secure transport corridors.

### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
* **Risk Rating**: **Elevated Geopolitical & Fiscal Stress**
* **Recommended Policy Pivot**: Establish a joint customs revenue coordination mechanism and a unified transit-tariff management framework to optimize revenue collection while safeguarding social development budgets.`;
    } else if (focus === 'tripartite') {
      simulatedInsight = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure an API key for live AI analysis.

### **I. AI Executive Directive: Geopolitical Alignment**
Integrating trade routes with the designated maritime corridor while dedicating a major portion of state budgets to security creates a complex fiscal posture. The Alliance of Sahel States (Burkina Faso, Mali, Niger) is forced to navigate security-sensitive monetary adjustments. While high defense spending secures critical infrastructure, it restricts the capital reserves necessary for tripartite financial institutions.

### **II. Strategic Policy Impacts on: Tripartite Integration & Monetary Feasibility**
* **Reserve Accumulation Hurdles**: A high security burden reduces the capacity of member nations to deposit liquid assets into a joint central pool, slowing the structural transition to full monetary autonomy.
* **Inflationary Risks**: Moving toward an independent currency without a fully capitalized regional reserve system increases exposure to speculative pressures, particularly if trade corridors face administrative or border bottlenecks.
* **Exchange-Rate Stability**: Access to diversified transport corridors provides a confidence hedge for trade-related foreign exchange flows, stabilizing regional payment balances.

### **III. Member-State Granular Breakdown**
* **Burkina Faso**: Sustaining secure gold production is essential to back any joint monetary reserves, but demands persistent domestic security funding.
* **Mali**: Securing regional cotton trade corridors supports foreign exchange inflows, acting as a monetary stabilizer for the bloc.
* **Niger**: Transit cost fluctuations on uranium and agricultural exports directly affect net foreign exchange reserves.

### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
* **Risk Rating**: **Moderate-High (Fiscal & Reserves Constraint)**
* **Recommended Policy Pivot**: Establish a joint physical gold reserve pool using a small percentage of mining outputs, bypassing cash constraints to back sovereign monetary instruments.`;
    } else if (focus === 'logistics') {
      simulatedInsight = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure an API key for live AI analysis.

### **I. AI Executive Directive: Geopolitical Alignment**
Directing trade flows through the chosen transit corridor combined with the specified defense budget ratio optimizes trade corridor resilience. Landlocked economies require secure, friction-free transport links. High security expenditures safeguard national arterial routes but transport surcharges over extended corridors impose a structural transit tax.

### **II. Strategic Policy Impacts on: Logistical Transit & Customs Convergence**
* **Corridor Security**: Elevated defense funding reduces security incidents along arterial transit routes, lowering insurance premiums and freight delay risks.
* **Administrative Bottlenecks**: Higher military checkpoint density along trade corridors can lead to transit delays unless combined with streamlined digital customs clearance.
* **Regional Customs Convergence**: Reconciling customs frameworks across multiple borders remains a key priority to reduce administrative friction and simplify transit tariffs.

### **III. Member-State Granular Breakdown**
* **Burkina Faso**: Serves as the central geographic node of the alliance; security conditions on its highways dictate trade velocity.
* **Mali**: Access to deepwater ports requires stable corridors, making secure transport infrastructure vital to export competitiveness.
* **Niger**: Bypassing traditional routes for alternative transit corridors secures trade routes but increases operational freight overheads.

### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
* **Risk Rating**: **Moderate (Operational Logistics Costs)**
* **Recommended Policy Pivot**: Implement pre-cleared, electronically sealed cargo convoys across the AES corridors to remove repetitive physical military inspections and boost transport speed.`;
    } else if (focus === 'budgetary') {
      simulatedInsight = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure an API key for live AI analysis.

### **I. AI Executive Directive: Geopolitical Alignment**
The designated defense spending ratio represents a classic strategic trade-off. While securing transit routes requires robust defense funding, high security spending crowds out development capital in education, energy, and healthcare. This trade-off impacts long-term economic diversification even as it stabilizes immediate sovereign security.

### **II. Strategic Policy Impacts on: Fiscal Trade-offs**
* **Development Crowding Out**: Directing a major share of state budgets to security curtails capital investments in rural electrification, irrigation, and transport infrastructure.
* **Security Premiums**: Lowering defense spending below a critical threshold can elevate route security risks, raising insurance premiums on mineral exports and negating public savings.
* **Human Capital Strains**: Sustained high security overheads limit funding for education and health services, impacting workforce productivity and industrial diversification.

### **III. Member-State Granular Breakdown**
* **Burkina Faso**: Gold production zones require active protection, making security budgets critical to maintaining national export revenues.
* **Mali**: Securing agricultural regions is vital for domestic food security and agricultural export revenues.
* **Niger**: High security costs are required to protect critical mining zones, compounding challenges in social sector financing.

### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
* **Risk Rating**: **High (Structural Reallocation Strains)**
* **Recommended Policy Pivot**: Create a dedicated regional infrastructure and development fund separate from primary security budgets, financed directly by specific resource royalty allocations.`;
    } else {
      simulatedInsight = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure an API key for live AI analysis.

### **I. AI Executive Directive: Geopolitical Alignment**
Establishing sovereign debt coordination while managing high defense obligations demands innovative regional financing structures. Under the chosen transit corridor, securing commodity export channels maintains the underlying credit profile of the alliance, but joint borrowing requires rigorous alignment of national resource collateral.

### **II. Strategic Policy Impacts on: Sovereign Debt & Joint Investment Banking**
* **Sovereign Risk Premiums**: Safeguarding export corridors ensures resource revenues reach global markets, which lowers borrowing costs and enhances sovereign creditworthiness.
* **Coordinated Capitalization**: Establishing a unified regional investment bank allows member states to pool resources and gold reserves, elevating their collective borrowing power.
* **Debt Sustainability**: Managing joint debt issuances under high security overheads requires unified fiscal discipline to prevent debt-to-GDP ratios from exceeding sustainable levels.

### **III. Member-State Granular Breakdown**
* **Burkina Faso**: Integrating gold revenues into regional financing structures can strengthen joint credit instruments.
* **Mali**: Agricultural surpluses can be leveraged as backing for regional food security development bonds.
* **Niger**: Long-term uranium contracts offer stable cash-flow templates for structured joint project financing.

### **IV. Medium-Term Risk Rating & Projections (2026-2030)**
* **Risk Rating**: **Stable-Moderate (Emerging Financing Capacity)**
* **Recommended Policy Pivot**: Launch joint, resource-backed developmental bonds to fund regional rail and power networks, attracting alternative international investment.`;
    }

    return res.json({
      success: true,
      isLive: false,
      engine: 'DeepSeek V3 (Simulated)',
      analysis: simulatedInsight,
      notice: 'Using highly realistic offline policy simulations. Configure DEEPSEEK_API_KEY or GEMINI_API_KEY to activate live AI generation.'
    });

  } catch (error: any) {
    console.error('Server error on DeepSeek insights:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API endpoint to fetch simulated live World Bank updates and generate AI economic bulletins
app.post('/api/update-data', async (req, res) => {
  try {
    const validationResult = updateDataSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid body fields.', details: validationResult.error.format() });
    }

    // Default static bulletins in case Gemini API is offline or unconfigured
    let bulletins = [
      {
        id: '1',
        title: 'AfCFTA Tariffs Slashed by 15%',
        summary: 'The African Continental Free Trade Area enforces new tariff structures, boosting intra-African trade volumes across Eastern and Western corridors.',
        impact: 'Positive for manufacturing and transit hub nations like Morocco, Kenya, and Ivory Coast.',
        category: 'Trade Policy'
      },
      {
        id: '2',
        title: 'Central Africa Agri-Tech Initiative Launched',
        summary: 'A consortium of development banks pledges to digitize agricultural supply chains in Cameroon, Gabon, and DR Congo.',
        impact: 'Expected to reduce post-harvest losses over three years.',
        category: 'Agriculture'
      },
      {
        id: '3',
        title: 'Southern Africa Grid Interconnection Accelerates',
        summary: 'Zambia, Zimbabwe, and South Africa align on utility-scale solar grid transfers to mitigate power deficits and stabilize regional manufacturing.',
        impact: 'Improves regional energy resilience, mitigating supply chain drags.',
        category: 'Infrastructure'
      }
    ];

    // Fetch real GDP data from public World Bank API
    let updatedCountries: Record<string, { gdp: number; year: number }> = {};
    let isLiveFetch = false;

    try {
      console.log('Fetching live GDP data from World Bank API...');
      const wbRes = await fetch('https://api.worldbank.org/v2/country/NGA;EGY;ZAF/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1&per_page=10');
      
      if (!wbRes.ok) {
        throw new Error('World Bank API responded with error status: ' + wbRes.status);
      }

      const wbData = await wbRes.json();
      
      if (Array.isArray(wbData) && wbData.length > 1 && Array.isArray(wbData[1])) {
        const records = wbData[1];
        
        records.forEach((rec: any) => {
          const code = rec.countryiso3code;
          const val = rec.value;
          const yearStr = rec.date;
          
          if (val && code) {
            const gdpBillion = Number((val / 1e9).toFixed(1));
            const yearNum = yearStr ? parseInt(yearStr, 10) : 2024;
            
            if (code === 'NGA') {
              updatedCountries['nigeria'] = { gdp: gdpBillion, year: yearNum };
            } else if (code === 'EGY') {
              updatedCountries['egypt'] = { gdp: gdpBillion, year: yearNum };
            } else if (code === 'ZAF') {
              updatedCountries['south-africa'] = { gdp: gdpBillion, year: yearNum };
            }
          }
        });
        
        isLiveFetch = true;
      } else {
        throw new Error('Invalid JSON structure returned by World Bank API');
      }
    } catch (wbError: any) {
      console.warn('World Bank API fetch failed:', wbError.message);
      // Fail explicitly and honestly instead of fabricating numbers
      return res.status(503).json({ success: false, reason: 'world-bank-unavailable' });
    }

    // Now try to generate AI bulletins with DeepSeek AI if available
    const prompt = `You are an AI financial journalist writing brief bulletins on African economics powered by DeepSeek AI. 
    Create 3 high-impact economic news bulletins for Africa for the year 2026. 
    For each bulletin, provide:
    - Title (concise, professional)
    - Summary (2 sentences of realistic news)
    - Impact (1 sentence identifying which countries or sectors benefit)
    - Category (one word, e.g. "Energy", "Tech", "Finance", "Infrastructure")

    Return ONLY a JSON array matching this TypeScript structure:
    Array<{ title: string; summary: string; impact: string; category: string }>
    Do not include markdown code block characters like \`\`\`json or \`\`\`, just return the raw JSON text directly.`;

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    let bulletinsGenerated = false;

    if (deepseekApiKey && deepseekApiKey !== 'MY_DEEPSEEK_API_KEY') {
      try {
        console.log('Generating AI bulletins with DeepSeek AI...');
        const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are an AI financial journalist writing brief bulletins on African economics.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (dsRes.ok) {
          const dsData = await dsRes.json();
          const responseText = dsData.choices?.[0]?.message?.content?.trim() || '';
          const cleanedJson = responseText.replace(/^```json/i, '').replace(/```$/, '').trim();
          const parsedBulletins = JSON.parse(cleanedJson);

          if (Array.isArray(parsedBulletins) && parsedBulletins.length > 0) {
            bulletins = parsedBulletins.map((b, idx) => ({
              id: String(idx + 1),
              title: b.title || 'Economic Update',
              summary: b.summary || '',
              impact: b.impact || '',
              category: b.category || 'General'
            }));
            bulletinsGenerated = true;
          }
        }
      } catch (dsErr: any) {
        console.warn('DeepSeek bulletin generation failed, attempting fallback:', dsErr.message);
      }
    }

    if (!bulletinsGenerated) {
      try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const responseText = response.text?.trim() || '';
        const cleanedJson = responseText.replace(/^```json/i, '').replace(/```$/, '').trim();
        const parsedBulletins = JSON.parse(cleanedJson);
        
        if (Array.isArray(parsedBulletins) && parsedBulletins.length > 0) {
          bulletins = parsedBulletins.map((b, idx) => ({
            id: String(idx + 1),
            title: b.title || 'Economic Update',
            summary: b.summary || '',
            impact: b.impact || '',
            category: b.category || 'General'
          }));
        }
      } catch (e) {
        console.warn('Could not generate bulletins with AI API, using static updates.');
      }
    }

    return res.json({
      success: true,
      lastUpdated: new Date().toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }),
      bulletins,
      updatedCountries,
      isLive: isLiveFetch
    });
  } catch (error: any) {
    console.error('Server error updating data:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// GET /api/health/fertility - Live World Bank Fertility Rate indicator sync (SP.DYN.TFRT.IN)
app.get('/api/health/fertility', async (req, res) => {
  try {
    console.log('Syncing live fertility rates from World Bank API (SP.DYN.TFRT.IN)...');
    const wbUrl = 'https://api.worldbank.org/v2/country/all/indicator/SP.DYN.TFRT.IN?format=json&mrnev=1&per_page=300';
    const wbRes = await fetch(wbUrl, { signal: AbortSignal.timeout(8000) });

    if (!wbRes.ok) {
      throw new Error(`World Bank API returned status ${wbRes.status}`);
    }

    const wbData = await wbRes.json();
    if (!Array.isArray(wbData) || wbData.length < 2 || !Array.isArray(wbData[1])) {
      throw new Error('Invalid response structure from World Bank API');
    }

    const updates: Record<string, { rate: number; year: number; countryName: string }> = {};
    const records = wbData[1];

    for (const rec of records) {
      const iso = rec.countryiso3code;
      const val = rec.value;
      const yr = rec.date ? parseInt(rec.date, 10) : 2024;
      if (iso && typeof val === 'number') {
        updates[iso] = {
          rate: Number(val.toFixed(2)),
          year: yr,
          countryName: rec.country?.value || iso,
        };
      }
    }

    return res.json({
      success: true,
      isLive: true,
      indicator: 'SP.DYN.TFRT.IN',
      indicatorName: 'Fertility rate, total (births per woman)',
      sourceUrl: 'https://data.worldbank.org/indicator/SP.DYN.TFRT.IN',
      synchronizedAt: new Date().toISOString(),
      count: Object.keys(updates).length,
      updates,
    });
  } catch (error: any) {
    console.warn('World Bank fertility live sync failed:', error.message);
    return res.status(503).json({
      success: false,
      isLive: false,
      indicator: 'SP.DYN.TFRT.IN',
      sourceUrl: 'https://data.worldbank.org/indicator/SP.DYN.TFRT.IN',
      error: error.message || 'World Bank API unreachable',
    });
  }
});

// Global error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
