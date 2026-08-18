import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCollection } from '../hooks/useCollections';
import { ProductGrid } from '../../products/components/ProductGrid';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { SlidersHorizontal } from 'lucide-react';

export const CollectionDetailPage: React.FC = () => {
  const { handle = 'all' } = useParams();
  const { data: collection, isLoading, isError } = useCollection(handle);
  const [sortBy, setSortBy] = useState('featured');

  const products = collection?.products || [];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      <Helmet>
        <title>{collection?.title || 'Collection'} — MONTS</title>
        <meta name="description" content={collection?.description || 'Browse MONTS products.'} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Collections', href: '/collections' }, { label: collection?.title || handle }]} />

        {/* Collection Header Banner */}
        <div className="bg-earth-50 rounded-2xl p-8 md:p-12 border border-earth-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent block mb-1">Collection</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
              {collection?.title || handle.replace('-', ' ')}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {collection?.description || 'Curated luxury fashion pieces and signature silhouettes.'}
            </p>
          </div>
          <div className="text-xs text-slate-500 font-semibold bg-white px-4 py-2 rounded-full border border-earth-200 shadow-xs">
            {sortedProducts.length} Items Available
          </div>
        </div>

        {/* Filter / Toolbar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>Filter & Sort</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-slate-500 font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={sortedProducts} isLoading={isLoading} isError={isError} />
      </div>
    </>
  );
};
