import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCartStore } from '../store/cartStore';
import { CartItemRow } from '../components/CartItem';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { Button } from '../../../shared/components/ui/Button';
import { brandConfig } from '../../../config/brand';
import { ShoppingBag, ArrowRight, Truck, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { items, getSubtotal, getTotalQuantity, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const totalQuantity = getTotalQuantity();
  const threshold = brandConfig.freeShippingThreshold;
  const remaining = threshold - subtotal;

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({totalQuantity}) — MONTS</title>
        <meta name="description" content="View your shopping cart items." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <h1 className="font-serif text-3xl font-bold text-primary">Your Shopping Cart</h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-surface-muted rounded-2xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-earth-100 text-earth-800 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-2">Your cart is currently empty</h2>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              Before proceeding to checkout you must add some products to your shopping cart.
            </p>
            <Button size="lg">
              <Link to="/collections/all">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Items Column */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-slate-100 bg-white p-6 rounded-xl border border-slate-100 shadow-card">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Summary Column */}
            <div className="flex flex-col gap-6 bg-earth-50 p-6 rounded-xl border border-earth-100 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-primary border-b border-earth-200 pb-3">
                Order Summary
              </h3>

              {/* Free Shipping Alert */}
              <div className="flex items-center gap-2 text-xs font-medium text-earth-900">
                <Truck className="w-4 h-4 text-accent" />
                {remaining <= 0 ? (
                  <span className="font-bold text-emerald-700">You qualify for FREE worldwide shipping!</span>
                ) : (
                  <span>Add <strong>Rs. {remaining.toFixed(2)}</strong> more for free shipping</span>
                )}
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal ({totalQuantity} items)</span>
                <span className="font-bold text-primary">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-medium">{remaining <= 0 ? 'FREE' : 'Rs. 250.00'}</span>
              </div>

              <div className="border-t border-earth-200 pt-4 flex justify-between items-center text-lg font-bold text-primary">
                <span>Total</span>
                <span className="text-xl">Rs. {(subtotal + (remaining <= 0 ? 0 : 250)).toFixed(2)}</span>
              </div>

              <Button
                onClick={() => alert('Shopify Checkout flow triggered! Storefront API integration ready.')}
                size="lg"
                className="w-full"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
