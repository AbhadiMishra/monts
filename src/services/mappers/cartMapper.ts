import { ShopifyCartRaw } from '../../types/shopify.raw';
import { Cart } from '../../features/cart/types/cart.types';
import { mapShopifyProductToDomain } from './productMapper';

export function mapShopifyCartToDomain(raw: ShopifyCartRaw): Cart {
  const items = raw.lines.edges.map((edge) => {
    const line = edge.node;
    const product = mapShopifyProductToDomain(line.merchandise.product);
    const variant = product.variants.find((v) => v.id === line.merchandise.id) || {
      id: line.merchandise.id,
      title: line.merchandise.title,
      price: parseFloat(line.merchandise.price.amount),
      available: true,
      options: [],
    };

    return {
      id: line.id,
      productId: product.id,
      variantId: variant.id,
      product,
      variant,
      quantity: line.quantity,
    };
  });

  return {
    id: raw.id,
    items,
    subtotal: parseFloat(raw.cost.subtotalAmount.amount),
    totalQuantity: raw.totalQuantity,
    currency: raw.cost.subtotalAmount.currencyCode || 'INR',
    checkoutUrl: raw.checkoutUrl,
  };
}
