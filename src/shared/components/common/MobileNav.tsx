import React from 'react';
import { Drawer } from '../ui/Drawer';
import { useUIStore } from '../../store/uiStore';
import { navigationConfig } from '../../../config/navigation';
import { Link } from 'react-router-dom';
import { ChevronRight, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';

export const MobileNav: React.FC = () => {
  const { isMobileNavOpen, closeMobileNav } = useUIStore();
  const { isAuthenticated, user } = useAuth();

  return (
    <Drawer isOpen={isMobileNavOpen} onClose={closeMobileNav} position="left" title="MONTS Menu">
      <div className="flex flex-col h-full justify-between gap-6">
        <ul className="flex flex-col divide-y divide-slate-100">
          {navigationConfig.map((item) => (
            <li key={item.label} className="py-3">
              <Link
                to={item.href}
                onClick={closeMobileNav}
                className="font-serif text-lg font-bold text-primary hover:text-accent transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              {item.children && (
                <ul className="pl-4 mt-2 flex flex-col gap-2">
                  {item.children.flatMap((c) => c.items).map((sub, i) => (
                    <li key={i}>
                      <Link
                        to={sub.href}
                        onClick={closeMobileNav}
                        className="text-xs text-slate-600 hover:text-primary transition-colors block py-1"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Account / Login Footer */}
        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
          {isAuthenticated ? (
            <Link
              to="/account"
              onClick={closeMobileNav}
              className="flex items-center gap-3 p-3 bg-earth-50 rounded-lg hover:bg-earth-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary">{user?.firstName} {user?.lastName}</span>
                <span className="text-[10px] text-slate-500">{user?.email}</span>
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMobileNav}
              className="flex items-center justify-center gap-2 p-3 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-hover transition-colors"
            >
              <User className="w-4 h-4" />
              Login / Register Account
            </Link>
          )}
        </div>
      </div>
    </Drawer>
  );
};
