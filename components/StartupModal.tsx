import React, { useEffect } from "react";
import { Startup } from "../types";
import {
  X,
  TrendingDown,
  Lightbulb,
  RefreshCcw,
  Target,
  BrainCircuit,
  ExternalLink,
  Users,
} from "lucide-react";

interface StartupModalProps {
  startup: Startup | null;
  onClose: () => void;
}

export const StartupModal: React.FC<StartupModalProps> = ({
  startup,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!startup) return null;

  // Helper to extract hostname safely
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (e) {
      return "Source Link";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-0 sm:px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header - Golden Hour Gradient */}
        <div className="relative h-auto min-h-[250px] sm:h-80 bg-gradient-to-br from-[#FF8C42] via-[#E86A58] to-[#4B3756] flex flex-col justify-end p-6 sm:p-12 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors backdrop-blur-sm z-20"
          >
            <X size={24} />
          </button>

          <div className="flex items-end justify-between relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 text-white/90 text-xs sm:text-sm font-bold tracking-wider uppercase flex-wrap">
                <span>{startup.industry}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 hidden sm:block" />
                <span className="block sm:inline">Raised {startup.raised}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-2 sm:mb-2">
                {startup.name}
              </h2>
              <div className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-lg mb-4 sm:mb-6">
                <Users size={16} className="sm:w-5 sm:h-5" />
                <span>Founded by {startup.founders}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/20">
                <TrendingDown size={14} className="sm:w-4 sm:h-4" />
                FAILED DUE TO: {startup.lessonLearned.toUpperCase()}
              </div>
            </div>

            {/* Large Letter Logo (Hidden on small screens) */}
            <div className="hidden lg:flex w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-8xl font-bold text-white shadow-2xl">
              {startup.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-12 space-y-8 sm:space-y-12 bg-slate-50 flex-grow">
          {/* Section 1: The Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="md:col-span-2 order-2 md:order-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Target className="text-slate-400" size={24} /> The Vision
              </h3>
              <p className="text-slate-700 leading-relaxed sm:leading-loose text-base sm:text-lg font-medium">
                {startup.description}
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm h-fit order-1 md:order-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 sm:mb-5">
                Post-Mortem Stats
              </h4>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    Founded
                  </span>
                  <span className="font-bold text-slate-900">
                    {startup.founded}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    Capital Burned
                  </span>
                  <span className="font-bold text-slate-900">
                    {startup.raised}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-sm text-slate-500 font-medium">
                    Primary Flaw
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded max-w-[50%] text-right truncate">
                    {startup.lessonLearned}
                  </span>
                </div>

                {/* Updated Source Link */}
                {startup.sourceUrl && (
                  <div className="pt-4 mt-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Verified Source
                    </h5>
                    <a
                      href={startup.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all border border-slate-200 hover:border-blue-200"
                    >
                      <span className="truncate max-w-[180px]">
                        {getHostname(startup.sourceUrl)}
                      </span>
                      <ExternalLink
                        size={14}
                        className="opacity-50 group-hover:opacity-100"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: The Mental Model (Key Feature) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Analogy Card */}
            <div className="bg-white p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
              <div className="absolute top-0 right-0 p-40 bg-orange-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xs sm:text-sm font-bold text-[#FF8C42] uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                <Lightbulb size={18} /> The Analogy
              </h3>
              <p className="text-xl sm:text-2xl font-semibold text-slate-800 italic relative z-10 leading-relaxed">
                "{startup.analogy}"
              </p>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-400 font-medium relative z-10">
                How to explain this failure to a 5-year old.
              </p>
            </div>

            {/* Mental Model Card */}
            <div className="bg-slate-900 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-40 bg-indigo-900 rounded-full blur-3xl -mr-20 -mt-20 opacity-40" />
              <h3 className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                <BrainCircuit size={18} /> The Mental Model
              </h3>
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 relative z-10">
                {startup.mentalModel}
              </h4>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed relative z-10">
                The cognitive bias or business principle that explains why smart
                people made this mistake.
              </p>
            </div>
          </div>

          {/* Section 3: The Alternate History */}
          <div className="bg-gradient-to-r from-slate-100 to-white p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
              <RefreshCcw className="text-emerald-600" size={24} /> The Pivot
              Strategy
            </h3>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 sm:mb-3">
                  What they should have done
                </h4>
                <p className="text-slate-900 text-lg sm:text-xl font-semibold leading-relaxed">
                  {startup.pivotStrategy}
                </p>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 sm:mb-3">
                  The "What If" Scenario
                </h4>
                <p className="text-slate-600 text-base sm:text-lg italic font-medium leading-relaxed">
                  "{startup.whatIf}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
