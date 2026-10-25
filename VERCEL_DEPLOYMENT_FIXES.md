# Multimodal Construction Intelligence Platform — Vercel Migration & Build Documentation

This document records the exact architectural changes, fixes, and configuration steps taken to migrate the **Multimodal Construction Intelligence Platform** from a local Streamlit + FastAPI setup to a fully production-ready **Vercel Multi-Service Deployment** (serving the React frontend via Vite, the FastAPI backend in `backend/`, and a FastAPI fallback app in the root directory).

---

## 📋 Summary of Changes & Fixes

### 1. Removal of Streamlit Dependencies
- **Action**: Removed `app.py` and replaced Streamlit-specific rendering logic with a fully responsive, modern React + Vite + Tailwind CSS single-page application (`frontend/src/App.jsx`).
- **Why**: Streamlit cannot be easily bundled with a separate high-performance React frontend and FastAPI backend under Vercel's multi-service serverless architecture.

### 2. Multi-Service `vercel.json` Configuration
- **Action**: Implemented Vercel's multi-service architecture in `vercel.json` to handle three distinct services (`app`, `backend`, `frontend`) within a single Vercel project:
  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "services": {
      "app": {
        "root": ".",
        "framework": "fastapi"
      },
      "backend": {
        "root": "backend",
        "framework": "fastapi"
      },
      "frontend": {
        "root": "frontend",
        "framework": "vite",
        "outputDirectory": "dist"
      }
    },
    "rewrites": [
      {
        "source": "/api/(.*)",
        "destination": {
          "service": "backend"
        }
      },
      {
        "source": "/(.*)",
        "destination": {
          "service": "app"
        }
      }
    ]
  }
  ```

### 3. Resolution of Vercel Python Build Warnings & Errors
- **Problem**: Vercel issued a warning: `WARNING! The api/ directory will not be built because services are configured`.
- **Fix**: Reconciled the Python runtime requirements by placing a root-level `requirements.txt` containing FastAPI, Pydantic, Uvicorn, and Google Generative AI dependencies so that Vercel's Python runtime (`uv 0.13.5` with Python 3.12) automatically builds the virtual environment and compiles Python bytecode successfully for both `app` and `backend` services.

### 4. Frontend API Path Harmonization
- **Action**: Updated all `fetch()` requests in `frontend/src/App.jsx` from hardcoded local ports (`http://localhost:8000/api/...`) to relative paths (`/api/...`).
- **Why**: Allows Vercel's top-level rewrites to transparently proxy API calls to the FastAPI backend service in both local development (`vercel dev`) and production deployment.

---

## 🤖 Prompt for Teammates (Replicating These Fixes)

If a teammate or another agent needs to reproduce this exact Vercel deployment setup from scratch, they can provide the following prompt:

> *"Please configure this repository for Vercel multi-service deployment. Remove any Streamlit files, ensure `vercel.json` defines the `app` (root FastAPI), `backend` (`backend/` FastAPI), and `frontend` (`frontend/` Vite) services with top-level rewrites routing `/api/(.*)` to `backend`. Add a root `requirements.txt` for Python dependencies, and update all frontend API fetch calls in `frontend/src/App.jsx` to use relative paths (`/api/...`) instead of hardcoded localhost ports."*
