import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Check, 
  Calendar,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ui/ProductCard';

interface ProductDetailsProps {
  productId: string;
  onNavigateDetails: (id: string) => void;
  onNavigateShop: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  onNavigateDetails,
  onNavigateShop
}) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [addOnCandles, setAddOnCandles] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliverySlot, setDeliverySlot] = useState<string>('2:00 PM - 5:00 PM');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Review submission state
  const [newRating, setNewRating] = useState<number>(5);
  const [newReviewTitle, setNewReviewTitle] = useState<string>('');
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.product) {
          setProduct(data.product);
          setActiveImage(data.product.image);
          setSelectedWeight(data.product.weightOptions[0] || 'Standard');
          setIsEggless(data.product.dietaryTags.includes('eggless'));
          setRelated(data.related || []);
          setReviews(data.reviews || []);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Preparing luxury bakery details...</p>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, {
      weight: selectedWeight,
      isEggless,
      customMessage,
      quantity,
      addOnCandles
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !newReviewComment) return;

    const addedRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: reviewerName,
      rating: newRating,
      title: newReviewTitle || 'Wonderful taste!',
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      helpfulCount: 0
    };

    setReviews(prev => [addedRev, ...prev]);
    setNewReviewTitle('');
    setNewReviewComment('');
    setReviewerName('');
    showToast('Thank you for submitting your review! ⭐');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <button onClick={onNavigateShop} className="hover:text-[#D4AF37]">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="capitalize">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-[#D4AF37]/30 shadow-xl bg-stone-100 dark:bg-stone-900">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                inWish
                  ? 'bg-rose-600 text-white'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {product.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === img ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Customization & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">({reviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
              {product.name}
            </h1>
            <p className="text-xs text-stone-400 mt-1">SKU: {product.sku}</p>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Inclusive of GST (5%)
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* 1. Weight Selector */}
          {product.weightOptions.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 mb-2">
                Select Size / Weight:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.weightOptions.map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedWeight === w
                        ? 'bg-[#5D4037] text-[#D4AF37] border-[#D4AF37] shadow-xs'
                        : 'bg-stone-50 dark:bg-[#201815] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Eggless Choice Toggle */}
          <div className="p-3.5 rounded-2xl bg-[#FFF8F0] dark:bg-[#201815] border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">100% Eggless Recipe</p>
                <p className="text-[10px] text-stone-500">Prepared in a dedicated eggless bakery station</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isEggless}
              onChange={e => setIsEggless(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
          </div>

          {/* 3. Custom Text Message on Cake */}
          {product.isCustomizable && (
            <div>
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 mb-1.5">
                Custom Message on Cake (Optional):
              </label>
              <input
                type="text"
                maxLength={35}
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                placeholder="e.g. 'Happy 30th Birthday Ananya!'"
                className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">Max 35 characters • Hand-piped in dark chocolate</span>
            </div>
          )}

          {/* Add-ons */}
          <div className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              id="candles"
              checked={addOnCandles}
              onChange={e => setAddOnCandles(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="candles" className="text-stone-700 dark:text-stone-300 cursor-pointer">
              Add Birthday Sparkler Candles (+₹50)
            </label>
          </div>

          {/* Delivery Schedule Picker */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-3">
            <p className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Select Express Delivery Schedule:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Date:</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Time Slot:</label>
                <select
                  value={deliverySlot}
                  onChange={e => setDeliverySlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700 text-xs"
                >
                  <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
                  <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM</option>
                  <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM (Express)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quantity & Add To Cart Button */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-2xl p-1 bg-white dark:bg-[#201815]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Velvet Basket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients & Reviews Tabs */}
      <div className="space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Ingredients & Artisanal Prep */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-[#F3E5AB]">
              Artisanal Ingredients & Preparation
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 text-xs font-medium text-[#5D4037] dark:text-[#F3E5AB]"
                >
                  {ing}
                </span>
              ))}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Prepared by master pastry chefs in our temperature-controlled ateliers. Contains no artificial trans-fats, synthetic food colorings, or high-fructose corn syrup.
            </p>
          </div>

          {/* Right: Submit Review Form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-[#F3E5AB]">
              Write a Verified Customer Review
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  placeholder="Your Name"
                  className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs"
                />
                <select
                  value={newRating}
                  onChange={e => setNewRating(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs font-bold text-amber-500"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>
              <input
                type="text"
                value={newReviewTitle}
                onChange={e => setNewReviewTitle(e.target.value)}
                placeholder="Review Headline (e.g. 'Unbelievably delicious!')"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs"
              />
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Share your experience with texture, flavor, and delivery..."
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B]"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            Customer Reviews ({reviews.length})
          </h3>
          <div className="space-y-3">
            {reviews.map(r => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">{r.userName}</span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{r.rating}.0</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">{r.title}</p>
                <p className="text-xs text-stone-600 dark:text-stone-400">{r.comment}</p>
                <div className="flex items-center gap-2 text-[10px] text-stone-400 pt-1">
                  <span>{r.date}</span>
                  {r.verifiedPurchase && <span className="text-emerald-600 font-bold">✓ Verified Purchase</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
          <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            Pairs Perfectly With
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(relProd => (
              <ProductCard
                key={relProd.id}
                product={relProd}
                onNavigateDetails={onNavigateDetails}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
