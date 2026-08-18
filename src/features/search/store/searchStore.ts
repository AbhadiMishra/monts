import { create } from 'zustand';

interface SearchStoreState {
  query: string;
  setQuery: (q: string) => void;
  clearQuery: () => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStoreState>((set, get) => ({
  query: '',
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: '' }),
  recentSearches: ['Silk Blouse', 'Cashmere Coat', 'Leather Tote', 'Pipeline'],
  addRecentSearch: (term) => {
    if (!term.trim()) return;
    const filtered = get().recentSearches.filter((t) => t.toLowerCase() !== term.toLowerCase());
    set({ recentSearches: [term, ...filtered].slice(0, 5) });
  },
  clearRecentSearches: () => set({ recentSearches: [] }),
}));
