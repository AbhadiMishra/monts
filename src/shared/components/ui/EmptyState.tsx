import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-muted rounded-xl border border-dashed border-slate-200">
      <div className="w-16 h-16 bg-earth-100 text-earth-800 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && (
        actionHref ? (
          <Button onClick={() => (window.location.href = actionHref)}>{actionLabel}</Button>
        ) : (
          <Button onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  );
};
