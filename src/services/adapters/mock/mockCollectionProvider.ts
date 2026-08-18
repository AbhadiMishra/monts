import { Collection } from '../../../features/collections/types/collection.types';
import collectionsData from '../../../mock/data/collections.json';
import productsData from '../../../mock/data/products.json';
import { Product } from '../../../features/products/types/product.types';
import { delay } from '../../../mock/delay';

export class MockCollectionProvider {
  async getCollections(): Promise<Collection[]> {
    await delay(300);
    return (collectionsData as Collection[]).map((col) => ({
      ...col,
      products: (productsData as Product[]).slice(0, 4),
    }));
  }

  async getCollectionByHandle(handle: string): Promise<Collection | null> {
    await delay(250);
    const col = (collectionsData as Collection[]).find((c) => c.handle === handle || (handle === 'all' && c.handle === 'ready-to-wear'));
    if (!col) return null;

    return {
      ...col,
      products: productsData as Product[],
    };
  }
}

export const mockCollectionProvider = new MockCollectionProvider();
