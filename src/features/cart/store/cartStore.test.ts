import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';
import { Product } from '../../products/types/product.types';

const mockProduct: Product = {
  id: 'prod_test_1',
  handle: 'test-blouse',
  title: 'Test Silk Blouse',
  description: 'Test description',
  vendor: 'MONTS',
  category: 'Tops',
  price: 19.99,
  currency: 'INR',
  featuredImage: 'https://example.com/img.jpg',
  images: ['https://example.com/img.jpg'],
  tags: ['test'],
  options: [],
  variants: [
    {
      id: 'var_test_1',
      title: 'Default',
      price: 19.99,
      available: true,
      options: [],
    },
  ],
  available: true,
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().getTotalQuantity()).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
  });

  it('should add item to cart', () => {
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().getTotalQuantity()).toBe(1);
    expect(useCartStore.getState().getSubtotal()).toBe(19.99);
  });

  it('should increment quantity when adding existing item', () => {
    useCartStore.getState().addItem(mockProduct, undefined, 1);
    useCartStore.getState().addItem(mockProduct, undefined, 2);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().getTotalQuantity()).toBe(3);
    expect(useCartStore.getState().getSubtotal()).toBeCloseTo(59.97);
  });

  it('should update item quantity', () => {
    useCartStore.getState().addItem(mockProduct);
    const itemId = useCartStore.getState().items[0].id;
    useCartStore.getState().updateQuantity(itemId, 5);
    expect(useCartStore.getState().getTotalQuantity()).toBe(5);
  });

  it('should remove item when quantity is updated to 0', () => {
    useCartStore.getState().addItem(mockProduct);
    const itemId = useCartStore.getState().items[0].id;
    useCartStore.getState().updateQuantity(itemId, 0);
    expect(useCartStore.getState().items.length).toBe(0);
  });
});
