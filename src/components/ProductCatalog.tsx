import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Check, 
  ExternalLink, 
  Sparkles,
  Info,
  ChevronRight,
  Package
} from 'lucide-react';
import { PRODUCTS } from '../data/medicalData';
import { Product, ProductCategory } from '../types';

interface ProductCatalogProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onViewProductDetails: (product: Product) => void;
  onAddToQuote: (product: Product, quantity?: number) => void;
  onRequestQuoteDirect: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewProductDetails,
  onAddToQuote,
  onRequestQuoteDirect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filterTabs: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'masks', label: 'Medical Masks' },
    { id: 'gloves', label: 'Nitrile Gloves' },
    { id: 'gowns', label: 'Isolation Gowns' },
    { id: 'dental', label: 'Dental Supplies' },
    { id: 'shields', label: 'Face Shields' },
    { id: 'sanitizers', label: 'Hand Sanitizers' },
    { id: 'infection-control', label: 'Infection Control' },
    { id: 'accessories', label: 'Diagnostic Tools' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const categoryMatch = 
        selectedCategory === 'all' || 
        product.category === selectedCategory ||
        (selectedCategory === 'ppe' && ['masks', 'gloves', 'gowns', 'shields'].includes(product.category));

      // Search match
      const searchMatch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.certifications.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(product, 1);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-[#090D16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
              <span>FEATURED PRODUCT CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Hospital & Dental Grade Supplies
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Equip your facility with certified clinical protection. Direct wholesale distributor case and pallet volume pricing.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="catalog-search-input"
                placeholder="Search products, SKUs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort selector */}
            <select
              id="catalog-sort-select"
              value={sortBy}
              aria-label="Sort products by"
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300">No products match your filter</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Try searching with another keyword or click below to reset all category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedItemIds[product.id];
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onViewProductDetails(product)}
                  className="group relative rounded-2xl bg-[#0b1120] border border-slate-800/90 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-black/20" />

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3 bg-[#090e1a]/90 backdrop-blur-sm border border-emerald-500/30 px-2 py-0.5 rounded-md text-[10px] font-semibold text-emerald-400 flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{product.status}</span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-medium text-slate-300 border border-white/10">
                      {product.categoryName}
                    </div>

                    {/* Quick Add to Quote Basket Hover Trigger */}
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      title="Quick Add to Quote Basket"
                      className={`absolute bottom-3 right-3 p-2 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white border-emerald-400 scale-105'
                          : 'bg-[#090D16]/90 text-cyan-400 border-slate-700 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Product Name */}
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading line-clamp-2 leading-snug mb-1.5">
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {product.shortDescription}
                      </p>

                      {/* Packaging Unit & Minimum */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/80 mb-3">
                        <Package className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{product.packaging}</span>
                      </div>

                      {/* Key Certifications Chips */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.certifications.slice(0, 2).map((cert, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/60 text-cyan-300 border border-blue-500/20"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sample Price & Action Buttons */}
                    <div className="pt-3 border-t border-slate-800/80">
                      {product.samplePrice && (
                        <div className="flex items-baseline justify-between mb-3 text-xs">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Wholesale Sample:</span>
                          <span className="font-bold text-cyan-300 font-mono text-xs">{product.samplePrice.split('(')[0]}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewProductDetails(product);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRequestQuoteDirect(product);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Request Quote</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
