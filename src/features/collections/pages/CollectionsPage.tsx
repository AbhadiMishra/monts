import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCollections } from '../hooks/useCollections';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { ArrowRight } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { data: collections, isLoading, isError } = useCollections();

  return (
    <>
      <Helmet>
        <title>Collections — MONTS</title>
        <meta name="description" content="Explore luxury ready-to-wear fashion collections from MONTS." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Collections' }]} />

        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">Collections</h1>
          <p className="text-sm text-slate-500 mt-2">Discover curated luxury lines and ready-to-wear seasonal releases.</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-[4/5] rounded-xl" />
            ))}
          </div>
        )}

        {isError && (
          <EmptyState
            title="Failed to Load Collections"
            description="Unable to fetch collection catalog."
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        )}

        {collections && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.handle}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-card border border-slate-100"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-earth-50 relative">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{col.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-primary pt-2 border-t border-slate-100">
                    <span>{col.productCount} Products</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
