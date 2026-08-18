import { Product, ProductVariant } from '../../products/types/product.types';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
  currency: string;
  checkoutUrl?: string;
}
