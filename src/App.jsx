import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Storefront } from './components/Storefront';
import { AdminPanel } from './components/AdminPanel';
import { DomainSetupGuide } from './components/DomainSetupGuide';
import { OrdersView } from './components/OrdersView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainContent = () => {
  const { activeTab, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-500">
          <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white ${
            toastMessage.type === 'error' ? 'bg-rose-600' :
            toastMessage.type === 'info' ? 'bg-stone-900' :
            'bg-emerald-700'
          }`}>
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> :
             toastMessage.type === 'info' ? <Info className="w-4 h-4" /> :
             <CheckCircle2 className="w-4 h-4" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Routed View */}
      <main className="flex-1 pb-16">
        {activeTab === 'store' && <Storefront />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'domain-guide' && <DomainSetupGuide />}
        {activeTab === 'orders' && <OrdersView />}
      </main>

      {/* Modals & Drawers */}
      <CartDrawer />
      <WishlistModal />
      <ProductDetailModal />
      <CheckoutModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
