import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Hand, UserCheck, Droplet, Smile, Glasses, Flame, Activity, PackageCheck } from 'lucide-react';
import { CATEGORIES } from '../data/medicalData';
import { CategoryInfo, ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Sparkles': return Sparkles;
      case 'Hand': return Hand;
      case 'UserCheck': return UserCheck;
      case 'Droplet': return Droplet;
      case 'Smile': return Smile;
      case 'Glasses': return Glasses;
      case 'Flame': return Flame;
      case 'Activity': return Activity;
      default: return PackageCheck;
    }
  };

  const handleCategoryClick = (category: ProductCategory) => {
    onSelectCategory(category);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-[#070B13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3">
              <span>PRODUCT CATEGORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Essential Medical & Dental Catalog
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Browse certified clinical consumables, PPE, dental instruments, and infection control solutions stocked in Canadian distribution hubs.
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('all')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 10 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.iconName);
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                {/* Image Top Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={cat.image}
                    alt={`${cat.name} supplies - Kasper Medical Supplies`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-[#090D16]/90 border border-slate-700 text-cyan-400 shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Item count tag */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-semibold text-slate-300 border border-white/10 backdrop-blur-sm">
                    {cat.itemCount} Products
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {cat.shortDesc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full mt-auto py-2 px-3 rounded-lg bg-slate-800/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700/80 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
