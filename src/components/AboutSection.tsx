import React from 'react';
import { 
  Building2, 
  CheckCircle, 
  ShieldCheck, 
  Headphones, 
  Layers, 
  DollarSign, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/medicalData';

interface AboutSectionProps {
  onQuoteClick: () => void;
  onExploreProducts: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onQuoteClick, onExploreProducts }) => {
  const pillars = [
    {
      title: 'Professional Service',
      desc: 'Seamless account management, tailored quotation schedules, and expedited fulfillment for dental and medical practices.',
      icon: Building2,
      color: 'text-blue-400',
    },
    {
      title: 'Quality-Focused Products',
      desc: 'Strictly audited manufacturing with complete Health Canada MDEL registrations, ISO 13485 compliance, and lot traceability.',
      icon: ShieldCheck,
      color: 'text-cyan-400',
    },
    {
      title: 'Affordable Pricing',
      desc: 'Direct B2B supply lines reduce procurement overhead, passing wholesale case and pallet volume savings directly to clinics.',
      icon: DollarSign,
      color: 'text-emerald-400',
    },
    {
      title: 'Customer-First Support',
      desc: 'Dedicated Canadian client desk providing continuous order status updates, Net 30 invoicing assistance, and sample evaluations.',
      icon: Headphones,
      color: 'text-purple-400',
    },
  ];

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#090D16] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Medical Photography & Warehouse Stats */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80"
                  alt="Kasper Medical Supplies professional clinical healthcare warehouse and distribution"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-90" />

                {/* Overlay Quote Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0c1322]/95 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Canadian Supply Chain Reliability
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Fulfilling emergency orders and routine monthly clinic restocks without backorders or delays.
                  </p>
                </div>
              </div>

              {/* Floating Canadian Hubs Badge */}
              <div className="hidden sm:block absolute -top-5 -right-5 bg-[#0f172a] border border-slate-700 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Toronto • Calgary • Vancouver</div>
                    <div className="text-[11px] text-slate-400">3 Regional Fulfillment Centers</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content & 4 Pillars */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
              <span>ABOUT KASPER MEDICAL SUPPLIES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-5">
              Empowering Canadian Healthcare with Dependable Supply Solutions
            </h2>

            {/* Core user requested exact copy */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-4">
              “Kasper Medical Supplies provides reliable dental and medical products designed to help healthcare professionals access essential supplies at competitive prices.”
            </p>

            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              From high-filtration N95 respirators and powder-free nitrile examination gloves to sterilization pouches and patient bibs, our mission is to eliminate supply friction so dental surgeons, physicians, and care teams can focus entirely on patient wellbeing.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`p-1.5 rounded-lg bg-slate-800 ${pillar.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Request B2B Clinic Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <span>Browse Full Catalog</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
