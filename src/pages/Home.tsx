import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Clock, 
  Award, 
  CheckCircle2, 
  Heart, 
  ShoppingBag,
  Flame,
  Truck,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ui/ProductCard';
import { heroBannerImg, artisanCakeImg, bakeryAmbianceImg } from '../data/mockData';

interface HomeProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAIModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenAIModal }) => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'cakes' | 'breads' | 'macarons' | 'hampers'>('all');

  useEffect(() => {
    fetch('/api/products?isBestseller=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBestsellers(data.products || []);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = bestsellers.filter(p =>
    selectedCategoryTab === 'all' ? true : p.category === selectedCategoryTab
  );

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Bold Typography Hero Showcase */}
      <section className="relative overflow-hidden bg-[#FFF8F0] dark:bg-[#1A1210] border-b border-[#D4AF37]/20 pt-10 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <span className="text-[#D4AF37] text-xs sm:text-sm uppercase tracking-[0.4em] font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Est. 2024 • Mumbai • Luxury Bakery Atelier
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.92] text-[#5D4037] dark:text-[#F3E5AB] font-normal">
              Freshly Baked.<br />
              <span className="italic text-[#D4AF37] font-serif">Lovingly</span><br />
              Crafted.
            </h1>

            <p className="text-base sm:text-lg max-w-md text-[#5D4037]/80 dark:text-[#E8D8CE]/80 leading-relaxed font-light">
              Indulge in a symphony of flavors where French technique meets Indian botanical soul. Every crumb tells a story of 24k gold-leaf precision, 36-hour sourdough, and Belgian chocolate decadence.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-8 sm:px-10 py-4 bg-[#5D4037] text-[#FFF8F0] uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-stone-950 transition-all font-bold shadow-xl flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAIModal}
                className="px-8 sm:px-10 py-4 border border-[#5D4037] dark:border-[#D4AF37] text-[#5D4037] dark:text-[#F3E5AB] uppercase text-xs tracking-widest hover:bg-[#5D4037] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-stone-950 transition-all font-bold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>AI Tasting Assistant</span>
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="pt-8 border-t border-[#D4AF37]/20 grid grid-cols-3 gap-6 max-w-lg text-xs">
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">100%</p>
                <p className="text-[#5D4037]/70 dark:text-stone-400 font-medium">Eggless Options</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">36-Hr</p>
                <p className="text-[#5D4037]/70 dark:text-stone-400 font-medium">Wild Fermentation</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">4.9 ★</p>
                <p className="text-[#5D4037]/70 dark:text-stone-400 font-medium">5,000+ Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: Arched Signature Card with Vertical Watermark */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            {/* Background Arch Panel */}
            <div className="relative z-10 w-72 sm:w-80 h-[480px] bg-[#FFF8F0] dark:bg-[#201815] rounded-t-full shadow-2xl overflow-hidden border-8 border-[#D4AF37] flex flex-col items-center justify-between p-6">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5D4037]/5 to-[#5D4037]/20 pointer-events-none" />
              
              <div className="flex flex-col items-center pt-8 text-center relative z-10">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-[#D4AF37] shadow-md">
                  <img
                    src={artisanCakeImg}
                    alt="Signature Dark Chocolate Cake"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
                  Chef's Masterpiece
                </span>
                <h3 className="font-serif text-xl sm:text-2xl italic text-[#5D4037] dark:text-[#F3E5AB]">
                  Belgian Dark Truffle
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                  Callebaut 70% Chocolate <br />
                  24k Edible Gold Leaf <br />
                  Silky Cocoa Ganache
                </p>
              </div>

              <div className="relative z-10 w-full text-center pb-4">
                <span className="font-serif text-3xl font-bold text-[#5D4037] dark:text-[#F3E5AB]">₹ 1,850</span>
                <button
                  onClick={() => onNavigate('product-details', 'vc-prod-01')}
                  className="mt-3 w-full py-2.5 bg-[#5D4037] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-stone-950 font-bold uppercase text-xs tracking-widest transition-all rounded-xl shadow-md"
                >
                  Order Signature
                </button>
              </div>
            </div>

            {/* Vertical Decorative Watermark Text */}
            <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 writing-mode-vertical text-[#5D4037]/10 dark:text-white/10 text-8xl font-serif select-none pointer-events-none font-bold tracking-widest">
              LUXE
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Same-Day Express</h4>
              <p className="text-xs text-stone-500">Order by 2 PM for evening delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">100% Pure Butter</h4>
              <p className="text-xs text-stone-500">Zero artificial preservatives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Master Pastry Chefs</h4>
              <p className="text-xs text-stone-500">Trained in Paris & Switzerland</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Live Temperature Tracking</h4>
              <p className="text-xs text-stone-500">Cold-chain insulated van delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[#D4AF37] font-semibold uppercase tracking-[0.3em] text-[11px]">
              Artisanal Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5D4037] dark:text-[#F3E5AB]">
              Crafted For Every Occasion
            </h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="mt-2 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Cakes', slug: 'cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
            { name: 'Sourdough Breads', slug: 'breads', image: 'https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&q=80&w=600' },
            { name: 'French Macarons', slug: 'macarons', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600' },
            { name: 'Pastries & Tarts', slug: 'pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' },
            { name: 'Royal Hampers', slug: 'hampers', image: heroBannerImg },
            { name: 'Gourmet Savories', slug: 'savories', image: bakeryAmbianceImg }
          ].map(cat => (
            <div
              key={cat.slug}
              onClick={() => onNavigate('shop', cat.slug)}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-[#D4AF37]/20 cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <span className="font-serif text-sm font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Signature Bestseller Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[#D4AF37] font-semibold uppercase tracking-[0.3em] text-[11px] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5D4037] dark:text-[#F3E5AB]">
              Signature Bestsellers
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Bestsellers' },
              { id: 'cakes', label: 'Cakes' },
              { id: 'breads', label: 'Sourdough' },
              { id: 'macarons', label: 'Macarons' },
              { id: 'hampers', label: 'Hampers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                  selectedCategoryTab === tab.id
                    ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
                    : 'bg-white dark:bg-[#201815] text-[#5D4037] dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#D4AF37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigateDetails={id => onNavigate('product-details', id)}
            />
          ))}
        </div>
      </section>

      {/* 5. AI Concierge Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#5D4037] via-[#3D2B25] to-[#2A1D19] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini Powered AI Sommelier
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
              Unsure Which Cake Matches Your Celebration?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl leading-relaxed">
              Our Velvet AI Concierge provides instant personalized recommendations for portion sizes based on your guest count, dietary constraints (Eggless, Vegan, Sugar-Free), and custom message inspirations.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAIModal}
                className="px-6 py-3.5 rounded-full bg-[#D4AF37] text-stone-950 font-bold text-xs sm:text-sm hover:bg-[#C5A028] transition-all flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Velvet AI Concierge</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-right">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 inline-block text-left max-w-xs">
              <p className="text-xs text-[#F3E5AB] font-bold mb-2">Prompt Inspiration:</p>
              <p className="text-xs text-stone-200 italic mb-4">
                "Recommend an eggless 1.5kg dark chocolate truffle cake for a 30th birthday party with 12 guests."
              </p>
              <div className="p-2.5 rounded-xl bg-[#D4AF37] text-stone-950 font-bold text-[11px] flex items-center justify-between">
                <span>Instant AI Response</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Atelier Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-[#D4AF37]/30 shadow-2xl">
            <img
              src={bakeryAmbianceImg}
              alt="Bakery Ambiance"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
              Our Heritage & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
              Where French Mastery Meets Indian Botanical Spices
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Founded in Mumbai, Velvet Crumbs Bakery was born from a desire to elevate everyday baking into timeless culinary art. We source 70% single-origin Belgian chocolate, genuine Kashmiri Mogra saffron, and organic stone-ground grains.
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Every loaf of sourdough is cold-fermented for 36 hours. Every macaron shell is hand-piped by master pastry artisans trained in Paris.
            </p>

            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-3 rounded-2xl bg-[#5D4037] text-[#D4AF37] text-xs font-bold hover:bg-[#4A322B] transition-colors"
            >
              Read Our Full Atelier Story
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
