import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ui/ProductCard';

interface WishlistProps {
  onNavigateDetails: (id: string) => void;
  onNavigateShop: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onNavigateDetails, onNavigateShop }) => {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <Heart className="w-8 h-8 text-rose-600 fill-current" />
        <div>
          <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
            Saved Favorites
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            Your Saved Wishlist ({wishlist.length})
          </h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-[#201815] rounded-3xl border border-stone-200 dark:border-stone-800">
          <Heart className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <p className="text-base font-bold text-stone-800 dark:text-stone-200">
            Your wishlist is empty
          </p>
          <p className="text-xs text-stone-500 mb-6">
            Tap the heart icon on any cake or sourdough loaf to save it for later.
          </p>
          <button
            onClick={onNavigateShop}
            className="px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs"
          >
            Explore Bakery Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateDetails={onNavigateDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
