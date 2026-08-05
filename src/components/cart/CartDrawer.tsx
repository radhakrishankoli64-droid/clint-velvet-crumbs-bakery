import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Check, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartDrawerProps {
  onNavigateCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    useCrumbsPoints,
    setUseCrumbsPoints,
    crumbsDiscount
  } = useCart();

  const { user } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const result = await applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F0] dark:bg-[#1E1715] shadow-2xl flex flex-col border-l border-[#D4AF37]/30 text-stone-900 dark:text-stone-100">
          {/* Header */}
          <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-white dark:bg-[#2A1D19]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-xl font-bold text-[#5D4037] dark:text-[#F3E5AB]">
                Your Velvet Basket ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
                  Your basket is currently empty
                </h3>
                <p className="text-xs text-stone-500 mt-1 mb-6">
                  Indulge in our freshly baked Belgian dark chocolate cakes, croissants, and French macarons.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] text-xs font-bold shadow-md hover:bg-[#4A322B]"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 shadow-xs flex gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weight & Eggless badges */}
                    <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                        {item.selectedWeight}
                      </span>
                      {item.isEggless && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                          Eggless
                        </span>
                      )}
                    </div>

                    {/* Custom Message preview if present */}
                    {item.customMessage && (
                      <p className="mt-1 text-[11px] italic text-[#D4AF37] bg-[#FFF8F0] dark:bg-[#2A1D19] p-1.5 rounded-lg border border-[#D4AF37]/20">
                        "{item.customMessage}"
                      </p>
                    )}

                    {/* Quantity controls & Price */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-stone-900 dark:text-[#F3E5AB]">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupons & Loyalty Redemption (Visible if cart has items) */}
            {cart.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                {/* Coupon Box */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span> applied
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                          Saving ₹{couponDiscount}
                        </p>
                      </div>
                    </div>
                    <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. VELVET10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

                {/* Crumbs Loyalty Points */}
                {user && user.crumbsPoints > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-200">
                          Redeem Crumbs Loyalty Points
                        </p>
                        <p className="text-[10px] text-stone-500">
                          Balance: {user.crumbsPoints} pts (Save up to ₹150)
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={useCrumbsPoints}
                      onChange={e => setUseCrumbsPoints(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white dark:bg-[#201815] border-t border-[#D4AF37]/20 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              {crumbsDiscount > 0 && (
                <div className="flex justify-between text-[#D4AF37] font-semibold">
                  <span>Crumbs Points Discount</span>
                  <span>-₹{crumbsDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Estimated GST (5%)</span>
                <span>₹{taxAmount}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline font-bold text-base text-stone-900 dark:text-[#F3E5AB]">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateCheckout();
                }}
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
