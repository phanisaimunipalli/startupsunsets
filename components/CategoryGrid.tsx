import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="library">
      <div className="mb-12 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">The Library</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Browse by Industry</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border border-slate-100 bg-white"
          >
            {/* Hover Accent Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42] to-[#4B3756] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 group-hover:text-[#FF8C42] transition-colors mb-2">{category.name}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[90%]">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold group-hover:bg-white group-hover:shadow-sm transition-all">
                  {category.focus}
                </span>
                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#FF8C42] flex items-center justify-center transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 group-hover:shadow-lg group-hover:shadow-orange-200">
                  <ArrowRight className="text-slate-400 group-hover:text-white w-5 h-5 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
