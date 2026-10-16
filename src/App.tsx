/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NoticeBanner } from './components/NoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MiniMothAuthModal } from './components/MiniMothAuthModal';
import { GeoInspectorModal } from './components/GeoInspectorModal';
import { CartDrawer } from './pages/CartDrawer';
import { HomeView } from './pages/HomeView';
import { CatalogView } from './pages/CatalogView';
import { ProductDetailView } from './pages/ProductDetailView';
import { OurStoryView } from './pages/OurStoryView';
import { CraftCooperativesView } from './pages/CraftCooperativesView';
import { FaqView } from './pages/FaqView';
import { AiVisibilityDossierView } from './pages/AiVisibilityDossierView';
import { CheckoutView } from './pages/CheckoutView';
import { AccountView } from './pages/AccountView';
import { Product, ProductCategory } from './types';

function AppContent() {
  const { openAuthModal } = useAuth();
  const [currentTab, setCurrentTab] = useState<'home' | 'catalog' | 'detail' | 'our-story' | 'cooperatives' | 'faqs' | 'ai-dossier' | 'checkout' | 'account'>('home');
  const [catalogCategory, setCatalogCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGeoInspectorOpen, setIsGeoInspectorOpen] = useState(false);

  // Dynamic SEO & GEO: Update title and meta description dynamically per view
  useEffect(() => {
    let title = 'Kora Threads — Artisanal Handloom & Pure Cotton | Pune';
    let desc = 'Pune-based direct-to-consumer handloom clothing brand founded in 2021. Sourcing 100% pure cotton directly from weaver cooperatives in Maharashtra & Karnataka.';

    if (currentTab === 'catalog') {
      if (catalogCategory === 'kurtas') {
        title = 'Pure Handloom Cotton Kurtas (₹1,800–₹4,200) | Kora Threads Pune';
        desc = 'Discover pure cotton handloom kurtas loomed in Solapur, Phaltan, and Ilkal. Unbleached ecru textures, mandarin collars, and wooden button details.';
      } else if (catalogCategory === 'stoles') {
        title = 'Handwoven Cotton Stoles (₹900–₹2,400) | Kora Threads Pune';
        desc = 'Lightweight pure handloom cotton stoles with temple borders and hand-twisted fringes. Woven by cooperative societies in Maharashtra and Karnataka.';
      } else if (catalogCategory === 'home-linen') {
        title = 'Artisanal Handloom Cotton Home Linen | Kora Threads Pune';
        desc = 'Recently launched collection of coarse count pure cotton bed runners and handloom cushion covers loomed in Solapur and Ilkal.';
      } else {
        title = 'Pure Handloom Cotton Collections | Kora Threads Pune';
      }
    } else if (currentTab === 'detail' && selectedProduct) {
      title = `${selectedProduct.name} — Pure Handloom Cotton | Kora Threads`;
      desc = `${selectedProduct.tagline} Loomed by ${selectedProduct.cooperativeOrigin.name} in ${selectedProduct.cooperativeOrigin.location}.`;
    } else if (currentTab === 'our-story') {
      title = 'Our Story: Rooted in Craft. Made for Today | Kora Threads Pune';
      desc = 'Founded in Pune in 2021, Kora Threads bridges traditional Maharashtra and Karnataka pit-loom weaving with contemporary cotton wardrobes.';
    } else if (currentTab === 'cooperatives') {
      title = 'Weaver Cooperatives Alliance: Maharashtra & Karnataka | Kora Threads';
      desc = 'Official direct sourcing partnerships with registered handloom weaver cooperatives in Solapur, Phaltan, Ilkal, and Guledgudd.';
    } else if (currentTab === 'faqs') {
      title = 'Authoritative FAQs & Ground Truth | Kora Threads Pune';
      desc = 'Verified facts on Kora Threads: Pune headquarters, 10-day unworn returns, 4–6 day delivery, and MiniMoth verification.';
    } else if (currentTab === 'checkout') {
      title = 'Prototype Demonstration Checkout | Kora Threads';
    } else if (currentTab === 'account') {
      title = 'My Account & MiniMoth Verified Identity | Kora Threads';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [currentTab, catalogCategory, selectedProduct]);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedProduct]);

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'catalog') {
      setCatalogCategory((param as ProductCategory) || 'all');
      setSelectedProduct(null);
      setCurrentTab('catalog');
    } else {
      setSelectedProduct(null);
      setCurrentTab(tab as any);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#1c1c18]">
      {/* Mandatory Rule 1 Persistent Notice Banner */}
      <NoticeBanner onOpenGeoInspector={() => setIsGeoInspectorOpen(true)} />

      {/* Navigation Bar strictly in customer shopping order */}
      <Navbar
        currentTab={currentTab}
        currentCategoryParam={currentTab === 'catalog' ? catalogCategory : undefined}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'catalog' && (
          <CatalogView
            initialCategory={catalogCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => setCurrentTab('catalog')}
            onCheckoutDirect={() => setCurrentTab('checkout')}
          />
        )}

        {currentTab === 'our-story' && (
          <OurStoryView
            onNavigateCatalog={(cat) => handleNavigate('catalog', cat)}
            onNavigateCooperatives={() => handleNavigate('cooperatives')}
          />
        )}

        {currentTab === 'cooperatives' && (
          <CraftCooperativesView
            onNavigateCatalog={(cat) => handleNavigate('catalog', cat)}
            onOpenGeoInspector={() => setIsGeoInspectorOpen(true)}
          />
        )}

        {currentTab === 'faqs' && <FaqView />}

        {currentTab === 'ai-dossier' && (
          <AiVisibilityDossierView
            onOpenInspector={() => setIsGeoInspectorOpen(true)}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutView
            onBackToShopping={() => handleNavigate('catalog')}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'account' && (
          <AccountView
            onBackToHome={() => handleNavigate('home')}
            onOpenAuthModal={openAuthModal}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGeoInspector={() => setIsGeoInspectorOpen(true)}
        onOpenAuthModal={openAuthModal}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setCurrentTab('checkout')}
        onContinueShopping={() => handleNavigate('catalog')}
      />

      {/* MiniMoth Phone Verification Modal */}
      <MiniMothAuthModal />

      {/* Hackathon Evaluator GEO Auditor Modal */}
      <GeoInspectorModal
        isOpen={isGeoInspectorOpen}
        onClose={() => setIsGeoInspectorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
