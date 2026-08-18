import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProduct } from '../hooks/useProduct';
import { useFeaturedProducts } from '../hooks/useProducts';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { Button } from '../../../shared/components/ui/Button';
import { Tabs } from '../../../shared/components/ui/Tabs';
import { Badge } from '../../../shared/components/ui/Badge';
import { ProductGrid } from '../components/ProductGrid';
import { useCartStore } from '../../cart/store/cartStore';
import { useUIStore } from '../../../shared/store/uiStore';
import { useWishlistStore } from '../../../shared/store/wishlistStore';
import { useToast } from '../../../shared/providers/ToastProvider';
import { Heart, ShoppingBag, Star, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { EmptyState } from '../../../shared/components/ui/EmptyState';

export const ProductDetailPage: React.FC = () => {
  const { handle = '' } = useParams();
  const { data: product, isLoading, isError } = useProduct(handle);
  const { data: relatedProducts } = useFeaturedProducts();
  const { addItem } = useCartStore();
  const { openCartDrawer } = useUIStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { success } = useToast();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="w-full aspect-[3/4] rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <EmptyState
          title="Product Not Found"
          description="We couldn't find the product you're looking for."
          actionLabel="Browse Catalog"
          actionHref="/collections/all"
        />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [product.featuredImage];

  const handleAddToCart = () => {
    addItem(product, undefined, quantity);
    success('Added to Cart', `${quantity}x ${product.title} added to your cart.`);
    openCartDrawer();
  };

  const tabsContent = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="text-sm text-slate-600 leading-relaxed flex flex-col gap-3">
          <p>{product.description}</p>
          <p>
            Meticulously crafted from premium long-staple fibers to deliver unmatched quality, reflecting a dedication to excellence in every stitch.
          </p>
        </div>
      ),
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: (
        <div className="text-sm text-slate-600 leading-relaxed flex flex-col gap-2">
          <p>• <strong>Free Worldwide Shipping</strong> on orders over Rs. 2,000.</p>
          <p>• Standard Delivery: 3-5 business days.</p>
          <p>• Returns: Within 30 days receive a full refund or exchange.</p>
        </div>
      ),
    },
    {
      id: 'reviews',
      label: `Reviews (${product.reviewCount})`,
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-earth-50 p-4 rounded-lg">
            <span className="font-serif text-3xl font-bold text-primary">{product.rating}</span>
            <div>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-500">Based on {product.reviewCount} verified buyer reviews</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{product.title} — MONTS</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-12">
        <Breadcrumb items={[{ label: 'Products', href: '/collections/all' }, { label: product.title }]} />

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-4 sticky top-24">
            <div className="aspect-[3/4] w-full bg-earth-50 rounded-2xl overflow-hidden border border-slate-100 relative shadow-card">
              <img
                src={images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xs transition-all duration-200 shadow-sm ${
                  isFavorited ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-primary shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Meta */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {product.vendor}
                </span>
                <Badge variant="new">In Stock</Badge>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">{product.title}</h1>
              <div className="flex items-center gap-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 text-2xl font-bold text-primary border-y border-slate-100 py-4">
              <span>Rs. {product.price.toFixed(2)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-slate-400 line-through font-normal">
                  Rs. {product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Product Options */}
            {product.options.map((opt) => (
              <div key={opt.name} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  <span>{opt.name}:</span>
                  <span className="text-slate-500 font-normal">{selectedOptions[opt.name] || opt.values[0]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((val: string) => {
                    const isSelected = (selectedOptions[opt.name] || opt.values[0]) === val;
                    return (
                      <button
                        key={val}
                        onClick={() => setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))}
                        className={`px-4 py-2 text-xs font-semibold rounded border transition-colors ${
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

            {/* Quantity & Buy CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center border border-slate-300 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-3 text-sm font-bold text-primary min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart — Rs. {(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 text-center text-xs text-slate-600">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-accent" />
                <span>Worldwide shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-accent" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Authentic Quality</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-6 border-t border-slate-100">
              <Tabs items={tabsContent} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="pt-12 border-t border-slate-200">
          <h3 className="font-serif text-2xl font-bold text-primary mb-8">You may also like</h3>
          <ProductGrid products={relatedProducts?.slice(0, 4)} />
        </div>
      </div>
    </>
  );
};
