import React from 'react';
import { Product } from '../types/product.types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../../../shared/components/ui/Skeleton';
import { EmptyState } from '../../../shared/components/ui/EmptyState';

export interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  isError?: boolean;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  isError,
  columns = 4,
}) => {
  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to Load Products"
        description="An error occurred while fetching products. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        description="We couldn't find any products matching your selected criteria."
        actionLabel="View All Collections"
        actionHref="/collections"
      />
    );
  }

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
