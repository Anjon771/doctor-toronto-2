import React from 'react';
import { X, ShieldCheck, FileCheck, Lock, Building2 } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'compliance' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & Data Security',
      badge: 'PIPEDA & PHIPA COMPLIANT',
      icon: Lock,
      sections: [
        {
          heading: '1. Information Collection & Clinical Privacy',
          text: 'Kasper Medical & Dental Supplies Canada Inc. collects business and procurement details solely to process quotation requests, coordinate logistics, and facilitate Net 30 invoicing. We strictly adhere to Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA).',
        },
        {
          heading: '2. Zero Third-Party Sale',
          text: 'We never sell, rent, or trade healthcare provider data, order histories, or clinic contact rosters to third-party advertisers.',
        },
        {
          heading: '3. Data Security & Storage',
          text: 'All quote inquiries and transaction records are encrypted using 256-bit TLS encryption and stored securely within Canadian data centers.',
        },
      ],
    },
    terms: {
      title: 'Terms of Supply & B2B Commercial Conditions',
      badge: 'B2B COMMERCIAL CONTRACT',
      icon: FileCheck,
      sections: [
        {
          heading: '1. Wholesale B2B Procurement',
          text: 'Supplies provided by Kasper Medical Supplies are distributed directly to licensed dental clinics, medical facilities, hospitals, and authorized institutions across Canadian provinces.',
        },
        {
          heading: '2. Net 30 Terms & Credit Approval',
          text: 'Net 30 credit accounts are extended to verified Canadian healthcare practices upon initial credit review and business verification.',
        },
        {
          heading: '3. Inspection & 30-Day Quality Guarantee',
          text: 'All shipments should be inspected upon delivery. Damaged items or lot discrepancies are eligible for immediate replacement or credit within 30 calendar days.',
        },
      ],
    },
    compliance: {
      title: 'Health Canada MDEL & Regulatory Compliance',
      badge: 'HEALTH CANADA VERIFIED',
      icon: ShieldCheck,
      sections: [
        {
          heading: '1. Medical Device Establishment License (MDEL)',
          text: 'Kasper Medical Supplies maintains active MDEL standing with Health Canada for importing and distributing Class I, Class II, and Class III medical devices.',
        },
        {
          heading: '2. DIN & NPN Registrations',
          text: 'All surface disinfectants carry active Health Canada Drug Identification Numbers (DIN), and hand sanitizers carry valid Natural Product Numbers (NPN).',
        },
        {
          heading: '3. Lot Traceability & ISO 13485 Standards',
          text: 'Every batch of PPE, masks, and gloves is cataloged with manufacturer lot numbers, expiration dates, and certificates of analysis (CoA) available upon audit request.',
        },
      ],
    },
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0d1424] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600/20 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">{current.title}</h3>
              <span className="text-[10px] text-cyan-400 font-mono">{current.badge}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-white mb-1.5 text-sm">{sec.heading}</h4>
              <p className="text-slate-300">{sec.text}</p>
            </div>
          ))}

          <div className="text-[11px] text-slate-400 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Kasper Medical & Dental Supplies Canada Inc. • Toronto & Vancouver Headquarters</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090e1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
