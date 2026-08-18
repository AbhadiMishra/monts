import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../../products/hooks/useProducts';
import { ProductGrid } from '../../products/components/ProductGrid';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { Search } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { setQuery } = useSearchStore();

  const { data: products, isLoading, isError } = useProducts({ searchQuery: query });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    if (q) {
      setSearchParams({ q });
      setQuery(q);
    }
  };

  return (
    <>
      <Helmet>
        <title>Search "{query}" — MONTS</title>
        <meta name="description" content={`Search results for ${query} on MONTS.`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Search' }]} />

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto w-full">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search products..."
              className="w-full pl-12 pr-24 py-3 bg-earth-50 border border-slate-300 rounded-lg text-sm text-primary focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">
            {query ? `Search Results for "${query}"` : 'All Products Search'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Found {products?.length || 0} matching items in catalog.
          </p>
        </div>

        <ProductGrid products={products} isLoading={isLoading} isError={isError} />
      </div>
    </>
  );
};
