import React, { useState } from 'react';
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
  CheckSquare,
  Workflow,
  BookOpen,
  Terminal,
  Cpu
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

  // API Handlers
  const handleSafetyAudit = async (e) => {
    e.preventDefault();
    if (!safetyFile) return;
    setSafetyLoading(true);
    const formData = new FormData();
    formData.append('file', safetyFile);
    try {
      const res = await fetch('http://localhost:8000/api/safety-audit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSafetyResult(data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    } finally {
      setSafetyLoading(false);
    }
  };

  const handleCrackDiagnosis = async (e) => {
    e.preventDefault();
    if (!crackFile) return;
    setCrackLoading(true);
    const formData = new FormData();
    formData.append('file', crackFile);
    try {
      const res = await fetch('http://localhost:8000/api/crack-diagnosis', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setCrackResult(data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    } finally {
      setCrackLoading(false);
    }
  };

  const handleProjectPlanning = async (e) => {
    e.preventDefault();
    setPlanLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/project-planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structure_type: structureType,
          built_up_sqft: Number(builtUpSqft),
          location_tier: locationTier,
          completion_percentage: Number(completionPct)
        }),
      });
      const data = await res.json();
      setPlanResult(data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    } finally {
      setPlanLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatQuestion) return;
    setChatLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: chatQuestion,
          weather_condition: weatherCondition
        }),
      });
      const data = await res.json();
      setChatResult(data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#070b14] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar matching Skill Wallet / Professional Design */}
      <aside className="w-72 bg-[#0c1322] border-r border-slate-800/80 flex flex-col justify-between p-5 select-none">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/20 text-slate-950 font-bold">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">ConstructIntel</h1>
              <p className="text-[10px] text-amber-400 font-medium">Skill Wallet Capstone Project 1</p>
            </div>
          </div>

          <div className="mb-6 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 shadow-inner">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Key className="w-3.5 h-3.5 text-amber-400" /> Gemini API Key
            </label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AI Studio Key (Optional)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-all font-mono"
            />
            <p className="text-[10px] text-slate-500 mt-1.5">Auto-fallback to simulation mode if empty.</p>
          </div>

          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 px-2">Platform Modules</div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('safety')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'safety' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
            >
              <ShieldCheck className="w-4 h-4" /> 1. Site Safety & PPE Audit
            </button>
            <button 
              onClick={() => setActiveTab('crack')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'crack' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
            >
              <Activity className="w-4 h-4" /> 2. Crack Diagnostics
            </button>
            <button 
              onClick={() => setActiveTab('planning')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'planning' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
            >
              <Calculator className="w-4 h-4" /> 3. Planning & Valuation
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'assistant' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
            >
              <CloudSun className="w-4 h-4" /> 4. Weather & Assistant
            </button>
          </nav>
        </div>

        <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Skill Wallet Credits</span>
            <span className="text-amber-400 font-mono">JWT 300</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-full"></div>
          </div>
          <p className="text-[10px] text-slate-500">Multimodal AI Engine Active</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#070b14] bg-grid-pattern">
        <header className="h-16 border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-amber-400">
              {activeTab === 'safety' && <ShieldCheck className="w-4 h-4" />}
              {activeTab === 'crack' && <Activity className="w-4 h-4" />}
              {activeTab === 'planning' && <Calculator className="w-4 h-4" />}
              {activeTab === 'assistant' && <CloudSun className="w-4 h-4" />}
            </span>
            <h2 className="text-sm font-bold text-white tracking-wide">
              {activeTab === 'safety' && 'Epic 2: Site Safety & PPE Audit Module'}
              {activeTab === 'crack' && 'Epic 2: Crack Diagnostics & Structural Integrity'}
              {activeTab === 'planning' && 'Epic 3: Construction Planning & Real Estate Valuation'}
              {activeTab === 'assistant' && 'Epic 5: Daily Site Assistant & Weather-Aware Advisory'}
            </h2>
          </div>
          <div className="flex items-center gap-2.5 text-xs bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-medium">FastAPI & Gemini Connected</span>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* DISCLAIMER BANNER */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3.5 text-xs text-amber-200/90 shadow-lg shadow-amber-500/5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Engineering Notice:</strong> AI-generated construction assessments are preliminary decision-support tools. Images and automated metrics cannot establish structural safety conclusively without certified human engineering inspection.
            </p>
          </div>

          {/* TAB 1: SAFETY */}
          {activeTab === 'safety' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" /> Upload Site Photo
                </h3>
                <form onSubmit={handleSafetyAudit} className="space-y-4">
                  <div className="border-2 border-dashed border-slate-700/60 rounded-xl p-6 text-center hover:border-amber-500/60 transition-all cursor-pointer bg-slate-950/40">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setSafetyFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 transition-all cursor-pointer"
                    />
                    <p className="text-xs text-slate-400 mt-3 font-medium">{safetyFile ? safetyFile.name : 'Drop JPG/PNG site photo here (OSHA / IS 456)'}</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={safetyLoading || !safetyFile}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                  >
                    {safetyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    Run OSHA & IS 456 Safety Audit
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Audit Results & PPE Compliance</h3>
                  {safetyResult ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium">Overall Status</p>
                          <p className="text-sm font-bold text-white mt-0.5">{safetyResult.overall_status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-slate-400 font-medium">Safety Score</p>
                          <p className={`text-xl font-bold font-mono ${safetyResult.safety_score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {safetyResult.safety_score}/100
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                        {safetyResult.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {safetyResult.ppe_detection && Object.entries(safetyResult.ppe_detection).map(([item, val]) => (
                          <div key={item} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-slate-200 capitalize">{item.replace('_', ' ')}</span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${val.status === 'Compliant' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                {val.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{val.details}</p>
                          </div>
                        ))}
                      </div>

                      {safetyResult.findings && safetyResult.findings.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-slate-300">Identified Hazards & Corrective Remedies</h4>
                          {safetyResult.findings.map((f, i) => (
                            <div key={i} className="bg-red-950/20 border border-red-900/40 p-3.5 rounded-xl flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              <div className="text-xs">
                                <p className="font-bold text-red-200">{f.hazard} <span className="text-[10px] bg-red-900/60 text-red-300 px-2 py-0.5 rounded ml-2 font-mono">Severity: {f.severity}</span></p>
                                <p className="text-slate-300 mt-1"><strong>Remedy:</strong> {f.remedy}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                      <ShieldCheck className="w-10 h-10 mb-3 opacity-30 text-amber-400" />
                      <p className="text-xs font-medium">Upload a site photo and run the OSHA & IS 456 safety audit to view structured JSON intelligence.</p>
                    </div>
                  )}
                </div>

                {safetyResult && (
                  <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                    <button 
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(safetyResult, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'safety-audit-report.json';
                        a.click();
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Download JSON Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CRACK DIAGNOSTICS */}
          {activeTab === 'crack' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" /> Upload Concrete / Wall Surface
                </h3>
                <form onSubmit={handleCrackDiagnosis} className="space-y-4">
                  <div className="border-2 border-dashed border-slate-700/60 rounded-xl p-6 text-center hover:border-amber-500/60 transition-all cursor-pointer bg-slate-950/40">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setCrackFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 transition-all cursor-pointer"
                    />
                    <p className="text-xs text-slate-400 mt-3 font-medium">{crackFile ? crackFile.name : 'Drop surface defect photo here'}</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={crackLoading || !crackFile}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                  >
                    {crackLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    Analyze Structural Defect
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Crack Diagnostics & Engineering Repairs</h3>
                  {crackResult ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Defect Type</p>
                          <p className="text-xs font-bold text-amber-400 mt-1">{crackResult.defect_type}</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Est. Width</p>
                          <p className="text-xs font-bold text-white mt-1 font-mono">{crackResult.estimated_width_mm} mm</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Urgency</p>
                          <p className="text-xs font-bold text-red-400 mt-1">{crackResult.urgency}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                        {crackResult.summary}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                          <h4 className="text-xs font-bold text-slate-300 mb-2.5">Root Causes</h4>
                          <ul className="space-y-2 text-xs text-slate-400">
                            {crackResult.root_causes?.map((rc, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span> {rc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                          <h4 className="text-xs font-bold text-slate-300 mb-2.5">Recommended Engineering Repairs</h4>
                          <ul className="space-y-2 text-xs text-slate-400">
                            {crackResult.recommended_repairs?.map((rep, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span> {rep}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                      <Activity className="w-10 h-10 mb-3 opacity-30 text-amber-400" />
                      <p className="text-xs font-medium">Upload concrete or wall surface photo for AI crack diagnosis and structural repair protocols.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLANNING & VALUATION */}
          {activeTab === 'planning' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" /> Project Parameters
                </h3>
                <form onSubmit={handleProjectPlanning} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Structure Type</label>
                    <select 
                      value={structureType} 
                      onChange={(e) => setStructureType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Commercial Complex">Commercial Complex</option>
                      <option value="Residential High-Rise">Residential High-Rise</option>
                      <option value="Industrial Warehouse">Industrial Warehouse</option>
                      <option value="Institutional Building">Institutional Building</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Built-up Area (Sq. Ft.)</label>
                    <input 
                      type="number" 
                      value={builtUpSqft} 
                      onChange={(e) => setBuiltUpSqft(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Location Tier (India)</label>
                    <select 
                      value={locationTier} 
                      onChange={(e) => setLocationTier(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Tier 1">Tier 1 (Mumbai, Delhi, Bangalore)</option>
                      <option value="Tier 2">Tier 2 (Pune, Jaipur, Ahmedabad)</option>
                      <option value="Tier 3">Tier 3 (Township / Peripheral)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                      <span>Completion Percentage</span>
                      <span className="font-bold text-amber-400 font-mono">{completionPct}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={completionPct} 
                      onChange={(e) => setCompletionPct(e.target.value)}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={planLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                  >
                    {planLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                    Calculate Valuation & Materials
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Financials, Valuation & Material Estimation</h3>
                  {planResult ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Total Budget</p>
                          <p className="text-sm font-bold text-white mt-1 font-mono">₹{planResult.metrics.total_budget_lakhs} L</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">CapEx Incurred</p>
                          <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">₹{planResult.metrics.capex_inr_lakhs} L</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Asset Valuation</p>
                          <p className="text-sm font-bold text-blue-400 mt-1 font-mono">₹{planResult.metrics.market_valuation_lakhs} L</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                          <p className="text-[11px] text-slate-400 font-medium">Steel Req.</p>
                          <p className="text-sm font-bold text-amber-400 mt-1 font-mono">{planResult.metrics.steel_requirement_tons} T</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Milestone Progress</span>
                          <span className="font-bold text-amber-400 font-mono">{planResult.metrics.completion_percentage}% Completed</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-sm" 
                            style={{ width: `${planResult.metrics.completion_percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        {planResult.summary}
                      </p>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-amber-400" /> Conceptual 3D Architectural Rendering Prompt (Pollinations AI)
                        </h4>
                        <code className="text-[11px] text-slate-400 block bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono select-all">
                          {`https://image.pollinations.ai/prompt/Modern%20${encodeURIComponent(structureType)}%20architectural%20rendering,%20photorealistic,%20glass%20facade,%20sustainable%20construction,%208k%20resolution`}
                        </code>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                      <Calculator className="w-10 h-10 mb-3 opacity-30 text-amber-400" />
                      <p className="text-xs font-medium">Configure project parameters and calculate valuation & material estimates.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASSISTANT & WEATHER */}
          {activeTab === 'assistant' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-amber-400" /> Weather-Aware Advisory
                </h3>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Select Site Weather Condition</label>
                  <select 
                    value={weatherCondition} 
                    onChange={(e) => setWeatherCondition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Normal">Normal Operating Conditions</option>
                    <option value="High Wind">High Wind (Crane Hazard)</option>
                    <option value="Heavy Rain">Heavy Rain & Monsoon</option>
                    <option value="Extreme Heat">Extreme Heatwave</option>
                  </select>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                  <p className="font-bold mb-1">Dynamic Safety Protocol:</p>
                  <p className="text-[11px] text-amber-300/90 leading-relaxed">
                    {weatherCondition === 'High Wind' && 'Suspend tower crane operations immediately. Secure loose scaffolding and debris.'}
                    {weatherCondition === 'Heavy Rain' && 'Inspect site drainage systems, protect open electrical panels, and halt external pouring.'}
                    {weatherCondition === 'Extreme Heat' && 'Enforce hourly hydration breaks, mandate shade coverings, and monitor worker fatigue.'}
                    {weatherCondition === 'Normal' && 'Standard operating protocols in effect. Carry out routine inspections.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white mb-2">Ask Construction Assistant</h4>
                  <form onSubmit={handleChat} className="space-y-3">
                    <textarea 
                      rows="3"
                      value={chatQuestion}
                      onChange={(e) => setChatQuestion(e.target.value)}
                      placeholder="e.g. What is the recommended curing period for M25 grade concrete under extreme heat?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none font-medium"
                    ></textarea>
                    <button 
                      type="submit"
                      disabled={chatLoading || !chatQuestion}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25"
                    >
                      {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send Engineering Query
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Engineering Advisory & Assistant Response</h3>
                  {chatResult ? (
                    <div className="space-y-4">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <p className="text-xs font-bold text-amber-400 mb-1">Weather Protocol Active: {weatherCondition}</p>
                        <p className="text-xs text-slate-300">{chatResult.weather_alert}</p>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                        {chatResult.summary}
                      </p>

                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-300">Key Recommendations & IS Code Guidelines</h4>
                        {chatResult.recommendations?.map((rec, i) => (
                          <div key={i} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                      <CloudSun className="w-10 h-10 mb-3 opacity-30 text-amber-400" />
                      <p className="text-xs font-medium">Select weather condition or ask a construction query to receive AI advisory.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
