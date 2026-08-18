import React from 'react';
import { CartItem as ICartItem } from '../types/cart.types';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartItemRow: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
      <Link to={`/products/${item.product.handle}`} className="w-20 h-24 bg-earth-50 rounded overflow-hidden flex-shrink-0">
        <img
          src={item.product.featuredImage}
          alt={item.product.title}
          className="w-full h-full object-cover object-center"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link
              to={`/products/${item.product.handle}`}
              className="font-serif text-sm font-semibold text-primary hover:text-accent transition-colors line-clamp-1"
            >
              {item.product.title}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {item.variant.title && item.variant.title !== 'Default' && (
            <p className="text-xs text-slate-500 mt-0.5">{item.variant.title}</p>
          )}
          <p className="text-xs font-semibold text-primary mt-1">Rs. {item.variant.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-slate-200 rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-slate-500 hover:text-primary transition-colors text-xs"
            >
              -
            </button>
            <span className="px-2 py-1 text-xs font-medium text-primary min-w-[24px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-slate-500 hover:text-primary transition-colors text-xs"
            >
              +
            </button>
          </div>
          <span className="text-xs font-bold text-primary">
            Rs. {(item.variant.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
