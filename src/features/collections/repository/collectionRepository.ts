import { Collection } from '../types/collection.types';
import { env } from '../../../config/env';
import { mockCollectionProvider } from '../../../services/adapters/mock/mockCollectionProvider';
import { shopifyCollectionProvider } from '../../../services/adapters/shopify/shopifyCollectionProvider';

export interface ICollectionRepository {
  getCollections(): Promise<Collection[]>;
  getCollectionByHandle(handle: string): Promise<Collection | null>;
}

class CollectionRepository implements ICollectionRepository {
  private provider = env.apiProvider === 'shopify' ? shopifyCollectionProvider : mockCollectionProvider;

  async getCollections(): Promise<Collection[]> {
    return this.provider.getCollections();
  }

  async getCollectionByHandle(handle: string): Promise<Collection | null> {
    return this.provider.getCollectionByHandle(handle);
  }
}

export const collectionRepository = new CollectionRepository();
