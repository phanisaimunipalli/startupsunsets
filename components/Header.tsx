import React from "react";
import { Search, Sunset, Command, Menu } from "lucide-react";

interface HeaderProps {
  onOpenSearch: () => void;
  onHome: () => void;
  showSearchBar: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onHome,
  showSearchBar,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500">
      {/* 
        The "Dynamic Island" Header 
        Floating, pill-shaped, premium glassmorphism.
      */}
      <div className="w-full max-w-3xl pointer-events-auto">
        <nav className="relative flex items-center justify-between p-2 pl-3 bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.005]">
          {/* 1. Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none pr-4"
            onClick={onHome}
          >
            {/* Logo Container */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white overflow-hidden shadow-lg shadow-slate-900/20 group-hover:shadow-orange-500/30 transition-all duration-500">
              {/* Gradient Reveal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8C42] to-[#4B3756] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <Sunset
                size={18}
                className="relative z-10 group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center h-full">
              <span className="font-bold text-slate-900 tracking-tight leading-none text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF8C42] group-hover:to-[#4B3756] transition-all duration-300">
                Startup Sunsets
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1 group-hover:text-slate-500 transition-colors">
                Archive
              </span>
            </div>
          </div>

          {/* 2. Contextual Search (Visible only in results view or if enforced) */}
          {/* Note: In the landing view, we might want this hidden to keep it clean, appearing only when scrolling or in results */}
          {showSearchBar && (
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-300">
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-4 py-1.5 bg-slate-100/50 hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-full text-xs font-medium text-slate-500 transition-all group/search"
              >
                <Search
                  size={12}
                  className="group-hover/search:text-[#FF8C42] transition-colors"
                />
                <span>Search archive...</span>
                <kbd className="hidden lg:inline-flex items-center h-4 px-1 text-[9px] font-sans font-bold text-slate-400 bg-white border border-slate-200 rounded ml-1">
                  ⌘K
                </kbd>
              </button>
            </div>
          )}

          {/* 3. Right Actions */}
          <div className="flex items-center gap-2 pr-1">
            {/* Mobile Search Trigger */}
            {showSearchBar && (
              <button
                onClick={onOpenSearch}
                className="md:hidden p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <Search size={16} />
              </button>
            )}

            {/* "Live" Indicator Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100/50">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Online
              </span>
            </div>

            {/* User / Menu Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#FF8C42] cursor-pointer transition-colors group/menu">
              <Menu
                size={14}
                className="group-hover/menu:scale-110 transition-transform"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
