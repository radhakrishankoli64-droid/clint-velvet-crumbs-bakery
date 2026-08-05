import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Star, X, Check } from 'lucide-react';
import { Product, ProductCategory, DietaryTag } from '../types';
import { ProductCard } from '../components/ui/ProductCard';

interface ShopProps {
  initialCategory?: string;
  onNavigateDetails: (productId: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ initialCategory = 'all', onNavigateDetails }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedDietary, priceRange, sortBy]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let url = `/api/products?category=${selectedCategory}&dietary=${selectedDietary}&maxPrice=${priceRange}&sort=${sortBy}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
          Velvet Crumbs Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Artisanal Bakery Shop
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm">
          Freshly baked every morning with pure French butter, Callebaut Belgian chocolate, and stone-ground grains.
        </p>
      </div>

      {/* Top Controls: Search Bar & Filters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search cakes, sourdough, macarons..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-100 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                fetchProducts();
              }}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-stone-500 font-medium shrink-0">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none"
          >
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filter Options */}
        <aside className="lg:col-span-3 space-y-6 bg-white dark:bg-[#201815] p-6 rounded-3xl border border-[#D4AF37]/20 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-[#F3E5AB] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              Filter Catalog
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setPriceRange(5000);
                setSearchQuery('');
              }}
              className="text-[11px] text-[#D4AF37] font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'cakes', label: 'Celebration Cakes' },
                { id: 'breads', label: 'Sourdough Breads' },
                { id: 'pastries', label: 'Pastries & Tarts' },
                { id: 'macarons', label: 'French Macarons' },
                { id: 'hampers', label: 'Festive Hampers' },
                { id: 'savories', label: 'Gourmet Savories' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#5D4037] text-[#D4AF37] font-bold shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Filter */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
              Dietary Preference
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Preferences' },
                { id: 'eggless', label: '100% Eggless' },
                { id: 'vegan', label: 'Vegan Options' },
                { id: 'gluten-free', label: 'Gluten-Free' }
              ].map(diet => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDietary(diet.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedDietary === diet.id
                      ? 'bg-emerald-800 text-emerald-100 font-bold shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-stone-700 dark:text-stone-300">Max Price:</span>
              <span className="text-[#D4AF37]">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹300</span>
              <span>₹5,000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 rounded-3xl bg-stone-200 dark:bg-stone-800 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="p-16 text-center bg-white dark:bg-[#201815] rounded-3xl border border-stone-200 dark:border-stone-800">
              <p className="text-base font-bold text-stone-800 dark:text-stone-200 mb-2">
                No bakery items match your selected filters.
              </p>
              <p className="text-xs text-stone-500 mb-6">
                Try widening your price range or switching category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                  setPriceRange(5000);
                }}
                className="px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigateDetails={onNavigateDetails}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
