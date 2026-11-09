import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortalStore } from '../../store/usePortalStore';
import { PortalType } from '../../types';
import { PortalGateway } from '../landing/PortalGateway';
import { luxuryEase } from '../../styles/animations';

/** Public portal gateway (modal). Same store, same navigation as before; presentation redesigned. */
export const PortalModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, selectedPortalForLogin, setSelectedPortalForLogin, setActivePortal } =
    usePortalStore();
  const navigate = useNavigate();

  const handlePortalSelect = (portalId: PortalType, route: string) => {
    setActivePortal(portalId);
    closeLoginModal();
    navigate(route);
  };

  useEffect(() => {
    if (!isLoginModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeLoginModal();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isLoginModalOpen, closeLoginModal]);

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            className="fixed inset-0 bg-coal-950/90 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose a portal"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="relative my-auto w-full max-w-6xl text-bone"
          >
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <div>
                <p className="wv-label text-silver">Demo portals</p>
                <h2 className="wv-title mt-2 text-5xl text-bone sm:text-7xl">Choose your portal</h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={closeLoginModal}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/25 text-bone transition-colors hover:bg-crimson"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <PortalGateway
              selected={selectedPortalForLogin}
              onSelect={setSelectedPortalForLogin}
              onEnter={handlePortalSelect}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
