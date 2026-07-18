# African Economic Intelligence Platform

A high-performance economic research, macro-modeling, and policy formulation dashboard for the African continent and the Alliance of Sahel States (AES).

## Architecture & Page Structure
The application is structured into four main views:
1. **Overview Dashboard**: Continental indicators, dynamic aggregates, and live economic news bulletins.
2. **Sahel Alliance (AES) Portal**: Sovereign fiscal modeling, customs corridor routing simulation, and tripartite monetary analysis.
3. **Regional Intelligence Matrix**: Sub-regional performance stats, GDP weighting, and demographic distribution metrics.
4. **Country Spotlight Detail**: Granular economic indicators, historical projections, and customized AI deep-dives.

## Environment Variables & Configuration
The Express backend loads variables from `.env` (note: the server loads `.env`, not `.env.local`).
- `PORT`: Network ingress port (defaults to `3000`).
- `GEMINI_API_KEY`: For live Gemini-powered country economic analyses and news generation.
- `DEEPSEEK_API_KEY`: For live DeepSeek V3-powered Sahel Alliance policy projection modeling.

## Simulated vs. Live AI Modes
- **Live Mode**: If valid API keys are configured, the platform communicates directly with official Google Gemini and DeepSeek endpoints for real-time synthesis.
- **Simulated Scenario Mode**: If keys are absent, the platform fails safely and operates in high-fidelity simulated mode, producing clean, realistic, and objective qualitative policy evaluations.

## Data Provenance Policy
Our platform upholds strict honesty and data provenance:
- **Baseline Data**: Sourced dynamically from public APIs (such as the World Bank) or static institutional records.
- **Visual Indicators**: Clearly labeled with `DataBadge` widgets specifying static or live API origins. No certified badges or active system-pulse icons are utilized unless verified.
- **Trend Visuals**: Historical lines are explicitly marked as "Illustrative Trend (Simulated)" with informative tooltips.
