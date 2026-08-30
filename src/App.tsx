import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { AboutSection } from './components/AboutSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { SocialContentGrid } from './components/SocialContentGrid';
import { ArticleModal } from './components/ArticleModal';
import { QuoteSection } from './components/QuoteSection';
import { QuoteDrawer } from './components/QuoteDrawer';
import { FAQSection } from './components/FAQSection';
import { QuickSearchModal } from './components/QuickSearchModal';
import { PolicyModals } from './components/PolicyModals';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { Product, ProductCategory, QuoteItem, ContentArticle } from './types';
import { FileText, ArrowUp } from 'lucide-react';

export default function App() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<ContentArticle | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | 'compliance' | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [initialProductInterest, setInitialProductInterest] = useState<string>('');

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add product to quote basket
  const handleAddToQuote = (product: Product, quantity = 1) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity, unit: 'cases' }];
      }
    });

    addToast(
      'success',
      'Added to Quote Basket',
      `${quantity}x ${product.name} added. View basket or submit RFQ.`
    );
  };

  // Update item quantity in quote basket
  const handleUpdateQuoteQuantity = (productId: string, qty: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Remove item from quote basket
  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('info', 'Item Removed', 'Product removed from your quote list.');
  };

  const handleClearQuoteItems = () => {
    setQuoteItems([]);
  };

  // Direct Request Quote (scrolls directly to quote form with product preselected)
  const handleRequestQuoteDirect = (product: Product) => {
    setInitialProductInterest(`${product.name} (SKU: ${product.sku})`);
    const element = document.getElementById('contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimPromo = (promoCode: string) => {
    setInitialProductInterest(`Applying Promo Code: [${promoCode}] - Bulk Clinic Discount`);
    addToast('success', 'Promo Code Applied', `Code ${promoCode} applied to your upcoming RFQ.`);
    const element = document.getElementById('contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalQuoteCount = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        quoteItems={quoteItems}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat as ProductCategory)}
        onOpenQuoteModal={() => scrollToSection('contact-section')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onShopClick={() => scrollToSection('products-section')}
          onQuoteClick={() => scrollToSection('contact-section')}
          onPromoClick={() => scrollToSection('promotions-section')}
        />

        {/* 2. Trust / Business Highlights */}
        <TrustHighlights />

        {/* 3. About Section */}
        <AboutSection
          onQuoteClick={() => scrollToSection('contact-section')}
          onExploreProducts={() => scrollToSection('products-section')}
        />

        {/* 4. Product Categories */}
        <CategoryGrid
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 5. Featured Products Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onViewProductDetails={(prod) => setActiveProductModal(prod)}
          onAddToQuote={handleAddToQuote}
          onRequestQuoteDirect={handleRequestQuoteDirect}
        />

        {/* 6. Special Offers / Promotions */}
        <SpecialOffers
          onClaimPromo={handleClaimPromo}
          onRequestBulkQuote={() => scrollToSection('contact-section')}
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. Latest Updates / Social Content Grid */}
        <SocialContentGrid
          onReadArticle={(art) => setActiveArticleModal(art)}
        />

        {/* 10. FAQ Section */}
        <FAQSection />

        {/* 11. Contact / Request a Quote Form */}
        <QuoteSection
          initialProductInterest={initialProductInterest}
          quoteItems={quoteItems}
          onClearQuoteItems={handleClearQuoteItems}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat as ProductCategory)}
        onOpenPolicy={(type) => setPolicyModalType(type)}
        onOpenQuoteModal={() => scrollToSection('contact-section')}
      />

      {/* Floating Action Button: Quick Quote Drawer Counter */}
      {totalQuoteCount > 0 && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full shadow-2xl shadow-blue-600/40 border border-cyan-400/40 transition-transform active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold font-heading">Quote Basket ({totalQuoteCount})</span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToQuote={handleAddToQuote}
        onRequestQuoteDirect={handleRequestQuoteDirect}
      />

      <ArticleModal
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
        onBrowseProducts={() => scrollToSection('products-section')}
      />

      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearAll={handleClearQuoteItems}
        onProceedToQuote={() => scrollToSection('contact-section')}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setActiveProductModal(p)}
        onSelectArticle={(a) => setActiveArticleModal(a)}
      />

      <PolicyModals
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

      {/* Global Toast Feedback Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
