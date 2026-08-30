import React, { useState } from 'react';
import { Tag, Sparkles, ArrowRight, Copy, Check, ShieldCheck, Truck } from 'lucide-react';
import { PROMOTIONS } from '../data/medicalData';

interface SpecialOffersProps {
  onClaimPromo: (promoCode: string) => void;
  onRequestBulkQuote: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onClaimPromo, onRequestBulkQuote }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promotions-section" className="py-16 sm:py-24 bg-[#0A0A0E] relative border-t border-[#1C1F2E]">
      
      {/* Background soft ambient light */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECIAL CLINIC VOLUME OFFERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Save More on Essential Medical Consumables
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore our latest offers and bulk-order opportunities. Maximize practice savings with volume tiered rebates and scheduled replenishment programs across Canada.
          </p>
        </div>

        {/* Promotion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl bg-gradient-to-br from-[#0E121E] via-[#111726] to-[#0E121E] border border-slate-700/80 hover:border-cyan-500/50 p-6 sm:p-8 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle background image watermark */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
                <img
                  src={promo.image}
                  alt="promotion background"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 text-cyan-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    {promo.discountBadge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Valid: {promo.validUntil}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
                  {promo.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {promo.description}
                </p>

                {/* Terms chip */}
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#090D16]/80 p-3 rounded-xl border border-slate-800 mb-6">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{promo.terms}</span>
                </div>
              </div>

              {/* Action Promo Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                {/* Promo Code Copy Box */}
                <div className="flex items-center justify-between bg-[#0A0E18] border border-slate-700/80 px-3.5 py-2 rounded-xl">
                  <span className="font-mono text-xs font-bold text-cyan-300 mr-3">
                    {promo.code}
                  </span>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy promo code"
                  >
                    {copiedCode === promo.code ? (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => onClaimPromo(promo.code)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Apply to Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Volume Tiers Highlight Banner */}
        <div className="rounded-2xl bg-[#0E1322] border border-cyan-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              CUSTOM PALLET & WHOLESALE CONTRACTS
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white font-heading mt-1">
              Need Multi-Clinic Recurring Pallet Shipments?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Lock in guaranteed pricing schedules, dedicated account management, and automated monthly dispatch across your practice network.
            </p>
          </div>

          <button
            onClick={onRequestBulkQuote}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            Request Institutional Bulk Terms
          </button>
        </div>

      </div>
    </section>
  );
};
