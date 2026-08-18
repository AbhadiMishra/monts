import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link to="/" className="hover:text-primary transition-colors flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-3 h-3 mx-1 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-slate-800 tracking-wide">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
