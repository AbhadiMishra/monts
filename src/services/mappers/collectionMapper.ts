import { ShopifyCollectionRaw } from '../../types/shopify.raw';
import { Collection } from '../../features/collections/types/collection.types';
import { mapShopifyProductToDomain } from './productMapper';

export function mapShopifyCollectionToDomain(raw: ShopifyCollectionRaw): Collection {
  const products = raw.products.edges.map((e) => mapShopifyProductToDomain(e.node));

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    image: raw.image?.url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    productCount: products.length,
    featured: raw.handle === 'featured' || raw.handle === 'ready-to-wear',
    products,
  };
}
