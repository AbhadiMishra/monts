import React, { useState } from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import { useUIStore } from '../../../shared/store/uiStore';
import { useCartStore } from '../../cart/store/cartStore';
import { useToast } from '../../../shared/providers/ToastProvider';
import { Button } from '../../../shared/components/ui/Button';
import { ShoppingBag, Star, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, openCartDrawer } = useUIStore();
  const { addItem } = useCartStore();
  const { success } = useToast();

  const [selectedOption, setSelectedOption] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addItem(quickViewProduct, undefined, quantity);
    success('Added to Cart', `${quantity}x ${quickViewProduct.title} added to your cart.`);
    closeQuickView();
    openCartDrawer();
  };

  return (
    <Modal isOpen={!!quickViewProduct} onClose={closeQuickView} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="aspect-[3/4] bg-earth-50 rounded-lg overflow-hidden border border-slate-100">
          <img
            src={quickViewProduct.featuredImage}
            alt={quickViewProduct.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-1">
              {quickViewProduct.vendor}
            </span>
            <h2 className="font-serif text-2xl font-bold text-primary mb-2">{quickViewProduct.title}</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 text-xl font-bold text-primary border-y border-slate-100 py-3">
            <span>Rs. {quickViewProduct.price.toFixed(2)}</span>
            {quickViewProduct.compareAtPrice && (
              <span className="text-sm text-slate-400 line-through">
                Rs. {quickViewProduct.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {quickViewProduct.description}
          </p>

          {/* Options */}
          {quickViewProduct.options.map((opt) => (
            <div key={opt.name} className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                {opt.name}: <span className="font-normal text-slate-500">{selectedOption[opt.name] || opt.values[0]}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((val) => {
                  const isSelected = (selectedOption[opt.name] || opt.values[0]) === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setSelectedOption((prev) => ({ ...prev, [opt.name]: val }))}
                      className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-slate-300 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-slate-500 hover:text-primary transition-colors text-sm"
              >
                -
              </button>
              <span className="px-3 py-2 text-sm font-semibold text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-slate-500 hover:text-primary transition-colors text-sm"
              >
                +
              </button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart — Rs. {(quickViewProduct.price * quantity).toFixed(2)}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium pt-2">
            <Check className="w-4 h-4" />
            In stock, ready to ship with free returns within 30 days.
          </div>
        </div>
      </div>
    </Modal>
  );
};
