import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigateDetails: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigateDetails,
  onQuickView
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions[0] || 'Standard');
  const [isEggless, setIsEggless] = useState<boolean>(product.dietaryTags.includes('eggless'));

  const inWish = isInWishlist(product.id);

  return (
    <div className="group relative rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image & Badge Overlay */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer" onClick={() => onNavigateDetails(product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              Bestseller
            </span>
          )}
          {product.dietaryTags.includes('eggless') && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100 text-[10px] font-bold flex items-center gap-1 shadow-xs border border-emerald-600/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              100% Eggless
            </span>
          )}
          {product.dietaryTags.includes('vegan') && (
            <span className="px-2 py-0.5 rounded-full bg-teal-800 text-teal-100 text-[10px] font-bold shadow-xs">
              Vegan
            </span>
          )}
        </div>

        {/* Wishlist & Quick View Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all ${
              inWish
                ? 'bg-rose-600 text-white'
                : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-rose-600'
            }`}
            title="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-[#D4AF37] backdrop-blur-md shadow-lg transition-all hidden group-hover:flex"
              title="Quick view product details"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#D4AF37] font-semibold uppercase tracking-[0.25em] text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onNavigateDetails(product.id)}
            className="font-serif text-base font-bold text-[#5D4037] dark:text-[#F3E5AB] line-clamp-1 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed font-light">
            {product.shortDescription}
          </p>

          {/* Quick Weight Selector Pills */}
          {product.weightOptions.length > 1 && (
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {product.weightOptions.map(weight => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all ${
                    selectedWeight === weight
                      ? 'bg-[#5D4037] text-[#D4AF37] font-bold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-[#5D4037] dark:text-[#F3E5AB]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <p className="text-[9px] uppercase tracking-wider text-emerald-600 font-bold">Incl. all taxes</p>
          </div>

          <button
            onClick={() =>
              addToCart(product, {
                weight: selectedWeight,
                isEggless,
                quantity: 1
              })
            }
            className="px-4 py-2.5 rounded-xl bg-[#5D4037] hover:bg-[#D4AF37] text-[#FFF8F0] hover:text-stone-950 font-bold uppercase text-[10px] tracking-widest flex items-center gap-1.5 shadow-md transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
