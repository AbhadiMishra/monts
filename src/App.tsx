import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './shared/layouts/RootLayout';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { GuestRoute } from './features/auth/components/GuestRoute';
import { ProductCardSkeleton } from './shared/components/ui/Skeleton';

// Lazy loaded page components for performance code splitting
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CollectionsPage = lazy(() => import('./features/collections/pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage })));
const CollectionDetailPage = lazy(() => import('./features/collections/pages/CollectionDetailPage').then((m) => ({ default: m.CollectionDetailPage })));
const ProductDetailPage = lazy(() => import('./features/products/pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./features/cart/pages/CartPage').then((m) => ({ default: m.CartPage })));
const SearchPage = lazy(() => import('./features/search/pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const AccountPage = lazy(() => import('./features/account/pages/AccountPage').then((m) => ({ default: m.AccountPage })));

const LoginPage = lazy(() => import('./features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const WholesalePage = lazy(() => import('./pages/WholesalePage').then((m) => ({ default: m.WholesalePage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));

// Error Pages
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const UnauthorizedPage = lazy(() => import('./pages/errors/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage })));
const ForbiddenPage = lazy(() => import('./pages/errors/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage })));
const ServerErrorPage = lazy(() => import('./pages/errors/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage })));
const ServiceUnavailablePage = lazy(() => import('./pages/errors/ServiceUnavailablePage').then((m) => ({ default: m.ServiceUnavailablePage })));
const OfflinePage = lazy(() => import('./pages/errors/OfflinePage').then((m) => ({ default: m.OfflinePage })));

const SuspenseFallback = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 min-h-[60vh]">
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 bg-slate-200 w-1/3 rounded" />
      <ProductCardSkeleton />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<SuspenseFallback />}>
        <ServerErrorPage />
      </Suspense>
    ),
    children: [
      // Public Routes
      { index: true, element: <Suspense fallback={<SuspenseFallback />}><HomePage /></Suspense> },
      { path: 'collections', element: <Suspense fallback={<SuspenseFallback />}><CollectionsPage /></Suspense> },
      { path: 'collections/:handle', element: <Suspense fallback={<SuspenseFallback />}><CollectionDetailPage /></Suspense> },
      { path: 'products/:handle', element: <Suspense fallback={<SuspenseFallback />}><ProductDetailPage /></Suspense> },
      { path: 'cart', element: <Suspense fallback={<SuspenseFallback />}><CartPage /></Suspense> },
      { path: 'search', element: <Suspense fallback={<SuspenseFallback />}><SearchPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<SuspenseFallback />}><AboutPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<SuspenseFallback />}><ContactPage /></Suspense> },
      { path: 'wholesale', element: <Suspense fallback={<SuspenseFallback />}><WholesalePage /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<SuspenseFallback />}><FAQPage /></Suspense> },

      // Guest Routes (Redirects to /account if already signed in)
      {
        path: 'login',
        element: (
          <GuestRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <LoginPage />
            </Suspense>
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <RegisterPage />
            </Suspense>
          </GuestRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <GuestRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <ForgotPasswordPage />
            </Suspense>
          </GuestRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <GuestRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <ResetPasswordPage />
            </Suspense>
          </GuestRoute>
        ),
      },

      // Protected Routes (Redirects to /login if unauthenticated)
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <AccountPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      // Error Routes
      { path: '401', element: <Suspense fallback={<SuspenseFallback />}><UnauthorizedPage /></Suspense> },
      { path: '403', element: <Suspense fallback={<SuspenseFallback />}><ForbiddenPage /></Suspense> },
      { path: '500', element: <Suspense fallback={<SuspenseFallback />}><ServerErrorPage /></Suspense> },
      { path: '503', element: <Suspense fallback={<SuspenseFallback />}><ServiceUnavailablePage /></Suspense> },
      { path: 'offline', element: <Suspense fallback={<SuspenseFallback />}><OfflinePage /></Suspense> },
      { path: '*', element: <Suspense fallback={<SuspenseFallback />}><NotFoundPage /></Suspense> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
