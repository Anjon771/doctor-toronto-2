import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Truck, 
  Award, 
  Building2, 
  Sparkles,
  PackageCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/medicalData';

interface HeroProps {
  onShopClick: () => void;
  onQuoteClick: () => void;
  onPromoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onQuoteClick, onPromoClick }) => {
  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-18 lg:pb-32 bg-[#090D16]"
    >
      {/* Ambient background glow & soft grid overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid lines background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>🇨🇦 Serving Dental & Medical Clinics Across Canada</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-heading mb-6">
              Professional <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">Medical & Dental</span> Supplies You Can Trust
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
              Quality products, dependable service, and affordable solutions for healthcare professionals across Canada.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-shop-products-btn"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Shop Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-request-quote-btn"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-base border border-slate-700/80 hover:border-cyan-500/50 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Trust Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Health Canada</span>
                  <span className="text-[11px] text-slate-400">MDEL Registered</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Same-Day Dispatch</span>
                  <span className="text-[11px] text-slate-400">Nationwide Canada</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Building2 className="w-5 h-5 text-cyan-300 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">1,400+ Clinics</span>
                  <span className="text-[11px] text-slate-400">Trusted Partners</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Real Medical Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Glow Border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800 opacity-30 blur-lg" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=85"
                    alt="High quality certified medical and dental supplies by Kasper Medical Supplies"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-black/20" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 bg-[#0B1120]/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-semibold text-slate-200">Continuous Stock Available</span>
                  </div>

                  {/* Bottom Image Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0d1629]/95 backdrop-blur-md border border-slate-700/90 rounded-xl p-3.5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                          <PackageCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Direct Distributor Pricing</div>
                          <div className="text-[11px] text-slate-400">Pallet & Case Wholesale Tier Discounts</div>
                        </div>
                      </div>
                      <button
                        onClick={onPromoClick}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1.5 rounded-lg border border-cyan-500/30"
                      >
                        <span>Offers</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lower Metric Bar */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-[#0B1120] p-4 text-center">
                  <div>
                    <div className="text-base font-extrabold text-cyan-400 font-heading">99.8%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">On-Time Transit</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white font-heading">48,000+</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Boxes Shipped</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-400 font-heading">ISO 13485</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Verified Quality</div>
                  </div>
                </div>
              </div>

              {/* Floating Quality Guarantee Seal */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#0e172a] border border-cyan-500/40 rounded-xl p-3 shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Hospital & Dental Grade</div>
                  <div className="text-[10px] text-slate-400">100% Quality Inspected</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
