import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={clsx('bg-slate-200 animate-pulse rounded', className)} />;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-[3/4] rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
