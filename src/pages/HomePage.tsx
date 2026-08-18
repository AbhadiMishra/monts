import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useProducts, useFeaturedProducts } from '../features/products/hooks/useProducts';
import { useCollections } from '../features/collections/hooks/useCollections';
import { ProductGrid } from '../features/products/components/ProductGrid';
import { CountdownTimer } from '../shared/components/ui/CountdownTimer';
import { brandConfig } from '../config/brand';
import bannersData from '../mock/data/banners.json';
import { ArrowRight, RotateCcw, Globe, Headphones, Play, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';

export const HomePage: React.FC = () => {
  const { data: featuredProducts, isLoading: loadingFeatured } = useFeaturedProducts();
  const { data: allProducts, isLoading: loadingAll } = useProducts();
  const { data: collections } = useCollections();

  const hero = bannersData.hero;
  const promo = bannersData.promoCountdown;
  const imageWithText = bannersData.imageWithText;
  const details = bannersData.detailsSection;

  return (
    <>
      <Helmet>
        <title>MONTS — Luxury Ready-to-Wear Fashion Storefront</title>
        <meta
          name="description"
          content="MONTS offering minimalist luxury fashion, ready-to-wear garments, accessories, and Pipeline theme storefront experience."
        />
      </Helmet>

      <div className="flex flex-col gap-16 md:gap-24 pb-16">
        {/* HERO BANNER */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-earth-900 text-white">
          <div className="absolute inset-0 z-0">
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-full object-cover opacity-40 scale-105 animate-pulse duration-[10000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-accent-light">
              {hero.title}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {hero.subtitle}
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-earth-100">
                <Link to={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                <Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS CAROUSEL / GRID */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-1">Curated</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Featured Collections</h2>
            </div>
            <Link to="/collections" className="text-xs font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
              View all collections <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections?.slice(0, 3).map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.handle}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-card border border-slate-100 flex items-end p-6"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="relative z-10 text-white flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-light">
                    Collection ({col.productCount} Items)
                  </span>
                  <h3 className="font-serif text-xl font-bold">{col.title}</h3>
                  <span className="text-xs text-slate-300 group-hover:underline flex items-center gap-1 mt-1">
                    View the collection <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHOP THE LOOK / IMAGE WITH TEXT */}
        <section className="bg-earth-50 py-16 md:py-24 border-y border-earth-100">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated border border-earth-200">
              <img
                src={imageWithText.image}
                alt={imageWithText.title}
                className="w-full h-full object-cover"
              />
              {/* Hotspot pin */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-card animate-bounce">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-accent">Brand Story</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">{imageWithText.title}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {imageWithText.description}
              </p>
              <div>
                <Button size="lg" className="bg-primary text-white hover:bg-primary-hover">
                  <Link to={imageWithText.cta.href}>{imageWithText.cta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-1">Handpicked</span>
            <h2 className="font-serif text-3xl font-bold text-primary mb-3">Featured Products</h2>
            <p className="text-xs text-slate-500">Explore signature minimalist pieces crafted from Mulberry silk & fine cashmere.</p>
          </div>

          <ProductGrid products={featuredProducts} isLoading={loadingFeatured} />
        </section>

        {/* PROMOTIONAL COUNTDOWN SECTION */}
        <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-light">
              {promo.subtitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">{promo.title}</h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg">{promo.description}</p>

            {/* Countdown Component */}
            <CountdownTimer targetDate={promo.targetDate} />

            <div className="flex gap-4 pt-2">
              <Button size="lg" className="bg-accent text-white hover:bg-accent-dark">
                <Link to={promo.primaryCta.href}>{promo.primaryCta.label}</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Link to={promo.secondaryCta.href}>{promo.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* THE DETAILS / BRAND VALUES */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-primary mb-12">{details.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {details.items.map((item, idx) => (
              <div key={idx} className="p-8 bg-earth-50 rounded-xl border border-earth-100 flex flex-col gap-3">
                <span className="font-serif text-3xl font-bold text-accent">0{idx + 1}</span>
                <h3 className="font-serif text-lg font-bold text-primary">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ALL PRODUCTS CATALOG GRID */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary">All Ready-to-Wear</h2>
            <Link to="/collections/all" className="text-xs font-semibold text-accent hover:underline">
              Browse full catalog →
            </Link>
          </div>
          <ProductGrid products={allProducts} isLoading={loadingAll} />
        </section>

        {/* VALUE PROPOSITION BAR */}
        <section className="bg-surface-muted py-12 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="w-8 h-8 text-accent" />
              <h4 className="font-serif text-base font-bold text-primary">Free returns</h4>
              <p className="text-xs text-slate-500">Returns within 30 days receive a full refund.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-8 h-8 text-accent" />
              <h4 className="font-serif text-base font-bold text-primary">Worldwide shipping</h4>
              <p className="text-xs text-slate-500">Ship anywhere, rates available at checkout.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Headphones className="w-8 h-8 text-accent" />
              <h4 className="font-serif text-base font-bold text-primary">24/7 support</h4>
              <p className="text-xs text-slate-500">Call us anytime at 1(800) 555-1234.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
