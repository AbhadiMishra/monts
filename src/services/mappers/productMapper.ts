import { ShopifyProductRaw } from '../../types/shopify.raw';
import { Product } from '../../features/products/types/product.types';

export function mapShopifyProductToDomain(raw: ShopifyProductRaw): Product {
  const price = parseFloat(raw.priceRange.minVariantPrice.amount);
  const compareAtPrice = raw.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(raw.compareAtPriceRange.minVariantPrice.amount)
    : undefined;

  const images = raw.images.edges.map((e) => e.node.url);
  const featuredImage = raw.featuredImage?.url || images[0] || 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&q=80';

  const variants = raw.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    price: parseFloat(e.node.price.amount),
    compareAtPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : undefined,
    available: e.node.availableForSale,
    sku: e.node.sku,
    options: e.node.selectedOptions,
    image: e.node.image?.url,
  }));

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    vendor: raw.vendor || 'MONTS',
    category: raw.productType || 'Ready-to-Wear',
    price,
    compareAtPrice,
    currency: raw.priceRange.minVariantPrice.currencyCode || 'INR',
    featuredImage,
    images,
    tags: raw.tags || [],
    options: raw.options || [],
    variants,
    available: raw.availableForSale,
    isNew: raw.tags.includes('new') || raw.tags.includes('pipeline'),
    isBestSeller: raw.tags.includes('best-seller'),
    rating: 4.8,
    reviewCount: 24,
  };
}
