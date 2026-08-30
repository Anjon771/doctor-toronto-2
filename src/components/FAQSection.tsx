import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, DollarSign, Headphones } from 'lucide-react';
import { FAQS } from '../data/medicalData';
import { FAQItem } from '../types';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });

  const categories = ['All', 'Certifications & Compliance', 'Orders & Shipping', 'Pricing & Bulk', 'Account & Support'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#090D16] relative border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLINICAL PROCUREMENT FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Answers to common questions regarding regulatory compliance, provincial shipping transit, payment terms, and bulk orders.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                id={`faq-${faq.id}`}
                className="rounded-2xl bg-[#0b1120] border border-slate-800/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-heading">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-cyan-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
