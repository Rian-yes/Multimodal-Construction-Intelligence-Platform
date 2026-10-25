# Multimodal Construction Intelligence Platform

An AI-powered decision-support system for construction professionals leveraging FastAPI, React, Tailwind CSS, and Google Gemini.

## Features
1. **Site Safety & PPE Audit**: Upload site photos to detect PPE compliance (helmets, vests, boots) and site hazards with severity & remedies.
2. **Crack Diagnostics**: Analyze wall/concrete surfaces for defect type, width, root causes, and recommended engineering repairs.
3. **Planning & Valuation**: Interactive estimation of project budget, CapEx, asset valuation in INR, and steel/cement requirements.
4. **Daily Assistant & Weather Advisory**: Weather-aware construction advisories and an interactive engineering assistant chatbot.

## Quick Start (Windows)

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup (React + Vite + Tailwind)
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
