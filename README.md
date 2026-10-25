# Multimodal Construction Intelligence Platform

🏗️ **Skill Wallet Capstone Project 1: AI-Powered Construction Management & Decision Support System**

---

## 📋 Overview

The **Multimodal Construction Intelligence Platform** is an enterprise-grade, full-stack decision-support system designed to assist construction engineers, project managers, and safety auditors across the complete lifecycle of construction planning, execution, and monitoring. 

Traditional construction management relies heavily on manual site supervision, fragmented documentation, and heuristic judgments. This platform bridges that gap by integrating **Multimodal Large Language Models (Google Gemini)** with a robust **FastAPI backend** and a high-performance **React + Vite + Tailwind CSS frontend**.

---

## 🚀 Core Features & Modules

1. **Tab 1 - Site Safety & PPE Audit (Epic 2)**
   - Upload construction site photos (`.jpg`, `.png`).
   - Multimodal evaluation of worker Personal Protective Equipment (PPE) compliance (helmets, high-vis vests, steel-toe boots, safety harnesses) against OSHA and IS 456 standards.
   - Structured JSON reporting including safety score (`0-100`), overall risk status, PPE checklist, identified site hazards with severity ratings (`Low`, `Medium`, `High`, `Critical`), and actionable corrective remedies.
   - Downloadable JSON audit reports.

2. **Tab 2 - Crack Diagnostics & Structural Integrity (Epic 2)**
   - Upload concrete or wall surface images.
   - AI-powered classification of defect types (*Hairline, Settlement, Structural Shear, Thermal Expansion, Spalling*).
   - Estimated crack width calculation in millimeters (`mm`), root cause analysis, and recommended engineering repairs (*low-pressure epoxy resin injection, structural re-grouting, carbon fiber wrapping*).

3. **Tab 3 - Planning & Real Estate Valuation (Epic 3)**
   - Interactive inputs for structure type (*Commercial Complex, Residential High-Rise, Industrial Warehouse*), built-up area (`sqft`), Indian location tiers (*Tier 1, Tier 2, Tier 3*), and completion percentage slider.
   - Computes total project budget, CapEx incurred, current asset market valuation in INR (Lakhs/Crores), and material requirement metrics (steel tonnage, cement bags).
   - Integrated milestone progress bar and dynamic conceptual 3D architectural rendering prompt generator (via Pollinations AI).

4. **Tab 4 - Daily Site Assistant & Weather-Aware Advisory (Epic 5)**
   - Weather condition selector (*High Wind, Heavy Rain, Extreme Heat, Normal*) providing dynamic site safety protocols (e.g., suspending tower crane operations, electrical hazard mitigation, concrete curing guidelines).
   - Interactive multi-turn construction engineering assistant chatbot answering technical queries aligned with Indian Standards (IS) and international codes.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, JavaScript (ES6+), Tailwind CSS, Lucide Icons
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic v2, Python-Multipart
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) with graceful automated fallback to simulation/demo mode when API keys are unsupplied.

---

## ⚙️ Installation & Setup Instructions (Windows)

### Prerequisites
- **Python** (version 3.8 or above installed and added to PATH)
- **Node.js** (version 18+ and npm)
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Rian-yes/Multimodal-Construction-Intelligence-Platform.git
cd Multimodal-Construction-Intelligence-Platform
```

### Step 2: Backend Setup (FastAPI)
Navigate to the backend directory, create a virtual environment, install dependencies, and start the Uvicorn server:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy ..\.env.example .env
```
*(Optional)* Open `backend/.env` and insert your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
Start the FastAPI server:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*The backend API will be live at `http://127.0.0.1:8000` (API documentation available at `/docs`).*

### Step 3: Frontend Setup (React + Vite)
Open a **new terminal window** in the project root directory:
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your web browser to access the dashboard.*

---

## 🔒 Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key for multimodal image analysis | `your_gemini_api_key_here` (triggers demo mode if missing) |
| `PORT` | FastAPI server port | `8000` |

---

## 📜 Regulatory Standards & Codes Referenced

- **OSHA 29 CFR 1926**: Safety and Health Regulations for Construction
- **IS 456:2000**: Plain and Reinforced Concrete - Code of Practice (Bureau of Indian Standards)
- **IS 13415:1992**: Code of Safety for Working on Scaffolds
- **IS 2925:1984**: Specification for Industrial Safety Helmets
- **IS 3521:1999**: Industrial Safety Belts and Harnesses
- **ACI 224R-01**: Control of Cracking in Concrete Structures
- **ACI 305R / 306R**: Hot and Cold Weather Concreting Guides
- **CPWD Plinth Area Rates & Civil Norms (2024-2026)**

---

## ⚠️ Important Disclaimer
AI-generated construction assessments and automated image inspections are preliminary decision-support tools. They **cannot** establish structural safety or compliance conclusively without certified human engineering inspection and adherence to local regulatory codes.
