import { Product } from '../../products/types/product.types';

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
  products?: Product[];
}
