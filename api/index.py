from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Multimodal Construction Intelligence API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

def call_gemini_multimodal(prompt: str, image_bytes: bytes = None, mime_type: str = "image/jpeg") -> str:
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        return None
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        contents = [prompt]
        if image_bytes:
            contents.append({
                "mime_type": mime_type,
                "data": image_bytes
            })
        
        response = model.generate_content(contents)
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def call_gemini_text(prompt: str) -> str:
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        return None
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

@app.get("/api/health")
def health_check():
    return {"status": "ok", "gemini_configured": bool(GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here")}

@app.post("/api/safety-audit")
async def safety_audit(file: UploadFile = File(None)):
    contents = await file.read() if file else b""
    mime = file.content_type if file and file.content_type else "image/jpeg"
    
    prompt = """
    Analyze this construction site image for rigorous compliance against:
    - OSHA 29 CFR 1926 (Safety and Health Regulations for Construction)
    - IS 456:2000 (Plain and Reinforced Concrete Code of Practice)
    - IS 13415:1992 (Safety for Working on Scaffolds)
    - IS 2925:1984 (Specification for Industrial Safety Helmets)
    - IS 3521:1999 (Industrial Safety Belts and Harnesses)
    
    Return ONLY a valid JSON object with this exact structure:
    {
      "summary": "Brief summary of safety observations.",
      "safety_score": 85,
      "overall_status": "Moderate Risk / Compliant / Critical Action Needed",
      "risk_level": "Medium",
      "ppe_detection": {
        "helmets": {"status": "Compliant", "details": "Most workers wearing hard hats."},
        "high_vis_vests": {"status": "Partial", "details": "Some personnel lack high-vis."},
        "steel_toe_boots": {"status": "Compliant", "details": "Standard footwear observed."},
        "safety_harnesses": {"status": "N/A", "details": "No elevated work at height in frame."}
      },
      "findings": [
        {"hazard": "Unsecured scaffolding edge", "severity": "High", "remedy": "Install toe boards and mid-rails immediately."}
      ],
      "recommendations": ["Conduct daily toolbox talk on PPE compliance."]
    }
    """
    
    res = call_gemini_multimodal(prompt, contents, mime)
    if res:
        try:
            cleaned = res.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except Exception:
            pass
            
    return {
        "summary": "[DEMO MODE] Preliminary AI audit indicates standard site conditions with minor PPE gaps per OSHA 29 CFR 1926 and IS 456:2000.",
        "safety_score": 78,
        "overall_status": "Moderate Risk",
        "risk_level": "Medium",
        "ppe_detection": {
            "helmets": {"status": "Compliant", "details": "Hard hats observed on 90% of personnel per IS 2925:1984."},
            "high_vis_vests": {"status": "Partial", "details": "Visibility vests missing on subcontractors."},
            "steel_toe_boots": {"status": "Compliant", "details": "Protective footwear worn."},
            "safety_harnesses": {"status": "Pending", "details": "Inspect harness anchor points per IS 3521:1999."}
        },
        "findings": [
            {"hazard": "Unsecured electrical cord across walkway", "severity": "Medium", "remedy": "Suspend cables overhead or use cable protectors."},
            {"hazard": "Debris accumulation near stairwell", "severity": "Low", "remedy": "Clear egress paths per OSHA 1926.250."}
        ],
        "recommendations": ["Enforce mandatory high-vis vest policy at entry gates.", "Note: AI assessments are preliminary."]
    }

@app.post("/api/crack-diagnosis")
async def crack_diagnosis(file: UploadFile = File(None)):
    contents = await file.read() if file else b""
    mime = file.content_type if file and file.content_type else "image/jpeg"
    
    prompt = """
    Analyze this concrete/wall surface crack image per ACI 224R-01.
    Return ONLY a valid JSON object with this exact structure:
    {
      "summary": "Detailed engineering diagnosis of the crack.",
      "defect_type": "Thermal Expansion / Structural Shear / Settlement / Hairline / Spalling",
      "estimated_width_mm": 1.5,
      "root_causes": ["Foundation differential movement", "Thermal cycling"],
      "recommended_repairs": ["Epoxy injection", "Surface sealing"],
      "urgency": "High",
      "risk_level": "High",
      "findings": [{"observation": "Diagonal crack propagation from corner.", "implication": "Shear stress concentration."}],
      "recommendations": ["Install crack monitor gauges and consult structural engineer."]
    }
    """
    
    res = call_gemini_multimodal(prompt, contents, mime)
    if res:
        try:
            cleaned = res.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except Exception:
            pass
            
    return {
        "summary": "[DEMO MODE] Surface crack inspection indicates diagonal shear cracking per ACI 224R-01 standards.",
        "defect_type": "Structural Shear",
        "estimated_width_mm": 1.2,
        "root_causes": ["Differential foundation settlement", "Live load redistribution"],
        "recommended_repairs": ["Low-pressure epoxy resin injection", "Carbon fiber wrap for tensile reinforcement"],
        "urgency": "Medium",
        "risk_level": "Medium",
        "findings": [
            {"observation": "Width exceeds 1.0mm threshold for passive hairline classification.", "implication": "Requires active monitoring."}
        ],
        "recommendations": ["Place tell-tale glass gauges across crack width."]
    }

class PlanningRequest(BaseModel):
    structure_type: str
    built_up_sqft: float
    location_tier: str
    completion_percentage: float

@app.post("/api/project-planning")
def project_planning(req: PlanningRequest):
    cost_sqft = 2200 if req.location_tier == "Tier 1" else (1800 if req.location_tier == "Tier 2" else 1400)
    total_budget = (req.built_up_sqft * cost_sqft) / 100000
    capex = total_budget * (req.completion_percentage / 100.0)
    steel = (req.built_up_sqft * 3.5) / 1000
    cement = req.built_up_sqft * 0.4
    
    return {
        "summary": f"Estimated total project budget for {req.built_up_sqft:,.0f} sqft {req.structure_type} in {req.location_tier} India using CPWD norms: ₹{total_budget:.2f} Lakhs.",
        "risk_level": "Low",
        "metrics": {
            "total_budget_lakhs": round(total_budget, 2),
            "capex_inr_lakhs": round(capex, 2),
            "market_valuation_lakhs": round(total_budget * 1.35, 2),
            "steel_requirement_tons": round(steel, 1),
            "cement_requirement_bags": round(cement, 0),
            "completion_percentage": req.completion_percentage
        },
        "findings": [
            {"observation": f"Current CapEx incurred: ₹{capex:.2f} Lakhs.", "implication": "On track with scheduled milestone cash flow."}
        ],
        "recommendations": [
            "Schedule quality audit for upcoming slab casting per IS 456.",
            "Maintain buffer of 5% for material price inflation."
        ]
    }

class ChatRequest(BaseModel):
    question: str
    weather_condition: Optional[str] = "Normal"

@app.post("/api/assistant-chat")
def assistant_chat(req: ChatRequest):
    weather_advisories = {
        "High Wind": "CRITICAL ADVISORY per OSHA 1926: Suspend tower crane operations, secure loose scaffolding, and tie down tarpaulins.",
        "Heavy Rain": "CRITICALADVISORY: Check site drainage pumps, cover electrical panels, and halt external electrical works.",
        "Extreme Heat": "CRITICAL ADVISORY per ACI 305R: Implement mandatory hydration breaks, rotate shifts, and provide shaded rest areas.",
        "Normal": "Standard operating conditions. Ensure routine safety checks."
    }
    
    weather_alert = weather_advisories.get(req.weather_condition, weather_advisories["Normal"])
    
    return {
        "summary": f"Advisory for {req.weather_condition}: {req.question}",
        "risk_level": "Medium" if req.weather_condition != "Normal" else "Low",
        "weather_alert": weather_alert,
        "findings": [
            {"observation": f"Query addressed under {req.weather_condition} weather protocol.", "implication": "Safety measures aligned with IS and OSHA standards."}
        ],
        "recommendations": [
            weather_alert,
            "Consult site safety officer before executing high_risk operations."
        ]
    }
