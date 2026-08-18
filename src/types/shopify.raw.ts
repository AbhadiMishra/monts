/**
 * Raw Shopify Storefront GraphQL API Response Types
 * IMPORTANT: Components and hooks must NEVER depend directly on these types!
 * They are converted into Internal Domain Models by the mapper service layer.
 */

export interface ShopifyImageRaw {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoneyRaw {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariantRaw {
  id: string;
  title: string;
  price: ShopifyMoneyRaw;
  compareAtPrice?: ShopifyMoneyRaw;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImageRaw;
  sku?: string;
}

export interface ShopifyProductRaw {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyMoneyRaw;
    maxVariantPrice: ShopifyMoneyRaw;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoneyRaw;
  };
  featuredImage?: ShopifyImageRaw;
  images: {
    edges: { node: ShopifyImageRaw }[];
  };
  variants: {
    edges: { node: ShopifyProductVariantRaw }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  availableForSale: boolean;
}

export interface ShopifyCollectionRaw {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImageRaw;
  products: {
    edges: { node: ShopifyProductRaw }[];
  };
}

export interface ShopifyCartItemRaw {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    product: ShopifyProductRaw;
    title: string;
    price: ShopifyMoneyRaw;
    image?: ShopifyImageRaw;
  };
}

export interface ShopifyCartRaw {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoneyRaw;
    totalAmount: ShopifyMoneyRaw;
  };
  lines: {
    edges: { node: ShopifyCartItemRaw }[];
  };
}
