import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { LandingPage } from '../pages/landing/LandingPage';
import { PageTransition } from '../components/ui/PageTransition';
import { PageLoader } from '../components/ui/PageLoader';

// Every route except the landing page is split into its own chunk, so the first visit downloads
// only what it needs (and heavier libraries such as Recharts stay out of the landing bundle).
const LoginPage = lazy(() => import('../pages/landing/LoginPage').then((m) => ({ default: m.LoginPage })));

// Customer Portal Pages
const CustomerLoginPage = lazy(() => import('../pages/customer/CustomerLoginPage').then((m) => ({ default: m.CustomerLoginPage })));
const CustomerRegisterPage = lazy(() => import('../pages/customer/CustomerRegisterPage').then((m) => ({ default: m.CustomerRegisterPage })));
const CustomerDashboardPage = lazy(() => import('../pages/customer/CustomerDashboardPage').then((m) => ({ default: m.CustomerDashboardPage })));
const CustomerBookingWizardPage = lazy(() => import('../pages/customer/CustomerBookingWizardPage').then((m) => ({ default: m.CustomerBookingWizardPage })));
const CustomerBookingsPage = lazy(() => import('../pages/customer/CustomerBookingsPage').then((m) => ({ default: m.CustomerBookingsPage })));
const CustomerTrackingPage = lazy(() => import('../pages/customer/CustomerTrackingPage').then((m) => ({ default: m.CustomerTrackingPage })));
const CustomerWalletPage = lazy(() => import('../pages/customer/CustomerWalletPage').then((m) => ({ default: m.CustomerWalletPage })));
const CustomerProfilePage = lazy(() => import('../pages/customer/CustomerProfilePage').then((m) => ({ default: m.CustomerProfilePage })));
const CustomerSupportPage = lazy(() => import('../pages/customer/CustomerSupportPage').then((m) => ({ default: m.CustomerSupportPage })));

// Driver & Admin Portals
const DriverPortalPage = lazy(() => import('../pages/driver/DriverPortalPage').then((m) => ({ default: m.DriverPortalPage })));
const AdminPortalPage = lazy(() => import('../pages/admin/AdminPortalPage').then((m) => ({ default: m.AdminPortalPage })));

// Development-only design foundation gallery. Not included in production builds.
const DesignPreviewPage = import.meta.env.DEV
  ? lazy(() => import('../pages/dev/DesignPreviewPage').then((m) => ({ default: m.DesignPreviewPage })))
  : null;

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    // Scroll to top once the outgoing page has finished leaving (same behaviour as the old
    // ScrollToTop effect, but without jumping the old page while it fades out).
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
    >
      <PageTransition key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Portal Gateway Switcher */}
            <Route path="/login" element={<LoginPage />} />

            {/* Customer Portal Auth */}
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/register" element={<CustomerRegisterPage />} />

            {/* Customer Portal Pages */}
            <Route path="/customer" element={<CustomerDashboardPage />} />
            <Route path="/customer/book" element={<CustomerBookingWizardPage />} />
            <Route path="/customer/booking-flow" element={<CustomerBookingWizardPage />} />
            <Route path="/customer/bookings" element={<CustomerBookingsPage />} />
            <Route path="/customer/tracking/:bookingId" element={<CustomerTrackingPage />} />
            <Route path="/customer/wallet" element={<CustomerWalletPage />} />
            <Route path="/customer/profile" element={<CustomerProfilePage />} />
            <Route path="/customer/support" element={<CustomerSupportPage />} />

            {/* Driver Chauffeur Portal Routes */}
            <Route path="/driver" element={<DriverPortalPage />} />
            <Route path="/driver/portal" element={<DriverPortalPage />} />

            {/* Admin Command Center Portal Routes */}
            <Route path="/admin" element={<AdminPortalPage />} />
            <Route path="/admin/portal" element={<AdminPortalPage />} />

            {DesignPreviewPage && <Route path="/__design" element={<DesignPreviewPage />} />}

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};

export default AppRoutes;
