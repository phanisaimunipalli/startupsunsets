import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onHome: () => void;
  showSearchBar: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onHome, showSearchBar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      {/* Blurred Glass Container - Pointer events auto to allow clicking contents */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="relative flex items-center justify-between h-20 my-2">
          
          {/* Background Layer */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl supports-[backdrop-filter]:bg-white/60 -z-10" />

          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center px-6 cursor-pointer group" onClick={onHome}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#4B3756] flex items-center justify-center mr-3 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-tighter">SS</span>
            </div>
            <span className="font-bold text-slate-800 tracking-tight text-xl">
              Startup Sunsets
            </span>
          </div>

          {/* Centric Search Bar - Conditional Visibility */}
          {showSearchBar && (
            <div className="hidden md:flex flex-1 justify-center px-8 animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={onOpenSearch}
                className="group flex items-center w-full max-w-lg bg-slate-100/80 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-3 px-5 transition-all duration-200 ease-out shadow-inner hover:shadow-lg"
              >
                <Search className="w-5 h-5 text-slate-400 group-hover:text-[#FF8C42] mr-3 transition-colors" />
                <div className="flex flex-1 text-left">
                  <span className="text-sm text-slate-500 font-medium group-hover:text-slate-700">Search companies, industries, or founders...</span>
                </div>
                <div className="flex items-center space-x-1 ml-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  <kbd className="hidden sm:inline-block border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white">⌘K</kbd>
                </div>
              </button>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center px-6">
             <button onClick={onOpenSearch} className={`md:hidden p-3 text-slate-600 bg-slate-100 rounded-full mr-4 ${!showSearchBar ? 'hidden' : ''}`}>
               <Search className="w-5 h-5" />
             </button>
             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-[#FF8C42] transition-all">
                <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
