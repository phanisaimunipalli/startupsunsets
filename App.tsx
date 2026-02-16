import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CategoryGrid } from "./components/CategoryGrid";
import { NetflixRow } from "./components/NetflixRow";
import { CommandPalette } from "./components/CommandPalette";
import { StartupModal } from "./components/StartupModal";
import { CATEGORIES } from "./constants";
import { Category, Startup } from "./types";
import {
  fetchCategoryStartups,
  searchSpecificStartup,
} from "./services/geminiService";
import {
  ArrowLeft,
  Search,
  ArrowDown,
  Sparkles,
  Linkedin,
  AlertTriangle,
  Zap,
  Activity,
  FileText,
  Database,
} from "lucide-react";

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Local state for the hero input
  const [heroInput, setHeroInput] = useState("");

  // New State for Modal
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  // Load startups when a category is selected
  useEffect(() => {
    if (activeCategory) {
      setLoading(true);
      fetchCategoryStartups(activeCategory.name, activeCategory.focus).then(
        (data) => {
          setStartups(data);
          setLoading(false);
        },
      );
    }
  }, [activeCategory]);

  // Load startups when a search is performed
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setActiveCategory(null); // Clear category view
      searchSpecificStartup(searchQuery).then((data) => {
        setStartups(data);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  const handleGoHome = () => {
    setActiveCategory(null);
    setSearchQuery(null);
    setStartups([]);
    setHeroInput("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Triggered by useEffect
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroInput.trim()) {
      handleSearch(heroInput);
    }
  };

  // Determine if we are in "Results View"
  const isResultsView = !!(activeCategory || searchQuery);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-[#FF8C42] selection:text-white flex flex-col transition-colors duration-500">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onHome={handleGoHome}
        showSearchBar={isResultsView}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />

      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />

      <main className="flex-grow pt-28">
        {/* LANDING PAGE STATE */}
        {!isResultsView && (
          <>
            {/* HERO SECTION */}
            <div className="relative min-h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center perspective-1000 -mt-20">
              {/* 1. ARCHITECTURAL BACKGROUND */}
              <div className="absolute inset-0 z-0 bg-slate-50">
                {/* Perspective Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] transform perspective-1000 rotate-x-12 scale-110" />

                {/* Ambient Auroras */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/20 blur-[120px] animate-pulse delay-700" />

                {/* Noise Texture for High-Fi Feel */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
              </div>

              {/* 2. FLOATING ARTIFACTS (3D Elements) - Hidden on Mobile/Tablet to reduce clutter */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
                {/* Left Cluster */}
                <div className="absolute top-[20%] left-[5%] xl:left-[10%] animate-[floatUp_20s_linear_infinite]">
                  <div className="w-48 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl shadow-indigo-500/5 rotate-[-6deg] transform hover:scale-110 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle size={12} /> Valuation Crash
                    </div>
                    <div className="text-xl font-bold text-slate-800">
                      WeWork
                    </div>
                    <div className="text-sm text-slate-500">
                      $-47 Billion wipeout
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[25%] left-[15%] animate-[floatUp_25s_linear_infinite] delay-1000">
                  <div className="w-40 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg rotate-[3deg]">
                    <div className="h-2 w-12 bg-slate-200 rounded-full mb-2" />
                    <div className="text-lg font-bold text-slate-700">
                      Theranos
                    </div>
                    <div className="text-xs text-slate-400">Total Fraud</div>
                  </div>
                </div>

                {/* Right Cluster */}
                <div className="absolute top-[15%] right-[5%] xl:right-[12%] animate-[floatUp_18s_linear_infinite] delay-500">
                  <div className="w-52 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl shadow-orange-500/10 rotate-[4deg] transform hover:rotate-0 transition-all">
                    <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold text-xs uppercase tracking-wider">
                      <Zap size={12} /> Burn Rate
                    </div>
                    <div className="text-xl font-bold text-slate-800">
                      Quibi
                    </div>
                    <div className="text-sm text-slate-500">
                      Burned $1.7B in 6 mos
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[20%] right-[18%] animate-[floatUp_22s_linear_infinite] delay-1500">
                  <div className="w-44 p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 shadow-lg rotate-[-2deg]">
                    <div className="text-lg font-bold text-slate-600">
                      Juicero
                    </div>
                    <div className="text-xs text-slate-400">
                      $400 Squeeze Bag
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. HERO CONTENT */}
              <div className="relative z-10 px-4 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/60 border border-white/80 shadow-sm text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-700 ring-1 ring-slate-900/5">
                  <Sparkles size={14} className="text-[#FF8C42]" />
                  <span>The Archive of Missed Opportunities</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1] sm:leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  Why do promising{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#4B3756]">
                    startups
                  </span>{" "}
                  fail?
                </h1>

                <p className="mt-2 text-lg sm:text-2xl text-slate-500 max-w-3xl mx-auto mb-10 sm:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 font-medium px-4">
                  Analyze the{" "}
                  <strong className="text-slate-800">missed pivots</strong> that
                  might have saved the $100B graveyard.
                </p>

                {/* 2026 FUTURE SEARCH BAR */}
                <div className="w-full max-w-md sm:max-w-4xl mx-auto animate-in fade-in scale-95 duration-500 delay-200 relative z-20 group px-2 sm:px-0">
                  {/* Living Gradient Aura */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                  <form
                    onSubmit={handleHeroSubmit}
                    className="relative flex items-center bg-white/90 backdrop-blur-2xl rounded-full p-1.5 sm:p-2 ring-1 ring-slate-200/50 shadow-2xl shadow-indigo-500/10 transition-transform transform group-hover:scale-[1.01]"
                  >
                    <div className="pl-4 sm:pl-6 pr-2 sm:pr-4 flex items-center justify-center">
                      <div className="relative">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-focus-within:text-[#FF8C42] transition-colors" />
                        {/* Pulsing AI Dot */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF8C42] rounded-full animate-ping opacity-0 group-focus-within:opacity-100" />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={heroInput}
                      onChange={(e) => setHeroInput(e.target.value)}
                      placeholder="Search your idea... e.g., Social apps for Pets, Uber for Laundry, AI Customer Service"
                      className="flex-grow h-12 sm:h-14 bg-transparent border-none outline-none text-base sm:text-xl text-slate-800 placeholder:text-slate-400/80 font-medium w-full min-w-0"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-900 text-white hover:bg-[#FF8C42] hover:scale-105 transition-all duration-300 shadow-lg shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                    </button>
                  </form>
                </div>

                {/* Futuristic Tags */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-2">
                  {[
                    "AI Wearables",
                    "Vertical Farming",
                    "Neobanks",
                    "Micro-mobility",
                  ].map((term) => (
                    <button
                      type="button"
                      key={term}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch(term);
                      }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/40 border border-slate-200 hover:bg-white hover:border-orange-200 text-slate-500 hover:text-[#FF8C42] text-xs sm:text-sm font-semibold transition-all shadow-sm backdrop-blur-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden sm:block">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Explore Categories
                  </span>
                  <ArrowDown size={16} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div className="bg-white relative z-20 border-t border-slate-100 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)]">
              <CategoryGrid
                categories={CATEGORIES}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </>
        )}

        {/* CATEGORY / SEARCH DETAIL STATE */}
        {isResultsView && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* Mission Control Header - WHITE THEME */}
            <div className="relative h-auto min-h-[35vh] w-full overflow-hidden bg-slate-50 border-b border-slate-200">
              {/* Clean Grid Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_100%,transparent_100%)]"></div>
              </div>

              {/* Top Nav */}
              <div className="absolute top-0 left-0 w-full p-4 sm:p-8 flex justify-between items-start z-10 pt-32">
                <button
                  onClick={handleGoHome}
                  className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-emerald-100">
                  <Activity size={10} className="animate-pulse" /> SYSTEM ONLINE
                </div>
              </div>

              {/* Main Header Content */}
              <div className="relative pt-12 pb-12 sm:pb-12 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-start justify-end z-10 h-full">
                <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-orange-50 border border-orange-100">
                    <FileText size={10} className="text-[#FF8C42]" />
                    <span className="text-[#FF8C42] font-bold tracking-[0.2em] uppercase text-[10px]">
                      Analysis Protocol
                    </span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-slate-400 font-mono text-xs">
                    ID: {Date.now().toString().slice(-6)}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tighter leading-tight sm:leading-none animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                  {activeCategory ? activeCategory.name : `"${searchQuery}"`}
                </h1>

                <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
                  {activeCategory
                    ? activeCategory.description
                    : `Deep forensic analysis of verifiable failures related to ${searchQuery}.`}
                </p>
              </div>
            </div>

            {/* The Grid Container - Clean Slate */}
            <div className="relative z-10 min-h-screen bg-slate-50">
              <NetflixRow
                title={
                  activeCategory
                    ? `Case Files: ${activeCategory.name}`
                    : "Relevant Case Files"
                }
                startups={startups}
                isLoading={loading}
                onSelectStartup={setSelectedStartup}
              />
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-8 sm:py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Sparkles size={16} className="text-[#FF8C42]" />
            <span>
              Powered by{" "}
              <span className="text-slate-700 font-bold">
                Gemini Intelligence
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/iamphanisairam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors text-sm font-semibold border border-slate-200 hover:border-blue-200"
            >
              <Linkedin size={16} />
              Created by Phani Sai Ram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
