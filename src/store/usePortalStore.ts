import { create } from 'zustand';
import { PortalType } from '../types';

interface PortalStore {
  activePortal: PortalType | null;
  isLoginModalOpen: boolean;
  selectedPortalForLogin: PortalType;
  openLoginModal: (portal?: PortalType) => void;
  closeLoginModal: () => void;
  setActivePortal: (portal: PortalType | null) => void;
  setSelectedPortalForLogin: (portal: PortalType) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortal: null,
  isLoginModalOpen: false,
  selectedPortalForLogin: 'customer',

  openLoginModal: (portal = 'customer') =>
    set({ isLoginModalOpen: true, selectedPortalForLogin: portal }),

  closeLoginModal: () => set({ isLoginModalOpen: false }),

  setActivePortal: (portal) => set({ activePortal: portal }),

  setSelectedPortalForLogin: (portal) => set({ selectedPortalForLogin: portal }),
}));

