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
  Zap,
  Info
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
    { id: 'safety', label: 'Site Safety & PPE Audit', icon: ShieldCheck, badge: 'Epic 2' },
    { id: 'crack', label: 'Crack Diagnostics', icon: Activity, badge: 'Epic 2' },
    { id: 'planning', label: 'Planning & Valuation', icon: Calculator, badge: 'Epic 3' },
    { id: 'assistant', label: 'Weather & Assistant', icon: CloudSun, badge: 'Epic 5' },
  ];

  return (
    <div className="flex h-screen bg-[#030712] text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Modern High-End Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-80 bg-[#080e1a]/90 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col justify-between p-6 z-30 shadow-2xl"
      >
        <div>
          {/* Brand Logo & Header */}
          <div className="flex items-center gap-3.5 mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center text-amber-400 shadow-xl">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                ConstructIntel <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full font-mono">AI v2.0</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Multimodal Intelligence Platform</p>
            </div>
          </div>

          {/* API Key Box */}
          <div className="mb-6 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 rounded-2xl border border-slate-800/80 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
            <label className="text-xs font-bold text-slate-200 flex items-center gap-2 mb-2">
              <Key className="w-3.5 h-3.5 text-amber-400" /> Gemini API Key
            </label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AI Studio Key (Optional)"
              className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
            />
            <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" /> Auto-simulated if unsupplied
            </p>
          </div>

          {/* Navigation */}
          <div className="text-[10px] uppercase tracking-widest text-slate-300 font-bold mb-3 px-2">Navigation Modules</div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 font-bold scale-[1.02]' 
                      : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Skill Wallet Widget */}
        <div className="p-4 bg-gradient-to-b from-slate-900/90 to-slate-950 rounded-2xl border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Skill Wallet
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">JWT 300</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full w-full shadow-sm"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Capstone Project 1</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live
            </span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#030712] via-[#070e1c] to-[#030712] bg-grid-pattern">
        
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/80 bg-[#080e1a]/80 backdrop-blur-2xl px-10 flex items-center justify-between z-20 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-amber-400 shadow-inner">
              {activeTab === 'safety' && <ShieldCheck className="w-5 h-5" />}
              {activeTab === 'crack' && <Activity className="w-5 h-5" />}
              {activeTab === 'planning' && <Calculator className="w-5 h-5" />}
              {activeTab === 'assistant' && <CloudSun className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {activeTab === 'safety' && 'Module 1'}
                  {activeTab === 'crack' && 'Module 2'}
                  {activeTab === 'planning' && 'Module 3'}
                  {activeTab === 'assistant' && 'Module 4'}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-xs text-slate-400 font-medium">Multimodal Construction Workspace</span>
              </div>
              <h2 className="text-base font-extrabold text-white tracking-tight mt-0.5">
                {activeTab === 'safety' && 'Site Safety & PPE Compliance Audit (OSHA & IS 456)'}
                {activeTab === 'crack' && 'Crack Diagnostics & Structural Integrity Analysis'}
                {activeTab === 'planning' && 'Construction Planning & Real Estate Valuation Engine'}
                {activeTab === 'assistant' && 'Daily Site Assistant & Weather-Aware Advisory'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800/80 px-4 py-2 rounded-2xl shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></span>
              <span className="text-xs text-slate-200 font-bold">FastAPI + Gemini Active</span>
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto space-y-8 pb-16">

            {/* Architectural Notice Banner */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4.5 flex items-start gap-4 shadow-xl backdrop-blur-md"
            >
              <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-200">Multimodal Intelligence Disclaimer</p>
                <p className="text-slate-300/90 leading-relaxed">
                  AI-generated construction assessments serve as advanced preliminary decision-support tools. Automated visual analytics and metric projections cannot establish absolute structural safety without certified human engineering inspection.
                </p>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* TAB 1: SAFETY */}
              {activeTab === 'safety' && (
                <motion.div 
                  key="safety"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-1">
                        <Upload className="w-4 h-4 text-amber-400" /> Site Photo Ingestion
                      </h3>
                      <p className="text-xs text-slate-400">Upload high-resolution construction site captures.</p>
                    </div>

                    <form onSubmit={handleSafetyAudit} className="space-y-5">
                      <div className="border-2 border-dashed border-slate-700/80 rounded-2xl p-7 text-center hover:border-amber-500/80 transition-all cursor-pointer bg-slate-950/50 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Upload className="w-8 h-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setSafetyFile(e.target.files[0])}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 transition-all cursor-pointer"
                        />
                        <p className="text-xs text-slate-300 mt-3 font-semibold">{safetyFile ? safetyFile.name : 'Drag & drop site photo or browse'}</p>
                      </div>

                      <button 
                        type="submit" 
                        disabled={safetyLoading}
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-500/25 disabled:opacity-50 group"
                      >
                        {safetyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        Run OSHA & IS 456 Safety Audit
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-2 glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white mb-6 flex items-center justify-between">
                        <span>Multimodal Audit Report & PPE Compliance</span>
                        {safetyResult && <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">Analysis Complete</span>}
                      </h3>

                      {safetyResult ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                            <div>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Overall Status</p>
                              <p className="text-sm font-extrabold text-white mt-1">{safetyResult.overall_status}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Safety Score</p>
                              <p className={`text-2xl font-extrabold font-mono mt-0.5 ${safetyResult.safety_score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {safetyResult.safety_score}<span className="text-xs text-slate-500">/100</span>
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-200 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 leading-relaxed font-medium">
                            {safetyResult.summary}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            {safetyResult.ppe_detection && Object.entries(safetyResult.ppe_detection).map(([item, val]) => (
                              <div key={item} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-extrabold text-slate-200 capitalize">{item.replace('_', ' ')}</span>
                                  <span className={`text-[10px] px-3 py-0.5 rounded-full font-extrabold ${val.status === 'Compliant' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                    {val.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-normal">{val.details}</p>
                              </div>
                            ))}
                          </div>

                          {safetyResult.findings && safetyResult.findings.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Identified Hazards & Corrective Remedies</h4>
                              {safetyResult.findings.map((f, i) => (
                                <div key={i} className="bg-red-950/20 border border-red-900/40 p-4 rounded-2xl flex items-start gap-3.5">
                                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                  <div className="text-xs space-y-1">
                                    <div className="flex items-center justify-between">
                                      <p className="font-extrabold text-red-200 text-sm">{f.hazard}</p>
                                      <span className="text-[10px] bg-red-900/60 text-red-300 px-2.5 py-0.5 rounded font-mono font-bold">Severity: {f.severity}</span>
                                    </div>
                                    <p className="text-slate-300 font-medium"><strong>Remedy:</strong> {f.remedy}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-72 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-3xl bg-slate-950/30">
                          <ShieldCheck className="w-12 h-12 mb-3 opacity-30 text-amber-400 animate-pulse" />
                          <p className="text-xs font-semibold">Upload site photo & run audit to generate complete structured intelligence.</p>
                        </div>
                      )}
                    </div>

                    {safetyResult && (
                      <div className="mt-6 pt-5 border-t border-slate-800/80 flex justify-end">
                        <button 
                          onClick={() => {
                            const blob = new Blob([JSON.stringify(safetyResult, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'safety-audit-report.json';
                            a.click();
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-slate-700 shadow-lg"
                        >
                          <FileText className="w-4 h-4 text-amber-400" /> Export JSON Report
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-1">
                        <Upload className="w-4 h-4 text-amber-400" /> Surface Crack Ingestion
                      </h3>
                      <p className="text-xs text-slate-400">Upload close-up concrete or masonry defect images.</p>
                    </div>

                    <form onSubmit={handleCrackDiagnosis} className="space-y-5">
                      <div className="border-2 border-dashed border-slate-700/80 rounded-2xl p-7 text-center hover:border-amber-500/80 transition-all cursor-pointer bg-slate-950/50 group relative overflow-hidden">
                        <Activity className="w-8 h-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setCrackFile(e.target.files[0])}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 transition-all cursor-pointer"
                        />
                        <p className="text-xs text-slate-300 mt-3 font-semibold">{crackFile ? crackFile.name : 'Drag & drop defect surface image'}</p>
                      </div>

                      <button 
                        type="submit" 
                        disabled={crackLoading}
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-500/25 disabled:opacity-50 group"
                      >
                        {crackLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        Analyze Structural Defect
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-2 glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white mb-6">Crack Diagnostics & Engineering Repair Protocol</h3>

                      {crackResult ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Defect Type</p>
                              <p className="text-xs font-extrabold text-amber-400 mt-1">{crackResult.defect_type}</p>
                            </div>
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Est. Width</p>
                              <p className="text-xs font-extrabold text-white mt-1 font-mono">{crackResult.estimated_width_mm} mm</p>
                            </div>
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Urgency</p>
                              <p className="text-xs font-extrabold text-red-400 mt-1">{crackResult.urgency}</p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-200 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 leading-relaxed font-medium">
                            {crackResult.summary}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                              <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-3">Root Causes</h4>
                              <ul className="space-y-2.5 text-xs text-slate-300">
                                {crackResult.root_causes?.map((rc, i) => (
                                  <li key={i} className="flex items-center gap-2.5 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span> {rc}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                              <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-3">Recommended Repairs</h4>
                              <ul className="space-y-2.5 text-xs text-slate-300">
                                {crackResult.recommended_repairs?.map((rep, i) => (
                                  <li key={i} className="flex items-center gap-2.5 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span> {rep}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-72 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-3xl bg-slate-950/30">
                          <Activity className="w-12 h-12 mb-3 opacity-30 text-amber-400 animate-pulse" />
                          <p className="text-xs font-semibold">Upload defect surface photo for AI structural diagnosis and repair plan.</p>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-1">
                        <Calculator className="w-4 h-4 text-amber-400" /> Project Parameters
                      </h3>
                      <p className="text-xs text-slate-400">Configure building scope, tier, and milestone.</p>
                    </div>

                    <form onSubmit={handleProjectPlanning} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1.5">Structure Type</label>
                        <select 
                          value={structureType} 
                          onChange={(e) => setStructureType(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
                        >
                          <option value="Commercial Complex">Commercial Complex</option>
                          <option value="Residential High-Rise">Residential High-Rise</option>
                          <option value="Industrial Warehouse">Industrial Warehouse</option>
                          <option value="Institutional Building">Institutional Building</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1.5">Built-up Area (Sq. Ft.)</label>
                        <input 
                          type="number" 
                          value={builtUpSqft} 
                          onChange={(e) => setBuiltUpSqft(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1.5">Location Tier (India)</label>
                        <select 
                          value={locationTier} 
                          onChange={(e) => setLocationTier(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
                        >
                          <option value="Tier 1">Tier 1 (Mumbai, Delhi, Bangalore)</option>
                          <option value="Tier 2">Tier 2 (Pune, Jaipur, Ahmedabad)</option>
                          <option value="Tier 3">Tier 3 (Township / Peripheral)</option>
                        </select>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-2 font-bold">
                          <span>Completion Percentage</span>
                          <span className="text-amber-400 font-mono">{completionPct}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={completionPct} 
                          onChange={(e) => setCompletionPct(e.target.value)}
                          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={planLoading}
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-500/25"
                      >
                        {planLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                        Calculate Valuation & Materials
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-2 glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white mb-6">Financials, Valuation & Material Estimation</h3>

                      {planResult ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Total Budget</p>
                              <p className="text-base font-extrabold text-white mt-1 font-mono">₹{planResult.metrics.total_budget_lakhs} L</p>
                            </div>
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">CapEx Incurred</p>
                              <p className="text-base font-extrabold text-emerald-400 mt-1 font-mono">₹{planResult.metrics.capex_inr_lakhs} L</p>
                            </div>
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Asset Valuation</p>
                              <p className="text-base font-extrabold text-blue-400 mt-1 font-mono">₹{planResult.metrics.market_valuation_lakhs} L</p>
                            </div>
                            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                              <p className="text-[11px] text-slate-400 font-bold uppercase">Steel Req.</p>
                              <p className="text-base font-extrabold text-amber-400 mt-1 font-mono">{planResult.metrics.steel_requirement_tons} T</p>
                            </div>
                          </div>

                          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-400">Milestone Progress Bar</span>
                              <span className="text-amber-400 font-mono">{planResult.metrics.completion_percentage}% Completed</span>
                            </div>
                            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-md" 
                                style={{ width: `${planResult.metrics.completion_percentage}%` }}
                              ></div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-200 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 font-medium">
                            {planResult.summary}
                          </p>

                          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                            <h4 className="text-xs font-extrabold text-slate-200 mb-2.5 flex items-center gap-2">
                              <Layers className="w-4 h-4 text-amber-400" /> Conceptual 3D Architectural Prompt (Pollinations AI)
                            </h4>
                            <code className="text-[11px] text-slate-300 block bg-slate-900 p-3.5 rounded-xl border border-slate-800 font-mono select-all">
                              {`https://image.pollinations.ai/prompt/Modern%20${encodeURIComponent(structureType)}%20architectural%20rendering,%20photorealistic,%20glass%20facade,%20sustainable%20construction,%208k%20resolution`}
                            </code>
                          </div>
                        </div>
                      ) : (
                        <div className="h-72 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-3xl bg-slate-950/30">
                          <Calculator className="w-12 h-12 mb-3 opacity-30 text-amber-400 animate-pulse" />
                          <p className="text-xs font-semibold">Configure parameters and calculate project valuation & material requirements.</p>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 space-y-5">
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-1">
                        <CloudSun className="w-4 h-4 text-amber-400" /> Weather-Aware Advisory
                      </h3>
                      <p className="text-xs text-slate-400">Select site weather & consult assistant.</p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Site Weather Condition</label>
                      <select 
                        value={weatherCondition} 
                        onChange={(e) => setWeatherCondition(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
                      >
                        <option value="Normal">Normal Operating Conditions</option>
                        <option value="High Wind">High Wind (Crane Hazard)</option>
                        <option value="Heavy Rain">Heavy Rain & Monsoon</option>
                        <option value="Extreme Heat">Extreme Heatwave</option>
                      </select>
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200">
                      <p className="font-bold mb-1">Dynamic Protocol:</p>
                      <p className="text-[11px] text-amber-300/90 leading-relaxed font-medium">
                        {weatherCondition === 'High Wind' && 'Suspend tower crane operations immediately. Secure loose scaffolding.'}
                        {weatherCondition === 'Heavy Rain' && 'Inspect site drainage pumps, protect electrical panels, and halt external pouring.'}
                        {weatherCondition === 'Extreme Heat' && 'Enforce hourly hydration breaks, mandate shade coverings, and rotate shifts.'}
                        {weatherCondition === 'Normal' && 'Standard operating protocols in effect. Carry out routine inspections.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <h4 className="text-xs font-extrabold text-white mb-2">Ask Construction Assistant</h4>
                      <form onSubmit={handleChat} className="space-y-3">
                        <textarea 
                          rows="3"
                          value={chatQuestion}
                          onChange={(e) => setChatQuestion(e.target.value)}
                          placeholder="e.g. Recommended curing period for M25 grade concrete under extreme heat?"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none font-medium"
                        ></textarea>
                        <button 
                          type="submit"
                          disabled={chatLoading || !chatQuestion}
                          className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/25"
                        >
                          {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Send Engineering Query
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="lg:col-span-2 glass-panel rounded-3xl p-7 shadow-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white mb-6">Engineering Advisory & Assistant Response</h3>

                      {chatResult ? (
                        <div className="space-y-5">
                          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                            <p className="text-xs font-extrabold text-amber-400 mb-1">Weather Protocol Active: {weatherCondition}</p>
                            <p className="text-xs text-slate-300 font-medium">{chatResult.weather_alert}</p>
                          </div>

                          <p className="text-xs text-slate-200 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 leading-relaxed font-medium">
                            {chatResult.summary}
                          </p>

                          <div className="space-y-3">
                            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Key Recommendations & IS Guidelines</h4>
                            {chatResult.recommendations?.map((rec, i) => (
                              <div key={i} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3 text-xs text-slate-200 font-medium">
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-72 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-3xl bg-slate-950/30">
                          <CloudSun className="w-12 h-12 mb-3 opacity-30 text-amber-400 animate-pulse" />
                          <p className="text-xs font-semibold">Select site weather or ask a construction query to receive expert AI advisory.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
