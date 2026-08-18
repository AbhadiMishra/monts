import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CartDrawer } from '../../features/cart/components/CartDrawer';
import { MobileNav } from '../components/common/MobileNav';
import { SearchModal } from '../../features/search/components/SearchModal';
import { QuickViewModal } from '../../features/products/components/QuickViewModal';
import { ToastContainer } from '../components/common/ToastContainer';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export const RootLayout: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-white text-primary">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <MobileNav />
        <SearchModal />
        <QuickViewModal />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};
