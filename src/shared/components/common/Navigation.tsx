import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationConfig } from '../../../config/navigation';
import { MegaMenu } from './MegaMenu';
import { ChevronDown } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-8 relative">
      {navigationConfig.map((item) => {
        const isActive = location.pathname === item.href;
        const hasChildren = !!item.children;

        return (
          <div
            key={item.label}
            className="relative group py-4"
            onMouseEnter={() => hasChildren && setActiveMegaMenu(item.label)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              to={item.href}
              className={`text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-1 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'
              }`}
            >
              {item.label}
              {hasChildren && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />}
            </Link>

            {hasChildren && activeMegaMenu === item.label && (
              <MegaMenu item={item} onClose={() => setActiveMegaMenu(null)} />
            )}
          </div>
        );
      })}
    </nav>
  );
};
