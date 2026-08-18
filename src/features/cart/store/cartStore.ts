import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart.types';
import { Product, ProductVariant } from '../../products/types/product.types';

interface CartStoreState {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedVariant, quantity = 1) => {
        const variant = selectedVariant || product.variants[0] || {
          id: `${product.id}_default`,
          title: 'Default',
          price: product.price,
          available: true,
          options: [],
        };

        const itemId = `${product.id}_${variant.id}`;
        const existingIndex = get().items.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...get().items];
          updated[existingIndex].quantity += quantity;
          set({ items: updated });
        } else {
          set({
            items: [
              ...get().items,
              {
                id: itemId,
                productId: product.id,
                variantId: variant.id,
                product,
                variant,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.variant.price * item.quantity, 0);
      },
    }),
    {
      name: 'monts-cart-storage',
    }
  )
);
