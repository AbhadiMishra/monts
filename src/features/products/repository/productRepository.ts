import { Product, ProductFilter } from '../types/product.types';
import { env } from '../../../config/env';
import { mockProductProvider } from '../../../services/adapters/mock/mockProductProvider';
import { shopifyProductProvider } from '../../../services/adapters/shopify/shopifyProductProvider';

export interface IProductRepository {
  getProducts(filter?: ProductFilter): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
}

class ProductRepository implements IProductRepository {
  private provider = env.apiProvider === 'shopify' ? shopifyProductProvider : mockProductProvider;

  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    return this.provider.getProducts(filter);
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    return this.provider.getProductByHandle(handle);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.provider.getFeaturedProducts();
  }
}

export const productRepository = new ProductRepository();
