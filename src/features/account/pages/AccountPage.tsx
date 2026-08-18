import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../auth/hooks/useAuth';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { Button } from '../../../shared/components/ui/Button';
import { Badge } from '../../../shared/components/ui/Badge';
import { LogOut, Package, MapPin, ShieldCheck, Mail, Phone } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Helmet>
        <title>My Account — MONTS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'My Account' }]} />

        {/* Profile Banner */}
        <div className="bg-earth-50 rounded-2xl p-8 border border-earth-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              {user?.firstName?.[0] || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-primary">
                  {user?.firstName} {user?.lastName}
                </h1>
                <Badge variant={user?.role === 'admin' ? 'accent' : 'secondary'}>
                  {user?.role}
                </Badge>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {user?.email}
              </span>
            </div>
          </div>

          <Button onClick={logout} variant="outline" size="sm" className="text-rose-600 border-rose-200 hover:bg-rose-50">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order History */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-card flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2 border-b border-slate-100 pb-3">
              <Package className="w-5 h-5 text-accent" /> Recent Orders ({user?.ordersCount || 0})
            </h3>
            {user?.ordersCount ? (
              <div className="flex flex-col gap-4 text-sm">
                <div className="p-4 bg-earth-50 rounded-lg border border-earth-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-primary block">Order #MONTS-8942</span>
                    <span className="text-xs text-slate-500">August 01, 2026 • 2 Items</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary block">Rs. 39.98</span>
                    <Badge variant="new">Delivered</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">You haven't placed any orders yet.</p>
            )}
          </div>

          {/* Primary Address */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-card flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-accent" /> Default Address
            </h3>
            {user?.addresses?.[0] ? (
              <div className="text-xs text-slate-600 leading-relaxed flex flex-col gap-1">
                <span className="font-bold text-primary">{user.firstName} {user.lastName}</span>
                <span>{user.addresses[0].street}</span>
                <span>{user.addresses[0].city}, {user.addresses[0].state} {user.addresses[0].postalCode}</span>
                <span>{user.addresses[0].country}</span>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No primary shipping address saved.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
