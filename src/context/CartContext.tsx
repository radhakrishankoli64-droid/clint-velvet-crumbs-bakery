import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, Coupon } from '../types';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (
    product: Product,
    options?: {
      weight?: string;
      isEggless?: boolean;
      customMessage?: string;
      quantity?: number;
      addOnCandles?: boolean;
      addOnTopper?: string;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  useCrumbsPoints: boolean;
  setUseCrumbsPoints: (value: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  taxAmount: number; // 5% GST
  deliveryFee: number;
  crumbsDiscount: number;
  grandTotal: number;
  totalCartItemsCount: number;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('velvet_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('velvet_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [useCrumbsPoints, setUseCrumbsPoints] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    localStorage.setItem('velvet_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velvet_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const addToCart: CartContextType['addToCart'] = (product, options) => {
    const weight = options?.weight || (product.weightOptions[0] || 'Standard');
    const isEggless = options?.isEggless ?? product.dietaryTags.includes('eggless');
    const customMessage = options?.customMessage || '';
    const quantity = options?.quantity || 1;
    const addOnCandles = options?.addOnCandles || false;
    const addOnTopper = options?.addOnTopper || '';

    // Calculate price multiplier if weight is 1.0kg or 2.0kg
    let weightMultiplier = 1;
    if (weight.includes('1.0 kg') || weight.includes('1 kg')) weightMultiplier = 1.8;
    if (weight.includes('1.5 kg')) weightMultiplier = 2.6;
    if (weight.includes('2.0 kg') || weight.includes('2 kg')) weightMultiplier = 3.4;

    const unitPrice = Math.round(product.price * weightMultiplier) + (addOnCandles ? 50 : 0);

    const existingIndex = cart.findIndex(
      item =>
        item.product.id === product.id &&
        item.selectedWeight === weight &&
        item.isEggless === isEggless &&
        item.customMessage === customMessage
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        product,
        selectedWeight: weight,
        isEggless,
        customMessage,
        quantity,
        unitPrice,
        addOnCandles,
        addOnTopper
      };
      setCart(prev => [...prev, newCartItem]);
    }

    showToast(`Added ${product.name} (${weight}) to your cart! 🍰`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setUseCrumbsPoints(false);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(p => p.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed ${product.name} from Wishlist`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.name} to Wishlist ❤️`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const applyCoupon = async (code: string) => {
    if (!code.trim()) return { success: false, message: 'Please enter a coupon code' };
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartSubtotal: subtotal })
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        setCouponDiscount(data.discountAmount);
        showToast(`Coupon ${data.coupon.code} applied! Saved ₹${data.discountAmount}`);
        return { success: true, message: `Saved ₹${data.discountAmount}!` };
      } else {
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch (err) {
      return { success: false, message: 'Failed to validate coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  // Crumbs discount (up to 150 points = ₹150 max off)
  const crumbsDiscount = useCrumbsPoints ? Math.min(150, subtotal * 0.1) : 0;
  const deliveryFee = subtotal >= 1200 || subtotal === 0 ? 0 : 99; // Free delivery over ₹1200
  const taxableSubtotal = Math.max(0, subtotal - couponDiscount - crumbsDiscount);
  const taxAmount = Math.round(taxableSubtotal * 0.05); // 5% GST
  const grandTotal = taxableSubtotal + deliveryFee + taxAmount;
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        useCrumbsPoints,
        setUseCrumbsPoints,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        taxAmount,
        deliveryFee,
        crumbsDiscount,
        grandTotal,
        totalCartItemsCount,
        toasts,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
