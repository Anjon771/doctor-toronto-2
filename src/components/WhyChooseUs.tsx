import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Boxes, 
  Headphones, 
  MapPin, 
  CheckCircle2, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      id: 'why-partner',
      title: 'Trusted Medical Supply Partner',
      subtitle: 'Over 1,400 Practices Served',
      description: 'Serving independent dental practices, regional medical networks, and institutional laboratories with reliable contract integrity.',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      id: 'why-quality',
      title: 'Quality Products',
      subtitle: '100% Health Canada MDEL',
      description: 'Zero counterfeit risk. Every batch adheres to ASTM F2100, AAMI Level, and ISO 13485 clinical manufacturing standards.',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      id: 'why-pricing',
      title: 'Affordable Pricing',
      subtitle: 'Direct Distributor Access',
      description: 'We eliminate multi-tiered intermediary markups, providing transparent, aggressive wholesale case and pallet volume savings.',
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'why-bulk',
      title: 'Bulk Ordering & Logistics',
      subtitle: 'Pallet & Multi-Location Delivery',
      description: 'Flexible scheduled fulfillment, split-shipment options across branches, and tailored case quantity allocations.',
      icon: Boxes,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'why-support',
      title: 'Reliable Support',
      subtitle: 'Canadian Account Representatives',
      description: 'Rapid quote turnaround in under 60 minutes during business hours, dedicated account managers, and hassle-free returns.',
      icon: Headphones,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      id: 'why-canadian',
      title: 'Canadian Service',
      subtitle: 'Local Warehouses Nationwide',
      description: 'Stocked in Toronto, Calgary, and Vancouver hubs to bypass international border delays and currency exchange volatility.',
      icon: MapPin,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-16 sm:py-24 bg-[#090D16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <span>WHY HEALTHCARE PROFESSIONALS CHOOSE US</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Built Around the Needs of Modern Canadian Clinics
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Dependable supplies, predictable pricing, and responsive B2B service tailored for dental and medical practices.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                id={b.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${b.bg} ${b.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded">
                      {b.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-2">
                    {b.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
