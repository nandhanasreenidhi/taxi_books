import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Footer } from '../components/landing/Footer';
import { PortalModal } from '../components/common/PortalModal';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col text-charcoal-700">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <PortalModal />
    </div>
  );
};

export default MainLayout;

