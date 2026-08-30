import React from 'react';
import { X, Trash2, FileText, ArrowRight, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { QuoteItem } from '../types';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onProceedToQuote: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onProceedToQuote,
}) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1220] border-l border-slate-700/80 shadow-2xl flex flex-col text-slate-100">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 bg-[#090D16] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Quote Basket</h3>
                <p className="text-xs text-slate-400">{totalItems} Case(s) / Units Selected</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-300">Your Quote Basket is Empty</div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our product catalog to add medical masks, nitrile gloves, dental bibs, and clinical apparel to your custom quotation list.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-3 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate font-heading">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.product.packaging}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Modifier */}
                      <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#090D16] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Products:</span>
                <span className="font-bold text-cyan-400">{items.length} items ({totalItems} cases/units)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClearAll}
                  className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-medium border border-slate-800 transition-colors"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToQuote();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Quote Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-400">
                  🇨🇦 Health Canada Compliant B2B Distribution
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
