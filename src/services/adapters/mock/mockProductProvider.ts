import { Product, ProductFilter } from '../../../features/products/types/product.types';
import productsData from '../../../mock/data/products.json';
import { delay } from '../../../mock/delay';

export class MockProductProvider {
  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    await delay(300);
    let result: Product[] = [...(productsData as Product[])];

    if (filter?.category) {
      const cat = filter.category.toLowerCase();
      result = result.filter(
        (p) => p.category.toLowerCase() === cat || p.tags.some((t) => t.toLowerCase() === cat)
      );
    }

    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filter?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (filter.minPrice || 0));
    }

    if (filter?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (filter.maxPrice || Infinity));
    }

    if (filter?.sortBy) {
      switch (filter.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }
    }

    return result;
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    await delay(250);
    const product = (productsData as Product[]).find((p) => p.handle === handle);
    return product || null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(200);
    return (productsData as Product[]).filter((p) => p.tags.includes('featured') || p.isBestSeller);
  }
}

export const mockProductProvider = new MockProductProvider();
