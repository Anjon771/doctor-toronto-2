import React from 'react';
import { ShieldCheck, Tag, Truck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      id: 'highlight-quality',
      title: 'Quality Products',
      subtitle: 'Certified Clinical Standards',
      description: 'Manufactured under rigorous ISO 13485 quality systems with full Health Canada MDEL and ASTM Level certifications.',
      icon: ShieldCheck,
      badge: 'Hospital & Dental Grade',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      features: ['ASTM F2100 & AAMI Compliant', 'Rigorous Batch Lot Testing', 'Sterility Guaranteed'],
    },
    {
      id: 'highlight-pricing',
      title: 'Competitive Pricing',
      subtitle: 'Direct Distributor Rates',
      description: 'Direct manufacturer partnerships enable us to deliver significant savings for private clinics, dental practices, and hospital networks.',
      icon: Tag,
      badge: 'Wholesale & Bulk Tiers',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      features: ['Tiered Case & Pallet Rebates', 'Zero Middleman Markups', 'Transparent Sample Pricing'],
    },
    {
      id: 'highlight-shipping',
      title: 'Fast Shipping',
      subtitle: 'Same-Day Dispatch in Canada',
      description: 'Strategically located fulfillment hubs across Ontario, Alberta, and British Columbia ensure swift, dependable nationwide delivery.',
      icon: Truck,
      badge: 'Nationwide Network',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      features: ['1–2 Day Transit to Major Hubs', 'Free Delivery on Orders $250+', 'Real-Time Order Tracking'],
    },
    {
      id: 'highlight-service',
      title: 'Trusted Service',
      subtitle: 'Dedicated Client Care',
      description: 'Every clinic is paired with a responsive account representative providing priority quote turnarounds and recurring restock coordination.',
      icon: HeartHandshake,
      badge: 'Canadian Support Desk',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      features: ['< 1-Hour Quote Responses', 'Net 30 Invoicing Terms', 'Sample Boxes Upon Request'],
    },
  ];

  return (
    <section id="trust-highlights-section" className="py-14 sm:py-20 bg-[#070B13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <span>THE KASPER ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Engineered for Canadian Healthcare Excellence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We simplify medical and dental procurement with uncompromising quality benchmarks, transparent B2B pricing, and prompt Canadian distribution.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.iconBg} ${item.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400/90 mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Feature Bullet Points */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
