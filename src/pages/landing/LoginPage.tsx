import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePortalStore } from '../../store/usePortalStore';
import { PortalType } from '../../types';
import { Wordmark } from '../../components/landing/ui/Wordmark';
import { PortalGateway } from '../../components/landing/PortalGateway';
import { LineReveal } from '../../components/landing/ui/LineReveal';
import '../../styles/landing.css';

/** Public portal gateway page (/login). Redesigned presentation; selection and navigation are unchanged. */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setActivePortal } = usePortalStore();
  const [selectedPortal, setSelectedPortal] = useState<PortalType>('customer');

  const handleEnter = (portal: PortalType, route: string) => {
    setActivePortal(portal);
    navigate(route);
  };

  return (
    <div className="wv-root wv-grain relative min-h-screen overflow-hidden bg-night-forest">
      <div aria-hidden="true" className="absolute inset-0 bg-route-grid [background-size:64px_64px] opacity-60" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Wordmark />
          <Link to="/" className="wv-label flex items-center gap-2 text-bone/70 transition-colors hover:text-bone">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </header>

        <main className="flex flex-1 flex-col justify-center py-10">
          <p className="wv-label text-silver">Demo portals</p>
          <h1 className="wv-title mt-3 text-[clamp(3.5rem,11vw,8rem)] text-bone">
            <LineReveal trigger="mount" lines={['Choose your', 'portal.']} />
          </h1>
          <p className="mb-8 mt-4 max-w-lg text-bone/65">
            Three connected views of the same booking. This is a prototype, so every account is a demo account and no password is needed.
          </p>
          <PortalGateway selected={selectedPortal} onSelect={setSelectedPortal} onEnter={handleEnter} heightClass="lg:h-[460px]" />
        </main>
      </div>
    </div>
  );
};
