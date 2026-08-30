import React, { useRef } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Hand, 
  UserCheck, 
  Droplet, 
  Smile, 
  Glasses, 
  Flame, 
  Activity, 
  PackageCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/medicalData';
import { CategoryInfo, ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
  activeCategory?: ProductCategory;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  onSelectCategory,
  activeCategory = 'all'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-[#0A0A0E] relative border-t border-[#1C1F2E]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-gradient-to-r from-blue-900/15 via-cyan-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* =========================================================================
            CIRCULAR STORY-STYLE CLINICAL HIGHLIGHTS TRAY
            Inspired by high-density digital navigation, reinterpreted for medical supplies
           ========================================================================= */}
        <div className="mb-14 pb-10 border-b border-slate-800/80">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-heading">
                Quick Category Navigator • <span className="text-cyan-400 font-normal">Direct Clinical Channels</span>
              </h3>
            </div>
            
            {/* Scroll buttons for desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left categories"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll right categories"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Circular Story Tray */}
          <div 
            ref={scrollRef}
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth px-1"
          >
            {/* "All Products" Circular Story Element */}
            <button
              id="story-cat-all"
              onClick={() => handleCategoryClick('all')}
              className="flex flex-col items-center group shrink-0 text-center cursor-pointer transition-all duration-300 focus:outline-none"
            >
              <div className={`relative p-1 rounded-full transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0A0A0E] shadow-lg shadow-cyan-500/30 scale-105'
                  : 'group-hover:scale-105'
              }`}>
                {/* Radiant Gradient Ring */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 group-hover:shadow-md group-hover:shadow-cyan-500/40">
                  <div className="w-full h-full rounded-full bg-[#0E1322] border-2 border-[#0A0A0E] flex flex-col items-center justify-center overflow-hidden relative">
                    <Layers className="w-6 h-6 text-cyan-300 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-extrabold text-white mt-1 uppercase tracking-tighter font-mono">ALL</span>
                  </div>
                </div>
                {/* Live Pill Indicator */}
                <span className="absolute bottom-0 right-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold border-2 border-[#0A0A0E] shadow-sm">
                  120+
                </span>
              </div>
              <span className="mt-2.5 text-xs font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                All Catalog
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Complete Stock</span>
            </button>

            {/* Dynamic Circular Category Story Items */}
            {CATEGORIES.map((cat) => {
              const Icon = getIcon(cat.iconName);
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`story-cat-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center group shrink-0 text-center cursor-pointer transition-all duration-300 focus:outline-none"
                >
                  <div className={`relative p-1 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0A0A0E] shadow-lg shadow-cyan-500/30 scale-105'
                      : 'group-hover:scale-105'
                  }`}>
                    {/* Glowing gradient rim */}
                    <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[2.5px] transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-cyan-400 via-blue-500 to-teal-300'
                        : 'bg-gradient-to-tr from-blue-600/70 via-slate-700 to-cyan-500/70 group-hover:from-blue-500 group-hover:to-cyan-400'
                    }`}>
                      <div className="w-full h-full rounded-full bg-slate-950 border-2 border-[#0A0A0E] overflow-hidden relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-950/20 group-hover:bg-transparent transition-colors">
                          <div className="p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-cyan-300">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Badge */}
                    <span className="absolute bottom-0 right-1 px-1.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 text-[9px] font-bold border-2 border-[#0A0A0E] shadow-sm">
                      {cat.itemCount}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="mt-2.5 text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors tracking-tight max-w-[90px] truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">In Stock</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Section Heading for Full Catalog Matrix */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3 shadow-inner">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>CATEGORY SPECIFICATION DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Essential Medical & Dental Departments
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
              Browse Health Canada MDEL registered consumables, surgical barrier wear, dental sterilization accessories, and infection control solutions stocked in Canadian distribution hubs.
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('all')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
          >
            <span>View Full 120+ SKU Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 10 Category Department Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.iconName);
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                className={`group relative rounded-2xl bg-[#0E121E] border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/40 ${
                  isSelected ? 'border-cyan-400 ring-1 ring-cyan-400/50' : 'border-slate-800/90 hover:border-cyan-500/50'
                }`}
              >
                {/* Image Top Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={cat.image}
                    alt={`${cat.name} supplies - Kasper Medical Supplies`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E121E] via-transparent to-black/30" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-[#090D16]/90 border border-slate-700 text-cyan-400 shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Item count tag */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-semibold text-cyan-300 border border-white/10 backdrop-blur-sm">
                    {cat.itemCount} SKUs
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-1.5 flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {cat.shortDesc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full mt-auto py-2 px-3 rounded-xl bg-[#141A29] hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700/80 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span>Inspect Category</span>
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

