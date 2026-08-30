import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  FileText, 
  Phone, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { QuoteItem } from '../types';

interface NavbarProps {
  quoteItems: QuoteItem[];
  onOpenQuoteDrawer: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteItems,
  onOpenQuoteDrawer,
  onOpenSearch,
  onSelectCategory,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setProductsDropdown(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    onSelectCategory(categorySlug);
    scrollToSection('products-section');
  };

  return (
    <>
      {/* Top emergency announcement & Canadian compliance bar */}
      <div id="top-announcement-bar" className="bg-[#070B12] border-b border-slate-800/80 text-xs py-2 px-4 text-slate-300 font-medium z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-blue-900/60 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
              🇨🇦 HEALTH CANADA COMPLIANT
            </span>
            <span className="hidden sm:inline text-slate-400">
              Direct B2B Medical & Dental Supply Distribution across all Canadian Provinces.
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <a 
              href="tel:18005277371" 
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>1-800-527-7371</span>
            </a>
            <span className="text-slate-700 hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-400">
              Mon–Fri 8:00 AM – 6:00 PM EST
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/90 shadow-2xl py-3' 
            : 'bg-[#090D16]/70 backdrop-blur-sm border-b border-slate-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero-section');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            id="navbar-brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center">
                <div className="relative">
                  {/* Medical Cross Cadence */}
                  <div className="w-4 h-1.5 bg-cyan-400 rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-cyan-400 rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  KASPER
                </span>
                <span className="font-heading font-bold text-xs sm:text-sm px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                  Medical
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide text-slate-400 group-hover:text-slate-300 transition-colors">
                SUPPLIES • CANADA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('about-section')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              About
            </button>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdown(true)}
              onMouseLeave={() => setProductsDropdown(false)}
            >
              <button
                onClick={() => scrollToSection('products-section')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdown ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                  <div className="bg-[#0d1527] border border-slate-700/80 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                      Quick Categories
                    </div>
                    <button
                      onClick={() => handleCategoryClick('ppe')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-blue-600/20 hover:text-cyan-300 text-slate-200 transition-colors flex items-center justify-between"
                    >
                      <span>PPE Products</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">24 items</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick('masks')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-blue-600/20 hover:text-cyan-300 text-slate-200 transition-colors flex items-center justify-between"
                    >
                      <span>Medical Masks & N95</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">18 items</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick('gloves')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-blue-600/20 hover:text-cyan-300 text-slate-200 transition-colors flex items-center justify-between"
                    >
                      <span>Examination Gloves</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">16 items</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick('dental')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-blue-600/20 hover:text-cyan-300 text-slate-200 transition-colors flex items-center justify-between"
                    >
                      <span>Dental Supplies & Bibs</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">32 items</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick('gowns')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-blue-600/20 hover:text-cyan-300 text-slate-200 transition-colors flex items-center justify-between"
                    >
                      <span>Medical Gowns & Apparel</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">12 items</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick('all')}
                      className="w-full text-left mt-1 pt-1.5 border-t border-slate-800/80 px-3 py-1.5 text-xs text-cyan-400 font-semibold hover:text-cyan-300 flex items-center justify-between"
                    >
                      <span>View Full Catalog</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleCategoryClick('ppe')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              PPE
            </button>

            <button
              onClick={() => handleCategoryClick('dental')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Dental Supplies
            </button>

            <button
              onClick={() => handleCategoryClick('masks')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Medical Supplies
            </button>

            <button
              onClick={() => scrollToSection('promotions-section')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 text-cyan-300 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Promotions</span>
            </button>

            <button
              onClick={() => scrollToSection('updates-section')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Updates
            </button>

            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              id="navbar-search-btn"
              onClick={onOpenSearch}
              aria-label="Search medical products"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors flex items-center gap-2 text-xs"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden xl:inline text-slate-400 text-xs">Search...</span>
              <kbd className="hidden xl:inline-block bg-slate-800 text-[10px] text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">⌘K</kbd>
            </button>

            {/* Quote Basket Drawer Toggle */}
            <button
              id="navbar-quote-drawer-btn"
              onClick={onOpenQuoteDrawer}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
              title="View Quote Request List"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              {totalQuoteCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#090D16]">
                  {totalQuoteCount}
                </span>
              )}
            </button>

            {/* Main Request a Quote CTA */}
            <button
              id="navbar-quote-cta-btn"
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all active:scale-95"
            >
              <span>Request a Quote</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800/90 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
              <button
                onClick={() => scrollToSection('hero-section')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                About Us
              </button>
              <button
                onClick={() => handleCategoryClick('ppe')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                PPE Products
              </button>
              <button
                onClick={() => handleCategoryClick('dental')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                Dental Supplies
              </button>
              <button
                onClick={() => handleCategoryClick('masks')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                Medical Masks
              </button>
              <button
                onClick={() => handleCategoryClick('gloves')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                Exam Gloves
              </button>
              <button
                onClick={() => scrollToSection('promotions-section')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-cyan-300 hover:bg-blue-600/20"
              >
                Special Offers
              </button>
              <button
                onClick={() => scrollToSection('updates-section')}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-900/80 text-sm font-medium text-slate-200 hover:bg-blue-600/20"
              >
                Latest Updates
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg text-center shadow-lg shadow-blue-600/30"
              >
                Request a Quote
              </button>

              <button
                onClick={() => scrollToSection('contact-section')}
                className="w-full py-2.5 bg-slate-900 border border-slate-700 text-slate-300 font-medium rounded-lg text-center text-sm"
              >
                Direct Clinic Contact & Warehouses
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
