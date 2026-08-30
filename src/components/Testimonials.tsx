import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/medicalData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#070B13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <span>CLIENT EXPERIENCES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Trusted by Canadian Healthcare Providers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Hear how dental practices and medical facilities optimize their clinical supply chain with Kasper Medical Supplies.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-${t.id}`}
              className="relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Supplies used tag */}
                <div className="mb-4 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5">
                  <span className="text-cyan-400 font-semibold">Procured:</span>
                  <span className="truncate">{t.suppliesUsed}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-cyan-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white font-heading">{t.author}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="Verified Customer" />
                    </div>
                    <div className="text-xs text-slate-400">{t.title}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{t.clinic} • {t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="text-center mt-8">
          <span className="text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
            *Sample verified partner testimonials for demonstration purposes.
          </span>
        </div>

      </div>
    </section>
  );
};
