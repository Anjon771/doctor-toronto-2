import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Package, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS, CONTENT_ARTICLES } from '../data/medicalData';
import { Product, ContentArticle } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: ContentArticle) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedProducts = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const matchedArticles = query.trim()
    ? CONTENT_ARTICLES.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.tag.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : CONTENT_ARTICLES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#090e1a]">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search medical masks, nitrile gloves, dental bibs, SKUs, or clinical guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
          >
            <kbd className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-400 font-mono">ESC</kbd>
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-5">
          {/* Products Group */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5 px-2">
              <Package className="w-3.5 h-3.5" />
              <span>Medical & Dental Products ({matchedProducts.length})</span>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="text-xs text-slate-400 p-3">No products match "{query}"</div>
            ) : (
              <div className="space-y-1.5">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="text-cyan-400 font-mono">{prod.sku}</span>
                          <span>•</span>
                          <span>{prod.packaging}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Articles Group */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5 px-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Clinical Updates & Guides ({matchedArticles.length})</span>
            </div>

            {matchedArticles.length === 0 ? (
              <div className="text-xs text-slate-400 p-3">No articles match "{query}"</div>
            ) : (
              <div className="space-y-1.5">
                {matchedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {art.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-cyan-400">{art.tag}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#090e1a] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search products, categories, or clinical guides</span>
          <span>🇨🇦 Direct Canadian Supply</span>
        </div>
      </div>
    </div>
  );
};
