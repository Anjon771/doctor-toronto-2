import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ChevronRight,
  Calendar
} from 'lucide-react';
import { CONTENT_ARTICLES } from '../data/medicalData';
import { ContentArticle } from '../types';

interface SocialContentGridProps {
  onReadArticle: (article: ContentArticle) => void;
}

export const SocialContentGrid: React.FC<SocialContentGridProps> = ({ onReadArticle }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Product Tips', 'PPE Information', 'New Products', 'Special Offers', 'Healthcare Tips', 'Customer Updates'];

  const filteredArticles = selectedTag === 'All' 
    ? CONTENT_ARTICLES 
    : CONTENT_ARTICLES.filter((a) => a.tag === selectedTag);

  return (
    <section id="updates-section" className="py-16 sm:py-24 bg-[#090D16] relative border-t border-slate-800/80">
      
      {/* Background light glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>LATEST UPDATES & CLINICAL INSIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Infection Control, Product Releases & Practice Tips
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Stay informed on Canadian healthcare compliance, PPE technology developments, and wholesale restock schedules.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === t
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 6-8 Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => onReadArticle(article)}
              className="group rounded-2xl bg-[#0b1120] border border-slate-800/90 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-black/20" />

                {/* Tag Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#090D16]/90 backdrop-blur-sm border border-cyan-500/30 text-[10px] font-bold text-cyan-300 shadow-md uppercase tracking-wider">
                  {article.tag}
                </div>

                {/* Read Time Tag */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-medium text-slate-300 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="text-slate-400">{article.author}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-heading line-clamp-2 leading-snug mb-2.5">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read More Trigger */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span className="flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300">
                    Clinical Guide
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
