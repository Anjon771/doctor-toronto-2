import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building2, 
  AlertCircle,
  Copy,
  Check,
  Package,
  Layers
} from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS } from '../data/medicalData';
import { QuoteFormData, QuoteItem } from '../types';

interface QuoteSectionProps {
  initialProductInterest?: string;
  quoteItems: QuoteItem[];
  onClearQuoteItems?: () => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  initialProductInterest,
  quoteItems,
  onClearQuoteItems,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    province: 'Ontario',
    city: '',
    productInterestedIn: initialProductInterest || 'N95 Particulate Respirator Masks & Nitrile Gloves',
    quantity: '10 Cases (Wholesale Tier)',
    urgency: 'Standard (1-2 weeks)',
    businessType: 'Dental Clinic',
    message: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (initialProductInterest) {
      setFormData((prev) => ({ ...prev, productInterestedIn: initialProductInterest }));
    }
  }, [initialProductInterest]);

  // When quote basket has items, update productInterestedIn summary
  useEffect(() => {
    if (quoteItems.length > 0) {
      const summary = quoteItems
        .map((item) => `${item.product.name} (${item.quantity} ${item.unit})`)
        .join(', ');
      setFormData((prev) => ({
        ...prev,
        productInterestedIn: summary,
        quantity: `${quoteItems.reduce((s, i) => s + i.quantity, 0)} Total Cases/Units`,
      }));
    }
  }, [quoteItems]);

  const canadianProvinces = [
    'Ontario',
    'Quebec',
    'British Columbia',
    'Alberta',
    'Manitoba',
    'Saskatchewan',
    'Nova Scotia',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Prince Edward Island',
    'Northwest Territories',
    'Yukon',
    'Nunavut',
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business/Clinic Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid clinic email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number';
    }

    if (!formData.productInterestedIn.trim()) {
      newErrors.productInterestedIn = 'Please specify the products required';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please acknowledge terms for quotation processing';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = 'KSP-Q' + Math.floor(10000 + Math.random() * 90000);
      setSubmittedRef(randomId);
      setIsSubmitting(false);
      if (onClearQuoteItems) {
        onClearQuoteItems();
      }
    }, 900);
  };

  const handleCopyRef = () => {
    if (!submittedRef) return;
    navigator.clipboard.writeText(submittedRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-[#070B13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT CLINIC PROCUREMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            Request a B2B Quote & Consultation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Tell us about your clinic or facility requirements. Our commercial accounts team provides itemized quotes and wholesale schedules within 1 business hour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Form & Basket Items */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl">
              
              {submittedRef ? (
                /* Success State */
                <div className="py-8 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      Quote Request Received!
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                      Thank you, <span className="text-cyan-300 font-semibold">{formData.fullName}</span>. A dedicated Kasper Medical account manager has been assigned to <span className="text-white font-medium">{formData.businessName}</span>.
                    </p>
                  </div>

                  {/* Reference Number Pill */}
                  <div className="inline-flex items-center justify-center gap-3 bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl">
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Quote Reference:</div>
                      <div className="text-base font-mono font-bold text-cyan-400">{submittedRef}</div>
                    </div>
                    <button
                      onClick={handleCopyRef}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy reference code"
                    >
                      {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Details Summary Card */}
                  <div className="text-left bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Products Requested:</span>
                      <span className="text-slate-200 font-medium text-right truncate max-w-[200px]">{formData.productInterestedIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume / Quantity:</span>
                      <span className="text-cyan-400 font-medium">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Province & City:</span>
                      <span className="text-slate-200">{formData.city ? `${formData.city}, ` : ''}{formData.province}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contact Email:</span>
                      <span className="text-slate-200">{formData.email}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmittedRef(null);
                        setFormData({
                          fullName: '',
                          businessName: '',
                          email: '',
                          phone: '',
                          province: 'Ontario',
                          city: '',
                          productInterestedIn: '',
                          quantity: '',
                          urgency: 'Standard (1-2 weeks)',
                          businessType: 'Dental Clinic',
                          message: '',
                          agreeTerms: true,
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                    >
                      Submit Another Quote Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Quote Request Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {quoteItems.length > 0 && (
                    <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl mb-4 text-xs">
                      <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5" />
                        <span>Loaded from Quote Basket ({quoteItems.length} Products):</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {quoteItems.map((item, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                            {item.product.name} ({item.quantity} {item.unit})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-fullname">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="quote-fullname"
                        placeholder="Dr. Jane Smith / John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Business / Clinic Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-business">
                        Business / Clinic Name *
                      </label>
                      <input
                        type="text"
                        id="quote-business"
                        placeholder="Downtown Dental Care / Apex Medical"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.businessName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                        }`}
                      />
                      {errors.businessName && <p className="text-[11px] text-rose-400 mt-1">{errors.businessName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-email">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="quote-email"
                        placeholder="procurement@yourclinic.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-phone">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="quote-phone"
                        placeholder="(416) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Province */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-province">
                        Delivery Province
                      </label>
                      <select
                        id="quote-province"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        {canadianProvinces.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Facility Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-type">
                        Facility Type
                      </label>
                      <select
                        id="quote-type"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Dental Clinic">Dental Clinic / Practice</option>
                        <option value="Medical Practice">Medical Practice / Walk-in Clinic</option>
                        <option value="Hospital / Care Home">Hospital / Long-Term Care Home</option>
                        <option value="Laboratory">Diagnostic Laboratory</option>
                        <option value="Corporate / Facility">Corporate / Institutional Facility</option>
                        <option value="Other">Other Healthcare Facility</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Product Interested In */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-product">
                        Product(s) Interested In *
                      </label>
                      <input
                        type="text"
                        id="quote-product"
                        placeholder="e.g., Nitrile Gloves, N95 Masks, Autoclave Pouches"
                        value={formData.productInterestedIn}
                        onChange={(e) => setFormData({ ...formData, productInterestedIn: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.productInterestedIn ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                        }`}
                      />
                      {errors.productInterestedIn && <p className="text-[11px] text-rose-400 mt-1">{errors.productInterestedIn}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-quantity">
                        Quantity / Units
                      </label>
                      <input
                        type="text"
                        id="quote-quantity"
                        placeholder="e.g. 10 Cases / 1 Pallet"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="quote-message">
                      Additional Requirements / Sizing Specifications
                    </label>
                    <textarea
                      id="quote-message"
                      rows={3}
                      placeholder="Specify sizes (e.g. 5x Medium, 5x Large gloves), target delivery date, or request for sample box evaluation..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="quote-agree"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="quote-agree" className="text-[11px] text-slate-400 cursor-pointer">
                      I agree to receive a customized B2B quotation from Kasper Medical Supplies. Net 30 invoicing terms available for registered clinics.
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="text-[11px] text-rose-400">{errors.agreeTerms}</p>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-quote-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Routing to Account Desk...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Zero spam guarantee. 100% confidential healthcare inquiry.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Contact Details & Warehouse Locations */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-white font-heading">
                Direct B2B Inquiries
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a 
                  href="tel:18005277371" 
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-600/15 text-cyan-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Toll-Free Phone:</div>
                    <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">{COMPANY_DETAILS.phone}</div>
                    <div className="text-[11px] text-slate-400">Direct Toronto Line: {COMPANY_DETAILS.localPhone}</div>
                  </div>
                </a>

                <a 
                  href={`mailto:${COMPANY_DETAILS.salesEmail}`} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-cyan-600/15 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Sales & RFQ Email:</div>
                    <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">{COMPANY_DETAILS.salesEmail}</div>
                    <div className="text-[11px] text-slate-400">Orders: {COMPANY_DETAILS.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Operating Hours (EST):</div>
                    <div className="font-semibold text-slate-200">{COMPANY_DETAILS.hours}</div>
                    <div className="text-[11px] text-emerald-400 font-medium">Emergency on-call support available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canadian Fulfillment Hubs */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Canadian Distribution Hubs</span>
                </h4>
                <span className="text-[10px] bg-blue-900/50 text-cyan-300 px-2 py-0.5 rounded border border-blue-500/30 font-semibold">
                  3 HUBS
                </span>
              </div>

              <div className="space-y-2.5">
                {COMPANY_DETAILS.locations.map((loc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="font-bold text-slate-200">{loc.city}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{loc.address}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
