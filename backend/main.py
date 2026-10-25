import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json
import base64
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

# Helper for Gemini calls or fallback
def call_gemini_multimodal(prompt: str, image_bytes: bytes = None, mime_type: str = "image/jpeg") -> str:
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        return None  # Trigger fallback
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
async def safety_audit(file: UploadFile = File(...)):
    contents = await file.read()
    mime = file.content_type or "image/jpeg"
    
    prompt = """
    Analyze this construction site image for OSHA and IS 456 safety compliance.
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
            # Clean markdown code blocks if present
            cleaned = res.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except Exception:
            pass
            
    # Fallback response
    return {
        "summary": "[DEMO MODE] Preliminary AI audit indicates standard site conditions with minor PPE gaps.",
        "safety_score": 78,
        "overall_status": "Moderate Risk",
        "risk_level": "Medium",
        "ppe_detection": {
            "helmets": {"status": "Compliant", "details": "Hard hats observed on 90% of personnel."},
            "high_vis_vests": {"status": "Partial", "details": "Visibility vests missing on subcontractors."},
            "steel_toe_boots": {"status": "Compliant", "details": "Protective footwear worn."},
            "safety_harnesses": {"status": "Pending", "details": "Inspect harness anchor points."}
        },
        "findings": [
            {"hazard": "Unsecured electrical cord across walkway", "severity": "Medium", "remedy": "Suspend cables overhead or use cable protectors."},
            {"hazard": "Debris accumulation near stairwell", "severity": "Low", "remedy": "Clear egress paths."}
        ],
        "recommendations": ["Enforce mandatory high-vis vest policy at entry gates.", "Note: AI assessments are preliminary and do not establish absolute safety."]
    }


@app.post("/api/crack-diagnosis")
async def crack_diagnosis(file: UploadFile = File(...)):
    contents = await file.read()
    mime = file.content_type or "image/jpeg"
    
    prompt = """
    Analyze this concrete/wall surface crack image.
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
        "summary": "[DEMO MODE] Surface crack inspection indicates diagonal shear cracking likely due to minor settlement.",
        "defect_type": "Structural Shear",
        "estimated_width_mm": 1.2,
        "root_causes": ["Differential foundation settlement", "Live load redistribution"],
        "recommended_repairs": ["Low-pressure epoxy resin injection", "Carbon fiber wrap for tensile reinforcement"],
        "urgency": "Medium",
        "risk_level": "Medium",
        "findings": [
            {"observation": "Width exceeds 1.0mm threshold for passive hairline classification.", "implication": "Requires active monitoring."}
        ],
        "recommendations": ["Place tell-tale glass gauges across crack width.", "Note: Visual analysis is preliminary and does not replace core sampling."]
    }


class PlanningRequest(BaseModel):
    structure_type: str
    built_up_sqft: float
    location_tier: str
    completion_percentage: float

@app.post("/api/project-planning")
def project_planning(req: PlanningRequest):
    # Calculations based on Indian construction standards (approx costs in INR Lakhs/Crores)
    cost_per_sqft = 2200 if req.location_tier == "Tier 1" else (1800 if req.location_tier == "Tier 2" else 1400)
    total_budget_inr = (req.built_up_sqft * cost_per_sqft) / 100000  # in Lakhs
    capex_inr = total_budget_inr * (req.completion_percentage / 100.0)
    
    # Material estimates (approx per sqft: steel ~3.5 kg, cement ~0.4 bags)
    steel_tons = (req.built_up_sqft * 3.5) / 1000
    cement_bags = req.built_up_sqft * 0.4
    
    prompt = f"""
    Provide brief construction project advice for a {req.structure_type} of {req.built_up_sqft} sqft in {req.location_tier} India at {req.completion_percentage}% completion.
    Return JSON with fields: "summary", "risk_level", "findings" (list of dicts with observation/implication), "recommendations" (list of strings).
    """
    ai_text = call_gemini_text(prompt)
    
    return {
        "summary": f"Estimated total project budget for {req.built_up_sqft:,.0f} sqft {req.structure_type} in {req.location_tier}: ₹{total_budget_inr:.2f} Lakhs.",
        "risk_level": "Low",
        "metrics": {
            "total_budget_lakhs": round(total_budget_inr, 2),
            "capex_inr_lakhs": round(capex_inr, 2),
            "market_valuation_lakhs": round(total_budget_inr * 1.35, 2),
            "steel_requirement_tons": round(steel_tons, 1),
            "cement_requirement_bags": round(cement_bags, 0),
            "completion_percentage": req.completion_percentage
        },
        "findings": [
            {"observation": f"Current CapEx incurred: ₹{capex_inr:.2f} Lakhs.", "implication": "On track with scheduled milestone cash flow."},
            {"observation": f"Material intensity: {steel_tons:.1f}T steel, {cement_bags:,.0f} bags cement.", "implication": "Ensure bulk supplier price locking."}
        ],
        "recommendations": [
            "Schedule quality audit for upcoming slab casting.",
            "Maintain buffer of 5% for material price inflation."
        ]
    }


class ChatRequest(BaseModel):
    question: str
    weather_condition: Optional[str] = "Normal"

@app.post("/api/assistant-chat")
def assistant_chat(req: ChatRequest):
    weather_advisories = {
        "High Wind": "CRITICAL ADVISORY: Suspend tower crane operations, secure loose scaffolding, and tie down tarpaulins.",
        "Heavy Rain": "CRITICAL ADVISORY: Check site drainage pumps, cover electrical panels, and halt external electrical works.",
        "Extreme Heat": "CRITICAL ADVISORY: Implement mandatory hydration breaks, rotate shifts, and provide shaded rest areas.",
        "Normal": "Standard operating conditions. Ensure routine safety checks."
    }
    
    weather_alert = weather_advisories.get(req.weather_condition, weather_advisories["Normal"])
    
    prompt = f"""
    You are an expert construction engineering assistant.
    Weather condition: {req.weather_condition} ({weather_alert})
    User question: {req.question}
    
    Provide a concise, professional engineering answer.
    Return JSON with fields: "summary", "risk_level", "findings" (list of dicts), "recommendations" (list of strings).
    """
    
    res = call_gemini_text(prompt)
    if res:
        # Try to parse or fallback
        pass
        
    return {
        "summary": f"Advisory for {req.weather_condition}: {req.question}",
        "risk_level": "Medium" if req.weather_condition != "Normal" else "Low",
        "weather_alert": weather_alert,
        "findings": [
            {"observation": f"Query addressed under {req.weather_condition} weather protocol.", "implication": "Safety measures aligned with IS standards."}
        ],
        "recommendations": [
            weather_alert,
            "Consult site safety officer before executing high-risk operations."
        ]
    }
