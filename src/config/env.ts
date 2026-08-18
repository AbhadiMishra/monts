export const env = {
  apiProvider: (import.meta.env.VITE_API_PROVIDER || 'mock') as 'mock' | 'shopify',
  shopifyDomain: import.meta.env.VITE_SHOPIFY_DOMAIN || '',
  shopifyStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
  enableMock: import.meta.env.VITE_ENABLE_MOCK !== 'false',
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  siteName: import.meta.env.VITE_SITE_NAME || 'MONTS',
  isDev: import.meta.env.DEV,
};
