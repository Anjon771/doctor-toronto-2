import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp, 
  Check, 
  Send, 
  ExternalLink,
  Lock,
  FileText,
  FileCheck
} from 'lucide-react';
import { COMPANY_DETAILS, CATEGORIES } from '../data/medicalData';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'compliance') => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPolicy,
  onOpenQuoteModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#05080E] text-slate-400 text-xs border-t border-slate-800/80 relative">
      
      {/* Top Newsletter & Restock Alerts Bar */}
      <div className="border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 bg-[#070C15]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>CANADIAN CLINIC RESTOCK BULLETIN</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
              Stay Updated on Bulk Allocation & Monthly Volume Rebates
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Receive monthly supply trend reports, Health Canada regulatory updates, and exclusive clinic promo codes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
            {newsletterSuccess ? (
              <div className="px-4 py-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 font-medium flex items-center gap-2 text-xs">
                <Check className="w-4 h-4" />
                <span>Thank you! Your clinic has been subscribed to supply bulletins.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="clinic.procurement@domain.ca"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-72 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 text-xs"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Directory Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1 & 2: Brand Info & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center">
                  <div className="relative">
                    <div className="w-3.5 h-1 bg-cyan-400 rounded-sm"></div>
                    <div className="w-1 h-3.5 bg-cyan-400 rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                  KASPER MEDICAL SUPPLIES
                </span>
                <span className="block text-[10px] text-cyan-400 font-semibold tracking-wider">
                  CANADA • EST. B2B DISTRIBUTION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Reliable Medical & Dental Supplies at Affordable Prices. Direct wholesale distributor of certified PPE, surgical masks, nitrile gloves, and dental instruments for healthcare professionals across Canada.
            </p>

            {/* Compliance Badge */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Health Canada MDEL Certified Partner</span>
              </div>
              <p className="text-[11px] text-slate-400">
                100% genuine medical-grade devices, DIN disinfectants, and lot traceability.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                fb
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="X / Twitter"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('hero-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Kasper
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Featured Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('promotions-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Promotions & Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-choose-us-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Clinic Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('updates-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Clinical Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Procurement FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ppe');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  PPE Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('masks');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Medical Masks & N95
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('gloves');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Nitrile Examination Gloves
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('gowns');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Medical Gowns & Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('dental');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Dental Supplies & Bibs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('shields');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Anti-Fog Face Shields
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('infection-control');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Infection Control Wipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('accessories');
                    scrollToSection('products-section');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Medical Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Contact & Orders
            </h4>
            <div className="space-y-3 text-xs">
              <a href="tel:18005277371" className="flex items-start gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">1-800-527-7371</div>
                  <div className="text-[11px] text-slate-400">Toll-Free Canada</div>
                </div>
              </a>

              <a href={`mailto:${COMPANY_DETAILS.salesEmail}`} className="flex items-start gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">{COMPANY_DETAILS.salesEmail}</div>
                  <div className="text-[11px] text-slate-400">Quotes & Orders</div>
                </div>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Toronto • Calgary • Vancouver</div>
                  <div className="text-[11px] text-slate-400">3 Warehouses in Canada</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-2.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 font-semibold border border-blue-500/30 transition-all text-center"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span>🇨🇦 © {new Date().getFullYear()} Kasper Medical Supplies Canada Inc. All rights reserved.</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-cyan-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('compliance')}
              className="hover:text-cyan-400 transition-colors"
            >
              Health Canada Compliance
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
