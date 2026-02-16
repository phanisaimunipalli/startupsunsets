import React from 'react';
import { Loader2 } from 'lucide-react';
import { Startup } from '../types';
import { StartupCard } from './StartupCard';

interface NetflixRowProps {
  title: string;
  startups: Startup[];
  isLoading: boolean;
  onSelectStartup: (startup: Startup) => void;
}

export const NetflixRow: React.FC<NetflixRowProps> = ({ title, startups, isLoading, onSelectStartup }) => {

  if (isLoading) {
      return (
          <div className="w-full max-w-7xl mx-auto px-6 py-12">
              <div className="flex items-center gap-3 mb-12">
                <Loader2 className="w-5 h-5 text-[#FF8C42] animate-spin" />
                <h2 className="text-xl font-mono text-slate-400">ACCESSING ARCHIVES...</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="h-[400px] bg-slate-100 rounded-2xl animate-pulse relative overflow-hidden border border-slate-200">
                          {/* Scanline effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent -translate-y-full animate-[scan_2s_infinite]" />
                       </div>
                   ))}
              </div>
          </div>
      )
  }

  if (startups.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Title hidden as it's repetitive with the main header, but kept in code if needed later */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {startups.map((startup, index) => (
          <div key={startup.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
            <StartupCard startup={startup} index={index} onSelect={onSelectStartup} />
          </div>
        ))}
      </div>
    </div>
  );
};