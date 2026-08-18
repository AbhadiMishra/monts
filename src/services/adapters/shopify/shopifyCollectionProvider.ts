import { Collection } from '../../../features/collections/types/collection.types';

export class ShopifyCollectionProvider {
  async getCollections(): Promise<Collection[]> {
    return [];
  }

  async getCollectionByHandle(_handle: string): Promise<Collection | null> {
    return null;
  }
}

export const shopifyCollectionProvider = new ShopifyCollectionProvider();
