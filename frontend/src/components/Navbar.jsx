import React from 'react';
import { HardHat, Shield, Activity, Sparkles, Building2, MessageSquare, Compass, Cpu, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const isDemo = !healthInfo?.gemini_api_key_configured;

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Distinctive Logo & Brand */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF5E00] to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
            <Compass className="w-6 h-6 text-white font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#0F172A] group-hover:text-[#FF5E00] transition-colors">
                ConstructAI Pro
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFF7ED] text-[#FF5E00] border border-[#FED7AA]">
                Multimodal Suite
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-medium">
              Next-Gen Construction & Engineering Platform
            </p>
          </div>
        </div>

        {/* Clean Modern Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FAFAF9] p-1.5 rounded-2xl border border-[#E2E8F0]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#FF5E00] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'safety'
                ? 'bg-[#FF5E00] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Safety Audit
          </button>
          <button
            onClick={() => setActiveTab('crack')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'crack'
                ? 'bg-[#FF5E00] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Crack Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'planning'
                ? 'bg-[#FF5E00] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Planning & Valuation
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'assistant'
                ? 'bg-[#FF5E00] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            AI Assistant
          </button>
        </nav>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          {isDemo ? (
            <div 
              title="Running in high-fidelity Demonstration Mode. Add GEMINI_API_KEY to backend/.env for live inference."
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]"
            >
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse"></span>
              <span>Demo Engine</span>
            </div>
          ) : (
            <div 
              title="Connected to Google Gemini Multimodal API"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F7FEE7] text-[#365314] border border-[#BEF264]"
            >
              <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              <Cpu className="w-3.5 h-3.5 text-[#4D7C0F]" />
              <span>Gemini Active</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
