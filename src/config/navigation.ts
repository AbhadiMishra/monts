export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    items: { label: string; href: string; isNew?: boolean }[];
  }[];
}

export const navigationConfig: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Ready-to-Wear Collection',
    href: '/collections',
    children: [
      {
        title: 'Categories',
        items: [
          { label: 'All Products', href: '/collections/all' },
          { label: 'Featured Collections', href: '/collections/featured', isNew: true },
          { label: 'Tops & Blouses', href: '/collections/tops' },
          { label: 'Outerwear & Coats', href: '/collections/outerwear' },
          { label: 'Dresses & Skirts', href: '/collections/dresses' },
          { label: 'Luxury Accessories', href: '/collections/accessories' },
        ],
      },
      {
        title: 'Trending',
        items: [
          { label: 'Pipeline Theme Special', href: '/collections/pipeline-special' },
          { label: 'Best Sellers', href: '/collections/best-sellers' },
          { label: 'New Arrivals', href: '/collections/new-arrivals', isNew: true },
          { label: 'Minimalist Line', href: '/collections/minimalist' },
        ],
      },
    ],
  },
  {
    label: 'Wholesale',
    href: '/wholesale',
  },
  {
    label: '📞 Contact',
    href: '/contact',
  },
];
