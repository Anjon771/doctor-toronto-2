import React from 'react';
import { X, Calendar, Clock, User, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { ContentArticle } from '../types';

interface ArticleModalProps {
  article: ContentArticle | null;
  onClose: () => void;
  onBrowseProducts: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onBrowseProducts }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0d1424] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-md">
            {article.tag}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Article Image Banner */}
          <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-90" />
            
            {/* Meta bar */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-heading leading-tight">
            {article.title}
          </h2>

          {/* Excerpt Lead */}
          <p className="text-base text-cyan-200/90 font-medium leading-relaxed border-l-2 border-cyan-400 pl-4 py-1">
            {article.excerpt}
          </p>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Takeaways Card */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Key Practice Takeaways</span>
            </h4>
            <div className="space-y-2">
              {article.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action bottom */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back to Updates
            </button>

            <button
              onClick={() => {
                onClose();
                onBrowseProducts();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Browse Related Supplies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
