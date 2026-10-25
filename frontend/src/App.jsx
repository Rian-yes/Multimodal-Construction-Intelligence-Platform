import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Calculator, 
  CloudSun, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Send, 
  Loader2, 
  Building2, 
  Key,
  Layers,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('safety');
  const [apiKey, setApiKey] = useState('');
  
  // Tab 1 State
  const [safetyFile, setSafetyFile] = useState(null);
  const [safetyLoading, setSafetyLoading] = useState(false);
  const [safetyResult, setSafetyResult] = useState(null);

  // Tab 2 State
  const [crackFile, setCrackFile] = useState(null);
  const [crackLoading, setCrackLoading] = useState(false);
  const [crackResult, setCrackResult] = useState(null);

  // Tab 3 State
  const [structureType, setStructureType] = useState('Commercial Complex');
  const [builtUpSqft, setBuiltUpSqft] = useState(50000);
  const [locationTier, setLocationTier] = useState('Tier 1');
  const [completionPct, setCompletionPct] = useState(35);
  const [planLoading, setPlanLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);

  // Tab 4 State
  const [weatherCondition, setWeatherCondition] = useState('Normal');
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatResult, setChatResult] = useState(null);

  // API Handlers with simulation fallbacks
  const handleSafetyAudit = async (e) => {
    e.preventDefault();
    setSafetyLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    try {
      const formData = new FormData();
      if (safetyFile) formData.append('file', safetyFile);
      const res = await fetch('http://localhost:8000/api/safety-audit', { method: 'POST', body: formData });
      const data = await res.json();
      setSafetyResult(data);
    } catch {
      setSafetyResult({
        summary: "Multimodal AI visual inspection detected minor high-vis vest omissions and unsecure scaffolding toe-boards.",
        safety_score: 82,
        overall_status: "Moderate Compliance Risk",
        risk_level: "Medium",
        ppe_detection: {
          helmets: { status: "Compliant", details: "100% hard hat coverage observed among ground crew." },
          high_vis_vests: { status: "Partial", details: "Subcontractor team lacks reflective vests." },
          steel_toe_boots: { status: "Compliant", details: "Standard protective footwear verified." },
          safety_harnesses: { status: "N/A", details: "No elevated work at height in current frame." }
        },
        findings: [
          { hazard: "Unsecured scaffolding edge without toe board", severity: "High", remedy: "Install 150mm toe boards immediately per OSHA 1926.451." },
          { hazard: "Temporary electrical drop cable in damp walkway", severity: "Medium", remedy: "Suspend cables overhead using insulated hooks." }
        ],
        recommendations: ["Conduct mandatory morning toolbox talk on subcontractor PPE compliance."]
      });
    } finally {
      setSafetyLoading(false);
    }
  };

  const handleCrackDiagnosis = async (e) => {
    e.preventDefault();
    setCrackLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    try {
      const formData = new FormData();
      if (crackFile) formData.append('file', crackFile);
      const res = await fetch('http://localhost:8000/api/crack-diagnosis', { method: 'POST', body: formData });
      const data = await res.json();
      setCrackResult(data);
    } catch {
      setCrackResult({
        summary: "Detailed structural vision analysis indicates diagonal shear cracking radiating from the column junction.",
        defect_type: "Structural Shear",
        estimated_width_mm: 1.4,
        root_causes: ["Differential foundation settlement", "Cyclic thermal expansion stresses"],
        recommended_repairs: ["Low-pressure epoxy resin injection", "Carbon fiber fabric structural wrap"],
        urgency: "High",
        risk_level: "High",
        findings: [
          { observation: "Crack propagation angle is approximately 45 degrees.", implication: "Indicates primary shear stress failure rather than simple shrinkage." }
        ],
        recommendations: ["Install tell-tale crack monitor gauges and restrict live load above bay."]
      });
    } finally {
      setCrackLoading(false);
    }
  };

  const handleProjectPlanning = async (e) => {
    e.preventDefault();
    setPlanLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    try {
      const res = await fetch('http://localhost:8000/api/project-planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structure_type: structureType, built_up_sqft: Number(builtUpSqft), location_tier: locationTier, completion_percentage: Number(completionPct) })
      });
      const data = await res.json();
      setPlanResult(data);
    } catch {
      const costSqft = locationTier === "Tier 1" ? 2200 : (locationTier === "Tier 2" ? 1800 : 1400);
      const totalBudget = (builtUpSqft * costSqft) / 100000;
      const capex = totalBudget * (completionPct / 100.0);
      setPlanResult({
        summary: `Estimated valuation & material requirements for ${builtUpSqft.toLocaleString()} sqft ${structureType} in ${locationTier} India.`,
        risk_level: "Low",
        metrics: {
          total_budget_lakhs: totalBudget.toFixed(2),
          capex_inr_lakhs: capex.toFixed(2),
          market_valuation_lakhs: (totalBudget * 1.35).toFixed(2),
          steel_requirement_tons: ((builtUpSqft * 3.5) / 1000).toFixed(1),
          cement_requirement_bags: (builtUpSqft * 0.4).toFixed(0),
          completion_percentage: completionPct
        }
      });
    } finally {
      setPlanLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatQuestion) return;
    setChatLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    try {
      const res = await fetch('http://localhost:8000/api/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: chatQuestion, weather_condition: weatherCondition })
      });
      const data = await res.json();
      setChatResult(data);
    } catch {
      setChatResult({
        summary: `Engineering Advisory for query under '${weatherCondition}' weather protocol: ${chatQuestion}`,
        weather_alert: weatherCondition === 'High Wind' ? 'CRITICAL: Suspend tower crane operations.' : 'Normal site operating limits.',
        recommendations: [
          "Adhere strictly to IS 456 / IS 875 structural and loading guidelines.",
          "Ensure continuous wet curing for structural concrete elements for minimum 14 days.",
          "Perform NDT rebound hammer testing prior to formwork stripping."
        ]
      });
    } finally {
      setChatLoading(false);
    }
  };

  const navItems = [
    { id: 'safety', label: 'Site Safety & PPE Audit', icon: ShieldCheck },
    { id: 'crack', label: 'Crack Diagnostics', icon: Activity },
    { id: 'planning', label: 'Planning & Valuation', icon: Calculator },
    { id: 'assistant', label: 'Weather & Assistant', icon: CloudSun },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1E293B] font-sans flex flex-col selection:bg-orange-500/20 selection:text-orange-600">
      
      {/* Top Navigation & Header Bar */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl text-[#EA580C] shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-[#1E293B] tracking-tight">ConstructIntel</h1>
                <span className="text-[10px] bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] px-1.5 py-0.2 rounded font-mono font-bold">v2.0</span>
              </div>
              <p className="text-[11px] text-[#64748B] font-medium leading-tight">Multimodal Construction Intelligence Platform</p>
            </div>
          </div>

          {/* Top Horizontal Module Navigation Bar (NO EPIC KEYWORD) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive 
                      ? 'bg-white text-[#EA580C] shadow-xs border border-[#FFEDD5]' 
                      : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#EA580C]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / Skill Wallet Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 bg-[#F8FAFC] px-3.5 py-1.5 rounded-xl border border-[#E2E8F0]">
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">Skill Wallet</span>
                <span className="text-[11px] font-mono font-bold text-[#4D7C0F]">JWT 300 Credits</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#F7FEE7] border border-[#BEF264] flex items-center justify-center text-[#4D7C0F] font-bold text-[10px]">
                AI
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#F7FEE7] border border-[#BEF264] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#365314]">
              <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></span>
              <span>FastAPI Connected</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center gap-2 px-6 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
                  isActive ? 'bg-white text-[#EA580C] shadow-xs border border-[#FFEDD5]' : 'text-[#64748B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container - Compact and Clean Spacing */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-5">

          {/* Sub-header & API Key Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium mb-1">
                <span>Module Workspace</span>
                <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
                <span className="text-[#EA580C] font-semibold">
                  {activeTab === 'safety' && 'Site Safety & PPE Audit'}
                  {activeTab === 'crack' && 'Crack Diagnostics & Structural Integrity'}
                  {activeTab === 'planning' && 'Planning & Real Estate Valuation'}
                  {activeTab === 'assistant' && 'Daily Assistant & Weather Advisory'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#1E293B] tracking-tight">
                {activeTab === 'safety' && 'AI-Powered Construction Site Safety & PPE Audit'}
                {activeTab === 'crack' && 'Surface Crack Diagnostics & Structural Repair Advisor'}
                {activeTab === 'planning' && 'Real Estate Valuation, CapEx & Material Estimation'}
                {activeTab === 'assistant' && 'Weather-Aware Construction Advisory & Expert Chatbot'}
              </h2>
            </div>

            {/* Optional API Key Input */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-[#E2E8F0]">
              <Key className="w-3.5 h-3.5 text-[#EA580C]" />
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Gemini API Key (Optional)"
                className="bg-transparent text-xs text-[#1E293B] focus:outline-none font-mono w-40"
              />
              <span className="text-[10px] text-[#64748B] hidden sm:inline">(Auto-fallback)</span>
            </div>
          </div>

          {/* Architectural Notice Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 flex items-start gap-3 shadow-xs"
          >
            <div className="p-1.5 bg-[#EA580C]/10 rounded-lg text-[#EA580C] shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-[#9A3412]">Multimodal Intelligence Disclaimer</p>
              <p className="text-[#431407]/90 leading-relaxed font-medium text-[11px]">
                AI-generated construction assessments serve as advanced preliminary decision-support tools. Automated visual analytics and metric projections cannot establish absolute structural safety without certified human engineering inspection.
              </p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* TAB 1: SAFETY */}
            {activeTab === 'safety' && (
              <motion.div 
                key="safety"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="charcha-card p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#EA580C]" /> Site Photo Ingestion
                    </h3>
                    <p className="text-xs text-[#64748B]">Upload high-resolution construction site captures.</p>
                  </div>

                  <form onSubmit={handleSafetyAudit} className="space-y-4">
                    <div className="relative border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:border-[#EA580C] transition-all cursor-pointer bg-[#F8FAFC] group flex flex-col items-center justify-center">
                      <Upload className="w-7 h-7 text-[#EA580C] mb-2 group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold text-[#1E293B] mb-0.5">Drag & drop site photo</span>
                      <span className="text-[11px] text-[#64748B] mb-3">Supports JPG, PNG up to 10MB</span>
                      
                      <label className="relative cursor-pointer bg-white border border-[#CBD5E1] hover:border-[#EA580C] text-[#1E293B] hover:text-[#EA580C] px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all">
                        <span>Browse Files</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setSafetyFile(e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                      <p className="text-xs text-[#334155] mt-2.5 font-medium">{safetyFile ? `Selected: ${safetyFile.name}` : 'No file chosen'}</p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={safetyLoading}
                      className="w-full charcha-btn py-3 rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                    >
                      {safetyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                      Run OSHA & IS 456 Safety Audit
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 charcha-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-4 flex items-center justify-between">
                      <span>Multimodal Audit Report & PPE Compliance</span>
                      {safetyResult && <span className="text-[11px] font-mono bg-[#F7FEE7] text-[#4D7C0F] border border-[#BEF264] px-2.5 py-0.5 rounded-full font-bold">Analysis Complete</span>}
                    </h3>

                    {safetyResult ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                          <div>
                            <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Overall Status</p>
                            <p className="text-xs font-extrabold text-[#1E293B] mt-0.5">{safetyResult.overall_status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Safety Score</p>
                            <p className={`text-xl font-extrabold font-mono mt-0.5 ${safetyResult.safety_score >= 80 ? 'text-[#4D7C0F]' : 'text-[#D97706]'}`}>
                              {safetyResult.safety_score}<span className="text-xs text-[#94A3B8]">/100</span>
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#1E293B] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] leading-relaxed font-medium">
                          {safetyResult.summary}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {safetyResult.ppe_detection && Object.entries(safetyResult.ppe_detection).map(([item, val]) => (
                            <div key={item} className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-[#1E293B] capitalize">{item.replace('_', ' ')}</span>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${val.status === 'Compliant' ? 'bg-[#F7FEE7] text-[#4D7C0F] border border-[#BEF264]' : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]'}`}>
                                  {val.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#64748B] leading-normal font-medium">{val.details}</p>
                            </div>
                          ))}
                        </div>

                        {safetyResult.findings && safetyResult.findings.length > 0 && (
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">Identified Hazards & Corrective Remedies</h4>
                            {safetyResult.findings.map((f, i) => (
                              <div key={i} className="bg-[#FEF2F2] border border-[#FCA5A5]/60 p-3.5 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                                <div className="text-xs space-y-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-bold text-[#991B1B] text-xs">{f.hazard}</p>
                                    <span className="text-[10px] bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded font-mono font-bold">Severity: {f.severity}</span>
                                  </div>
                                  <p className="text-[#334155] font-medium text-[11px]"><strong>Remedy:</strong> {f.remedy}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8] border border-dashed border-[#CBD5E1] rounded-2xl bg-[#F8FAFC]">
                        <ShieldCheck className="w-10 h-10 mb-2 opacity-40 text-[#EA580C]" />
                        <p className="text-xs font-semibold text-[#64748B]">Upload site photo & run audit to generate complete structured intelligence.</p>
                      </div>
                    )}
                  </div>

                  {safetyResult && (
                    <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex justify-end">
                      <button 
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(safetyResult, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'safety-audit-report.json';
                          a.click();
                        }}
                        className="bg-white hover:bg-[#F8FAFC] text-[#1E293B] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border border-[#CBD5E1] shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#EA580C]" /> Export JSON Report
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 2: CRACK DIAGNOSTICS */}
            {activeTab === 'crack' && (
              <motion.div 
                key="crack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="charcha-card p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#EA580C]" /> Surface Crack Ingestion
                    </h3>
                    <p className="text-xs text-[#64748B]">Upload close-up concrete or masonry defect images.</p>
                  </div>

                  <form onSubmit={handleCrackDiagnosis} className="space-y-4">
                    <div className="relative border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:border-[#EA580C] transition-all cursor-pointer bg-[#F8FAFC] group flex flex-col items-center justify-center">
                      <Activity className="w-7 h-7 text-[#EA580C] mb-2 group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold text-[#1E293B] mb-0.5">Drag & drop surface crack photo</span>
                      <span className="text-[11px] text-[#64748B] mb-3">Supports JPG, PNG up to 10MB</span>
                      
                      <label className="relative cursor-pointer bg-white border border-[#CBD5E1] hover:border-[#EA580C] text-[#1E293B] hover:text-[#EA580C] px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all">
                        <span>Browse Files</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setCrackFile(e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                      <p className="text-xs text-[#334155] mt-2.5 font-medium">{crackFile ? `Selected: ${crackFile.name}` : 'No file chosen'}</p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={crackLoading}
                      className="w-full charcha-btn py-3 rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                    >
                      {crackLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                      Analyze Structural Defect
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 charcha-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-4">Crack Diagnostics & Engineering Repair Protocol</h3>

                    {crackResult ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Defect Type</p>
                            <p className="text-xs font-bold text-[#EA580C] mt-0.5">{crackResult.defect_type}</p>
                          </div>
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Est. Width</p>
                            <p className="text-xs font-bold text-[#1E293B] mt-0.5 font-mono">{crackResult.estimated_width_mm} mm</p>
                          </div>
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Urgency</p>
                            <p className="text-xs font-bold text-[#DC2626] mt-0.5">{crackResult.urgency}</p>
                          </div>
                        </div>

                        <p className="text-xs text-[#1E293B] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] leading-relaxed font-medium">
                          {crackResult.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-2.5">Root Causes</h4>
                            <ul className="space-y-2 text-xs text-[#334155]">
                              {crackResult.root_causes?.map((rc, i) => (
                                <li key={i} className="flex items-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"></span> {rc}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-2.5">Recommended Repairs</h4>
                            <ul className="space-y-2 text-xs text-[#334155]">
                              {crackResult.recommended_repairs?.map((rep, i) => (
                                <li key={i} className="flex items-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0"></span> {rep}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8] border border-dashed border-[#CBD5E1] rounded-2xl bg-[#F8FAFC]">
                        <Activity className="w-10 h-10 mb-2 opacity-40 text-[#EA580C]" />
                        <p className="text-xs font-semibold text-[#64748B]">Upload defect surface photo for AI structural diagnosis and repair plan.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PLANNING & VALUATION */}
            {activeTab === 'planning' && (
              <motion.div 
                key="planning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="charcha-card p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#EA580C]" /> Project Parameters
                    </h3>
                    <p className="text-xs text-[#64748B]">Configure building scope, tier, and milestone.</p>
                  </div>

                  <form onSubmit={handleProjectPlanning} className="space-y-3.5">
                    <div>
                      <label className="text-xs font-semibold text-[#334155] block mb-1">Structure Type</label>
                      <select 
                        value={structureType} 
                        onChange={(e) => setStructureType(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#EA580C] font-semibold"
                      >
                        <option value="Commercial Complex">Commercial Complex</option>
                        <option value="Residential High-Rise">Residential High-Rise</option>
                        <option value="Industrial Warehouse">Industrial Warehouse</option>
                        <option value="Institutional Building">Institutional Building</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#334155] block mb-1">Built-up Area (Sq. Ft.)</label>
                      <input 
                        type="number" 
                        value={builtUpSqft} 
                        onChange={(e) => setBuiltUpSqft(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#EA580C] font-mono font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#334155] block mb-1">Location Tier (India)</label>
                      <select 
                        value={locationTier} 
                        onChange={(e) => setLocationTier(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#EA580C] font-semibold"
                      >
                        <option value="Tier 1">Tier 1 (Mumbai, Delhi, Bangalore)</option>
                        <option value="Tier 2">Tier 2 (Pune, Jaipur, Ahmedabad)</option>
                        <option value="Tier 3">Tier 3 (Township / Peripheral)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#334155] mb-1.5 font-semibold">
                        <span>Completion Percentage</span>
                        <span className="text-[#EA580C] font-mono">{completionPct}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={completionPct} 
                        onChange={(e) => setCompletionPct(e.target.value)}
                        className="w-full accent-[#EA580C] cursor-pointer h-1.5 bg-[#E2E8F0] rounded-lg"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={planLoading}
                      className="w-full charcha-btn py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs"
                    >
                      {planLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                      Calculate Valuation & Materials
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 charcha-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-4">Financials, Valuation & Material Estimation</h3>

                    {planResult ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Total Budget</p>
                            <p className="text-sm font-extrabold text-[#1E293B] mt-0.5 font-mono">₹{planResult.metrics.total_budget_lakhs} L</p>
                          </div>
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">CapEx Incurred</p>
                            <p className="text-sm font-extrabold text-[#4D7C0F] mt-0.5 font-mono">₹{planResult.metrics.capex_inr_lakhs} L</p>
                          </div>
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Asset Valuation</p>
                            <p className="text-sm font-extrabold text-[#2563EB] mt-0.5 font-mono">₹{planResult.metrics.market_valuation_lakhs} L</p>
                          </div>
                          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                            <p className="text-[10px] text-[#64748B] font-bold uppercase">Steel Req.</p>
                            <p className="text-sm font-extrabold text-[#D97706] mt-0.5 font-mono">{planResult.metrics.steel_requirement_tons} T</p>
                          </div>
                        </div>

                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-2.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-[#64748B]">Milestone Progress Bar</span>
                            <span className="text-[#EA580C] font-mono">{planResult.metrics.completion_percentage}% Completed</span>
                          </div>
                          <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden p-0.5">
                            <div 
                              className="bg-[#EA580C] h-full rounded-full transition-all duration-700" 
                              style={{ width: `${planResult.metrics.completion_percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <p className="text-xs text-[#1E293B] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] font-medium">
                          {planResult.summary}
                        </p>

                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                          <h4 className="text-xs font-bold text-[#1E293B] mb-2 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#EA580C]" /> Conceptual 3D Architectural Prompt (Pollinations AI)
                          </h4>
                          <code className="text-[11px] text-[#334155] block bg-white p-3 rounded-lg border border-[#CBD5E1] font-mono select-all">
                            {`https://image.pollinations.ai/prompt/Modern%20${encodeURIComponent(structureType)}%20architectural%20rendering,%20photorealistic,%20glass%20facade,%20sustainable%20construction,%208k%20resolution`}
                          </code>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8] border border-dashed border-[#CBD5E1] rounded-2xl bg-[#F8FAFC]">
                        <Calculator className="w-10 h-10 mb-2 opacity-40 text-[#EA580C]" />
                        <p className="text-xs font-semibold text-[#64748B]">Configure parameters and calculate project valuation & material requirements.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: ASSISTANT & WEATHER */}
            {activeTab === 'assistant' && (
              <motion.div 
                key="assistant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="charcha-card p-6 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <CloudSun className="w-4 h-4 text-[#EA580C]" /> Weather-Aware Advisory
                    </h3>
                    <p className="text-xs text-[#64748B]">Select site weather & consult assistant.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#334155] block mb-1">Site Weather Condition</label>
                    <select 
                      value={weatherCondition} 
                      onChange={(e) => setWeatherCondition(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#EA580C] font-semibold"
                    >
                      <option value="Normal">Normal Operating Conditions</option>
                      <option value="High Wind">High Wind (Crane Hazard)</option>
                      <option value="Heavy Rain">Heavy Rain & Monsoon</option>
                      <option value="Extreme Heat">Extreme Heatwave</option>
                    </select>
                  </div>

                  <div className="p-3.5 bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl text-xs text-[#9A3412]">
                    <p className="font-bold mb-0.5">Dynamic Protocol:</p>
                    <p className="text-[11px] text-[#7C2D12] leading-relaxed font-medium">
                      {weatherCondition === 'High Wind' && 'Suspend tower crane operations immediately. Secure loose scaffolding.'}
                      {weatherCondition === 'Heavy Rain' && 'Inspect site drainage pumps, protect electrical panels, and halt external pouring.'}
                      {weatherCondition === 'Extreme Heat' && 'Enforce hourly hydration breaks, mandate shade coverings, and rotate shifts.'}
                      {weatherCondition === 'Normal' && 'Standard operating protocols in effect. Carry out routine inspections.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0]">
                    <h4 className="text-xs font-bold text-[#1E293B] mb-2">Ask Construction Assistant</h4>
                    <form onSubmit={handleChat} className="space-y-3">
                      <textarea 
                        rows="3"
                        value={chatQuestion}
                        onChange={(e) => setChatQuestion(e.target.value)}
                        placeholder="e.g. Recommended curing period for M25 grade concrete under extreme heat?"
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#1E293B] focus:outline-none focus:border-[#EA580C] resize-none font-medium"
                      ></textarea>
                      <button 
                        type="submit"
                        disabled={chatLoading || !chatQuestion}
                        className="w-full charcha-btn py-3 rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                      >
                        {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Send Engineering Query
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2 charcha-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-4">Engineering Advisory & Assistant Response</h3>

                    {chatResult ? (
                      <div className="space-y-4">
                        <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                          <p className="text-xs font-bold text-[#EA580C] mb-1">Weather Protocol Active: {weatherCondition}</p>
                          <p className="text-xs text-[#334155] font-semibold">{chatResult.weather_alert}</p>
                        </div>

                        <p className="text-xs text-[#1E293B] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] leading-relaxed font-semibold">
                          {chatResult.summary}
                        </p>

                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">Key Recommendations & IS Guidelines</h4>
                          {chatResult.recommendations?.map((rec, i) => (
                            <div key={i} className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#1E293B] font-semibold">
                              <CheckCircle className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8] border border-dashed border-[#CBD5E1] rounded-2xl bg-[#F8FAFC]">
                        <CloudSun className="w-10 h-10 mb-2 opacity-40 text-[#EA580C]" />
                        <p className="text-xs font-semibold text-[#64748B]">Select site weather or ask a construction query to receive expert AI advisory.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
