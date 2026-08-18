import { Product, ProductFilter } from '../../../features/products/types/product.types';
import { env } from '../../../config/env';

/**
 * Shopify Storefront GraphQL Provider Implementation
 * To activate, set VITE_API_PROVIDER=shopify in .env and provide domain & token.
 */
export class ShopifyProductProvider {
  private domain = env.shopifyDomain;
  private token = env.shopifyStorefrontToken;

  async getProducts(_filter?: ProductFilter): Promise<Product[]> {
    if (!this.domain || !this.token) {
      console.warn('Shopify Storefront API credentials missing. Falling back to mock data.');
      return [];
    }
    // Future GraphQL request implementation using fetch/graphql-request
    return [];
  }

  async getProductByHandle(_handle: string): Promise<Product | null> {
    return null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return [];
  }
}

export const shopifyProductProvider = new ShopifyProductProvider();
