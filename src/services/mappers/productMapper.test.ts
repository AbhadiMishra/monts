import { describe, it, expect } from 'vitest';
import { mapShopifyProductToDomain } from './productMapper';
import { ShopifyProductRaw } from '../../types/shopify.raw';

describe('productMapper', () => {
  it('maps raw Shopify product response to clean internal Product model', () => {
    const raw: ShopifyProductRaw = {
      id: 'gid://shopify/Product/1',
      handle: 'silk-shirt',
      title: 'Raw Silk Shirt',
      description: 'Raw description',
      vendor: 'MONTS',
      productType: 'Tops',
      tags: ['silk', 'featured'],
      priceRange: {
        minVariantPrice: { amount: '19.99', currencyCode: 'INR' },
        maxVariantPrice: { amount: '19.99', currencyCode: 'INR' },
      },
      featuredImage: { url: 'https://example.com/shirt.jpg' },
      images: { edges: [{ node: { url: 'https://example.com/shirt.jpg' } }] },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/1',
              title: 'S / Ivory',
              price: { amount: '19.99', currencyCode: 'INR' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: 'S' }],
            },
          },
        ],
      },
      options: [{ name: 'Size', values: ['S'] }],
      availableForSale: true,
    };

    const domainProduct = mapShopifyProductToDomain(raw);
    expect(domainProduct.id).toBe('gid://shopify/Product/1');
    expect(domainProduct.title).toBe('Raw Silk Shirt');
    expect(domainProduct.price).toBe(19.99);
    expect(domainProduct.currency).toBe('INR');
    expect(domainProduct.featuredImage).toBe('https://example.com/shirt.jpg');
    expect(domainProduct.variants.length).toBe(1);
  });
});
