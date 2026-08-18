import { create } from 'zustand';
import { Product } from '../../features/products/types/product.types';

interface UIStoreState {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isSearchModalOpen: boolean;
  quickViewProduct: Product | null;
  
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;

  openMobileNav: () => void;
  closeMobileNav: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isSearchModalOpen: false,
  quickViewProduct: null,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));
