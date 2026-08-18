import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../../../config/navigation';
import { Badge } from '../ui/Badge';

export const MegaMenu: React.FC<{ item: NavItem; onClose: () => void }> = ({ item, onClose }) => {
  if (!item.children) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-elevated border-t border-slate-100 py-8 px-12 z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12">
        {item.children.map((column, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-widest border-b border-slate-100 pb-2">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {column.items.map((sub, j) => (
                <li key={j}>
                  <Link
                    to={sub.href}
                    onClick={onClose}
                    className="text-sm text-slate-600 hover:text-accent font-medium transition-colors flex items-center justify-between group"
                  >
                    <span>{sub.label}</span>
                    {sub.isNew && <Badge variant="new">New</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
