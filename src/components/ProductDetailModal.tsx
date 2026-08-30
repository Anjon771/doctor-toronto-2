import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  Truck, 
  FileText, 
  Plus, 
  Info,
  Layers,
  Star
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  onRequestQuoteDirect: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onRequestQuoteDirect,
}) => {
  const [quantity, setQuantity] = React.useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToQuote(product, quantity);
    onClose();
  };

  const handleDirectQuote = () => {
    onRequestQuoteDirect(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0d1424] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-md">
              {product.categoryName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: {product.sku}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Product Image & Badges */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#0a101d]/90 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-md text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{product.status}</span>
                </div>
              </div>

              {/* Sample Price Notice */}
              {product.samplePrice && (
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Wholesale Reference Pricing:</div>
                    <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">{product.samplePrice}</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      *Sample demo pricing for volume tiers. Final quote tailored by case/pallet quantity.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Specifications & Key Details */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug mb-3">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {product.fullDescription}
                </p>

                {/* Packaging & Minimum Order */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Packaging Unit:</span>
                    <span className="font-semibold text-slate-200">{product.packaging}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Min. Order Quantity:</span>
                    <span className="font-semibold text-cyan-400">{product.minimumOrder}</span>
                  </div>
                </div>

                {/* Certifications Badges */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Verified Certifications & Compliance:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/40 text-xs font-medium text-cyan-300"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specs Table */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Technical Specifications:
                  </span>
                  <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <tbody className="divide-y divide-slate-800/80">
                        {Object.entries(product.specs).map(([key, val]) => {
                          if (!val) return null;
                          const formattedKey = key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase());
                          return (
                            <tr key={key} className="odd:bg-slate-900/40 even:bg-slate-900/80">
                              <td className="py-2 px-3 text-slate-400 font-medium w-1/3">{formattedKey}</td>
                              <td className="py-2 px-3 text-slate-200">{val}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Recommended Clinical Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((app, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Quantity counter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Cases/Packs:</span>
                  <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-l-lg transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-white min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-r-lg transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleAdd}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Quote Basket</span>
                  </button>

                  <button
                    onClick={handleDirectQuote}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Instant Quote</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
