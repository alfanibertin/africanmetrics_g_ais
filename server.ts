import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { COUNTRIES } from './src/shared/countries.js';

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

// API endpoint to analyze a country's economy using Gemini API
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
      prompt = `You are a world-class economist specializing in African economies.
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
      prompt = `You are a world-class economist specializing in African economies.
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

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const analysisText = response.text || 'Could not generate report from Gemini API.';
      return res.json({ success: true, isLive: true, analysis: analysisText });
    } catch (apiKeyError: any) {
      console.warn('Gemini API call failed, falling back to simulated analysis:', apiKeyError.message);
      
      // Fallback content with a prominent warning
      const fallbackAnalysis = `> ⚠️ SIMULATED SCENARIO — illustrative analysis only. No figures below are sourced. Configure a Gemini API key for live AI analysis.

### **AI Economic Analysis: ${countryName} (Simulated)**

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
        warning: 'Using simulated fallback. Please set a valid GEMINI_API_KEY in secrets to enable live Gemini AI models.',
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
    
    Core country stats context:
    - Burkina Faso: GDP $18.3B, Pop 22.6M, Growth +3.2%, Unemployment 6.4%, Debt 55%
    - Mali: GDP $20.1B, Pop 22.5M, Growth +3.5%, Unemployment 7.9%, Debt 53.2%
    - Niger: GDP $12.4B, Pop 26.2M, Growth +4.1%, Unemployment 14.8%, Debt 51.2%

    Please deliver a highly detailed economic dossier with the following layout:
    
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
          engine: 'Gemini 2.5 (AI Driven Research Simulation)',
          analysis: analysisText,
          notice: !deepseekApiKey ? 'Live DeepSeek key not found in env. Falling back to Gemini 2.5 to simulate AI policy outputs.' : undefined
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

    // Now try to generate AI bulletins with Gemini if available
    try {
      const ai = getAiClient();
      const prompt = `You are an AI financial journalist writing brief bulletins on African economics. 
      Create 3 high-impact economic news bulletins for Africa for the year 2026. 
      For each bulletin, provide:
      - Title (concise, professional)
      - Summary (2 sentences of realistic news)
      - Impact (1 sentence identifying which countries or sectors benefit)
      - Category (one word, e.g. "Energy", "Tech", "Finance", "Infrastructure")

      Return ONLY a JSON array matching this TypeScript structure:
      Array<{ title: string; summary: string; impact: string; category: string }>
      Do not include markdown code block characters like \`\`\`json or \`\`\`, just return the raw JSON text directly.`;

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
      console.warn('Could not generate bulletins with Gemini API, using static updates.');
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
