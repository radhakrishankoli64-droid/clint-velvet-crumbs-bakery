import React, { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/layout/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AIBakeryAssistant } from './components/ai/AIBakeryAssistant';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { PageSkeleton } from './components/ui/LoadingSkeleton';
import { BackToTop } from './components/ui/BackToTop';
import { SEO } from './components/ui/SEO';

// Lazy Loaded Pages for Code Splitting & Performance Optimization
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Categories = lazy(() => import('./pages/Categories').then(m => ({ default: m.Categories })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderTracking = lazy(() => import('./pages/OrderTracking').then(m => ({ default: m.OrderTracking })));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Wishlist = lazy(() => import('./pages/Wishlist').then(m => ({ default: m.Wishlist })));

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            {/* Global SEO Provider */}
            <SEO />

            <div className="min-h-screen bg-[#FFF8F0] dark:bg-[#1A1210] text-[#5D4037] dark:text-[#E8D8CE] flex flex-col font-sans transition-colors duration-300 selection:bg-[#D4AF37] selection:text-stone-950">
              {/* Header Navigation */}
              <Navbar
                onNavigate={handleNavigate}
                onOpenAIModal={() => setIsAIModalOpen(true)}
              />

              {/* Main Content View Switcher with Lazy Suspense Fallbacks */}
              <main className="flex-1">
                <Suspense fallback={<PageSkeleton />}>
                  {currentView === 'home' && (
                    <Home
                      onNavigate={handleNavigate}
                      onOpenAIModal={() => setIsAIModalOpen(true)}
                    />
                  )}

                  {currentView === 'shop' && (
                    <Shop
                      initialCategory={viewParam || 'all'}
                      onNavigateDetails={id => handleNavigate('product-details', id)}
                    />
                  )}

                  {currentView === 'product-details' && (
                    <ProductDetails
                      productId={viewParam || 'vc-prod-01'}
                      onNavigateDetails={id => handleNavigate('product-details', id)}
                      onNavigateShop={() => handleNavigate('shop')}
                    />
                  )}

                  {currentView === 'categories' && (
                    <Categories
                      onNavigateShop={cat => handleNavigate('shop', cat)}
                    />
                  )}

                  {currentView === 'about' && (
                    <About onNavigateShop={() => handleNavigate('shop')} />
                  )}

                  {currentView === 'checkout' && (
                    <Checkout
                      onNavigateHome={() => handleNavigate('home')}
                      onNavigateTracking={orderId => handleNavigate('tracking', orderId)}
                    />
                  )}

                  {currentView === 'tracking' && (
                    <OrderTracking initialOrderId={viewParam || 'VC-89241'} />
                  )}

                  {currentView === 'dashboard' && (
                    <CustomerDashboard
                      onNavigateTracking={orderId => handleNavigate('tracking', orderId)}
                      onNavigateShop={() => handleNavigate('shop')}
                    />
                  )}

                  {currentView === 'admin' && <AdminDashboard />}

                  {currentView === 'blog' && <Blog />}

                  {currentView === 'faq' && <FAQ />}

                  {currentView === 'contact' && <Contact />}

                  {currentView === 'wishlist' && (
                    <Wishlist
                      onNavigateDetails={id => handleNavigate('product-details', id)}
                      onNavigateShop={() => handleNavigate('shop')}
                    />
                  )}
                </Suspense>
              </main>

              {/* Footer */}
              <Footer onNavigate={handleNavigate} />

              {/* Back to Top Floating Scroll Progress Button */}
              <BackToTop />

              {/* Global Sliding Cart Drawer */}
              <CartDrawer
                onNavigateCheckout={() => handleNavigate('checkout')}
              />

              {/* AI Bakery Sommelier Concierge Modal */}
              <AIBakeryAssistant
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onNavigateDetails={id => handleNavigate('product-details', id)}
              />

              {/* Toast Notifications */}
              <ToastContainer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
