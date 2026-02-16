import React from 'react';
import { Startup } from '../types';
import { ArrowRight, BrainCircuit, AlertCircle } from 'lucide-react';

interface StartupCardProps {
  startup: Startup;
  index: number;
  onSelect: (startup: Startup) => void;
}

export const StartupCard: React.FC<StartupCardProps> = ({ startup, index, onSelect }) => {
  return (
    <div 
        onClick={() => onSelect(startup)}
        className="group relative w-full h-full min-h-[480px] bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Subtle Top Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8C42] to-[#4B3756] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-multiply" />
      
      {/* Card Header */}
      <div className="relative p-8 pb-4">
         <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono tracking-widest uppercase">
               {startup.industry}
            </span>
            <span className="text-slate-400 font-mono text-xs font-medium">{startup.founded} — {startup.sunset}</span>
         </div>
         
         <h3 className="text-3xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#FF8C42] transition-colors">
            {startup.name}
         </h3>
         
         <div className="flex items-center gap-2 text-sm text-slate-500">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
             <span>Founded by <span className="font-semibold text-slate-700">{startup.founders}</span></span>
         </div>
      </div>

      {/* Main Analysis Section */}
      <div className="relative px-8 py-4 flex-grow flex flex-col gap-6">
          
          {/* Failure Badge */}
          <div className="self-start">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle size={12} />
                  {startup.lessonLearned}
              </div>
          </div>

          <p className="text-slate-600 text-base leading-relaxed line-clamp-3 font-medium">
              {startup.description}
          </p>

          {/* Analogy Block */}
          <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                  <BrainCircuit size={12} /> Analogy
              </div>
              <p className="text-slate-800 text-sm italic font-medium">
                  "{startup.analogy}"
              </p>
          </div>
      </div>

      {/* Footer / Action */}
      <div className="relative p-8 pt-4">
          <div className="h-px w-full bg-slate-100 mb-6 group-hover:bg-slate-200 transition-colors" />
          <div className="flex items-center justify-between group/btn">
              <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Loss</span>
                  <span className="text-slate-900 font-mono text-lg font-bold">{startup.raised}</span>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#FF8C42] group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
          </div>
      </div>
    </div>
  );
};