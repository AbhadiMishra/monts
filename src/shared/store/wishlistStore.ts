import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../features/products/types/product.types';

interface WishlistStoreState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStoreState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const exists = get().wishlist.some((p) => p.id === product.id);
        if (exists) {
          set({ wishlist: get().wishlist.filter((p) => p.id !== product.id) });
        } else {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      isInWishlist: (productId) => get().wishlist.some((p) => p.id === productId),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'monts-wishlist-storage',
    }
  )
);
