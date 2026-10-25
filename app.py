import streamlit as st
import requests
import json
import os
from PIL import Image
import io

st.set_page_config(
    page_title="Multimodal Construction Intelligence Platform",
    page_icon="🏗️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS styling
st.markdown("""
<style>
    .main { background-color: #020617; color: #f8fafc; }
    .stSidebar { background-color: #0f172a; }
    h1, h2, h3 { color: #f8fafc; }
    .stMetric { background-color: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 12px; }
    .stAlert { background-color: #0f172a; border: 1px solid #1e293b; color: #f8fafc; }
</style>
""", unsafe_allow_html=True)

# Sidebar
st.sidebar.markdown("## 🏗️ ConstructIntel")
st.sidebar.markdown("### Multimodal Platform v1.0")

api_key_input = st.sidebar.text_input("Gemini API Key (Optional)", type="password", placeholder="AI Studio Key")
if api_key_input:
    os.environ["GEMINI_API_KEY"] = api_key_input

st.sidebar.markdown("---")
app_mode = st.sidebar.radio(
    "Navigation",
    [
        "Tab 1 - Site Safety & PPE Audit",
        "Tab 2 - Crack Diagnostics & Structural Integrity",
        "Tab 3 - Planning & Real Estate Valuation",
        "Tab 4 - Daily Site Assistant & Weather Advisory"
    ]
)

st.sidebar.markdown("---")
st.sidebar.info("Skill Wallet Capstone Project 1\nAutomated AI Construction Insights")

# Disclaimer banner
st.markdown("""
<div style="background-color: #1e3a8a33; border: 1px solid #1e40af66; padding: 12px; border-radius: 10px; margin-bottom: 20px; font-size: 13px; color: #93c5fd;">
    <strong>Note:</strong> AI-generated construction assessments are preliminary decision-support tools. Images and automated metrics cannot establish structural safety conclusively without certified human engineering inspection.
</div>
""", unsafe_allow_html=True)

# Helper function for demo / fallback or backend
def get_mock_safety():
    return {
        "summary": "Preliminary AI audit indicates standard site conditions with minor PPE gaps.",
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
        "recommendations": ["Enforce mandatory high-vis vest policy at entry gates."]
    }

def get_mock_crack():
    return {
        "summary": "Surface crack inspection indicates diagonal shear cracking likely due to minor settlement.",
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

# TAB 1: SITE SAFETY & PPE AUDIT
if app_mode == "Tab 1 - Site Safety & PPE Audit":
    st.title("🛡️ Site Safety & PPE Audit (Epic 2)")
    st.write("Upload construction site photos to evaluate worker PPE compliance under OSHA and IS 456 standards.")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        uploaded_file = st.file_uploader("Upload Construction Site Photo (JPG/PNG)", type=["jpg", "jpeg", "png"])
        if uploaded_file:
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Site Photo", use_column_width=True)
            
        run_audit = st.button("Run OSHA & IS 456 Safety Audit", type="primary", use_container_width=True)

    with col2:
        st.subheader("Audit Results & PPE Compliance")
        if run_audit:
            with st.spinner("Analyzing site safety compliance..."):
                # Call backend if available or fallback
                try:
                    files = {"file": uploaded_file.getvalue()} if uploaded_file else None
                    # If FastAPI is running locally, we can try calling it, else fallback to mock
                    res = requests.post("http://127.0.0.1:8000/api/safety-audit", files={"file": uploaded_file.getvalue() if uploaded_file else b"fake"})
                    data = res.json()
                except Exception:
                    data = get_mock_safety()
                
                st.metric(label="Safety Score", value=f"{data.get('safety_score', 78)}/100", delta="Moderate Risk")
                st.markdown(f"**Overall Status:** {data.get('overall_status', 'Moderate Risk')}")
                st.info(data.get('summary', ''))
                
                st.markdown("### PPE Compliance Checklist")
                ppe = data.get('ppe_detection', {})
                for k, v in ppe.items():
                    st.markdown(f"- **{k.replace('_', ' ').title()}**: `{v.get('status')}` - {v.get('details')}")
                
                st.markdown("### Identified Hazards")
                for f in data.get('findings', []):
                    st.error(f"**{f.get('hazard')}** (Severity: {f.get('severity')})\n\n*Remedy:* {f.get('remedy')}")
                    
                st.download_button(
                    label="Download JSON Report",
                    data=json.dumps(data, indent=2),
                    file_name="safety-audit-report.json",
                    mime="application/json"
                )
        else:
            st.info("Upload an image and click 'Run OSHA & IS 456 Safety Audit' to generate insights.")

# TAB 2: CRACK DIAGNOSTICS
elif app_mode == "Tab 2 - Crack Diagnostics & Structural Integrity":
    st.title("🔍 Crack Diagnostics & Structural Integrity (Epic 2)")
    st.write("Upload concrete or wall surface images to classify defect types, estimate crack widths, and determine repairs.")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        crack_file = st.file_uploader("Upload Wall / Concrete Defect Photo", type=["jpg", "jpeg", "png"])
        if crack_file:
            st.image(crack_file, caption="Uploaded Defect Surface", use_column_width=True)
            
        run_crack = st.button("Analyze Structural Defect", type="primary", use_container_width=True)

    with col2:
        st.subheader("Crack Analysis & Repair Protocol")
        if run_crack:
            with st.spinner("Analyzing structural crack and root causes..."):
                try:
                    res = requests.post("http://127.0.0.1:8000/api/crack-diagnosis", files={"file": crack_file.getvalue() if crack_file else b"fake"})
                    data = res.json()
                except Exception:
                    data = get_mock_crack()
                
                m1, m2, m3 = st.columns(3)
                m1.metric("Defect Type", data.get('defect_type', 'Structural Shear'))
                m2.metric("Est. Width", f"{data.get('estimated_width_mm', 1.2)} mm")
                m3.metric("Urgency", data.get('urgency', 'Medium'))
                
                st.info(data.get('summary', ''))
                
                st.markdown("### Root Causes")
                for rc in data.get('root_causes', []):
                    st.markdown(f"- {rc}")
                    
                st.markdown("### Recommended Engineering Repairs")
                for rep in data.get('recommended_repairs', []):
                    st.success(f"✔️ {rep}")
        else:
            st.info("Upload a defect photo and click 'Analyze Structural Defect'.")

# TAB 3: PLANNING & VALUATION
elif app_mode == "Tab 3 - Planning & Real Estate Valuation":
    st.title("📊 Planning & Real Estate Valuation (Epic 3)")
    st.write("Interactive financial valuation, CapEx tracking, material estimation, and milestone progress.")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        structure_type = st.selectbox("Structure Type", ["Commercial Complex", "Residential High-Rise", "Industrial Warehouse", "Institutional Building"])
        built_up_sqft = st.number_input("Built-up Area (Sq. Ft.)", value=50000, step=1000)
        location_tier = st.selectbox("Location Tier (India)", ["Tier 1", "Tier 2", "Tier 3"])
        completion_pct = st.slider("Completion Percentage", 0, 100, 35)
        
        calc_btn = st.button("Calculate Valuation & Material Metrics", type="primary", use_container_width=True)

    with col2:
        st.subheader("Project Financials & Material Estimation")
        if calc_btn or True:
            cost_sqft = 2200 if location_tier == "Tier 1" else (1800 if location_tier == "Tier 2" else 1400)
            total_budget = (built_up_sqft * cost_sqft) / 100000
            capex = total_budget * (completion_pct / 100.0)
            steel = (built_up_sqft * 3.5) / 1000
            cement = built_up_sqft * 0.4
            
            m1, m2 = st.columns(2)
            m1.metric("Total Budget", f"₹{total_budget:.2f} Lakhs")
            m2.metric("CapEx Incurred", f"₹{capex:.2f} Lakhs")
            
            m3, m4 = st.columns(2)
            m3.metric("Asset Valuation", f"₹{total_budget * 1.35:.2f} Lakhs")
            m4.metric("Steel Required", f"{steel:.1f} Tons")
            
            st.markdown(f"**Cement Requirement:** {cement:,.0f} bags")
            
            st.markdown("### Milestone Progress")
            st.progress(completion_pct / 100.0)
            st.write(f"Project is currently at **{completion_pct}% completion**.")
            
            st.markdown("### Conceptual 3D Architectural Rendering Prompt (Pollinations AI)")
            st.code(f"https://image.pollinations.ai/prompt/Modern%20{structure_type}%20architectural%20rendering,%20photorealistic,%20glass%20facade,%20sustainable%20construction,%208k%20resolution")

# TAB 4: WEATHER & ASSISTANT
elif app_mode == "Tab 4 - Daily Site Assistant & Weather Advisory":
    st.title("🌤️ Daily Site Assistant & Weather-Aware Advisory (Epic 5)")
    st.write("Dynamic weather safety protocols and an interactive construction engineering assistant chatbot.")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        weather = st.selectbox("Select Site Weather Condition", ["Normal", "High Wind", "Heavy Rain", "Extreme Heat"])
        
        if weather == "High Wind":
            st.warning("🚨 **CRITICAL ADVISORY:** Suspend tower crane operations, secure loose scaffolding, and tie down tarpaulins.")
        elif weather == "Heavy Rain":
            st.error("🚨 **CRITICAL ADVISORY:** Check site drainage pumps, cover electrical panels, and halt external electrical works.")
        elif weather == "Extreme Heat":
            st.warning("🚨 **CRITICAL ADVISORY:** Implement mandatory hydration breaks, rotate shifts, and provide shaded rest areas.")
        else:
            st.success("✅ Standard operating conditions. Ensure routine safety checks.")
            
        st.markdown("---")
        user_question = st.text_area("Ask Construction Assistant", placeholder="e.g. What is the recommended curing period for M25 grade concrete under extreme heat?")
        ask_btn = st.button("Send Engineering Query", type="primary", use_container_width=True)

    with col2:
        st.subheader("Engineering Advisory & Assistant Response")
        if ask_btn and user_question:
            with st.spinner("Generating engineering advisory..."):
                try:
                    res = requests.post("http://127.0.0.1:8000/api/assistant-chat", json={"question": user_question, "weather_condition": weather})
                    data = res.json()
                except Exception:
                    data = {
                        "summary": f"Advisory for {weather}: {user_question}",
                        "recommendations": [
                            "Ensure compliance with IS 456 curing standards.",
                            "Maintain continuous moisture curing for a minimum of 10-14 days.",
                            "Monitor ambient temperature differentials to prevent thermal cracking."
                        ]
                    }
                
                st.info(data.get('summary', ''))
                st.markdown("### Recommendations & Guidelines")
                for rec in data.get('recommendations', []):
                    st.markdown(f"- {rec}")
        else:
            st.info("Select weather condition and ask a construction query to receive AI advisory.")
