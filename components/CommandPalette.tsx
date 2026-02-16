import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) onClose(); // Actually opens it because the parent toggles
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="min-h-screen px-4 text-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        {/* Modal Panel */}
        <div className="inline-block w-full max-w-2xl mt-24 text-left align-middle transition-all transform bg-white rounded-2xl shadow-2xl ring-1 ring-black/5">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute top-4 left-4 h-6 w-6 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              className="w-full h-14 pl-14 pr-12 bg-transparent border-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-lg leading-6"
              placeholder="e.g. 'Instant Grocery Delivery', 'VR Headsets', 'Flying Taxis'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
                <kbd className="hidden sm:inline-block border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-400">ESC</kbd>
            </div>
          </form>

          {/* Quick Suggestions (Static for UI feel) */}
          <div className="border-t border-slate-100 py-3 px-2">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Trending Sectors
              </div>
              <ul>
                  {['BNPL (Buy Now Pay Later)', 'Cloud Kitchens', 'NFT Marketplaces', 'Autonomous Trucking', '15-minute Delivery'].map((item) => (
                      <li 
                        key={item} 
                        className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md cursor-pointer flex items-center"
                        onClick={() => {
                            onSearch(item);
                            onClose();
                        }}
                      >
                          <Search className="w-4 h-4 mr-3 text-slate-300" />
                          {item}
                      </li>
                  ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
