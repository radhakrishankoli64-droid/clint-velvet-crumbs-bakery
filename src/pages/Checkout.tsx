import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ArrowLeft, 
  Lock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

interface CheckoutProps {
  onNavigateHome: () => void;
  onNavigateTracking: (orderId: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigateHome, onNavigateTracking }) => {
  const {
    cart,
    subtotal,
    appliedCoupon,
    couponDiscount,
    useCrumbsPoints,
    crumbsDiscount,
    deliveryFee,
    taxAmount,
    grandTotal,
    clearCart
  } = useCart();

  const { user } = useAuth();

  // Form states
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine1, setAddressLine1] = useState(user?.addresses[0]?.addressLine1 || '');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Mumbai');
  const [state, setState] = useState(user?.addresses[0]?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(user?.addresses[0]?.pincode || '400050');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('4:00 PM - 7:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'Stripe' | 'UPI' | 'COD'>('Razorpay');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const orderPayload = {
      userId: user?.id || 'guest-user',
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: {
        id: `addr-${Date.now()}`,
        fullName,
        phone,
        addressLine1,
        city,
        state,
        pincode
      },
      items: cart,
      subtotal,
      discount: couponDiscount,
      appliedCoupon: appliedCoupon?.code,
      crumbsUsed: useCrumbsPoints ? 150 : 0,
      crumbsDiscount,
      deliveryFee,
      paymentMethod,
      deliveryDate,
      deliveryTimeSlot,
      notes
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (data.success && data.order) {
        setCreatedOrder(data.order);
        clearCart();
      }
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Order Confirmed & Sent to Bakery Atelier!
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          Thank you for ordering with Velvet Crumbs Bakery, <span className="font-bold">{fullName}</span>.
        </p>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-lg text-left space-y-3">
          <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-3">
            <span className="text-xs text-stone-500">Order Number:</span>
            <span className="font-mono text-base font-bold text-[#D4AF37]">{createdOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500">Estimated Delivery:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">
              {createdOrder.deliveryDate} ({createdOrder.deliveryTimeSlot})
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500">Total Paid:</span>
            <span className="font-bold text-[#D4AF37] text-sm">₹{createdOrder.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => onNavigateTracking(createdOrder.orderNumber)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-lg hover:scale-105 transition-all"
          >
            Track Live Order Status
          </button>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-sm"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
            Secure Express Checkout
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            Complete Your Velvet Order
          </h1>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact & Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-[#F3E5AB]">
              1. Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  Phone Number (For Delivery Express SMS) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address (India Cities) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-[#F3E5AB]">
              2. Delivery Address in India
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  Flat / House No / Building / Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={e => setAddressLine1(e.target.value)}
                  placeholder="Flat 402, Sunshine Heights, Bandra West"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700 font-semibold"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Options */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-[#F3E5AB]">
              3. Select Payment Gateway
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { id: 'Razorpay', label: 'Razorpay (UPI / Cards)', desc: 'Instant GPay, PhonePe, Paytm' },
                { id: 'Stripe', label: 'Stripe Secure', desc: 'Credit & Debit Cards' },
                { id: 'UPI', label: 'Direct UPI ID', desc: 'Scan & Pay' },
                { id: 'COD', label: 'Pay on Delivery', desc: 'Cash on Express Arrival' }
              ].map(pm => (
                <div
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === pm.id
                      ? 'border-[#D4AF37] bg-[#FFF8F0] dark:bg-[#2A1D19] font-bold shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#201815]'
                  }`}
                >
                  <p className="text-stone-900 dark:text-stone-100">{pm.label}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">{pm.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-xl space-y-4 sticky top-28">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-[#F3E5AB]">
              Order Summary ({cart.length} items)
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 border-b border-stone-200 dark:border-stone-800 pb-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-stone-900 dark:text-stone-100">{item.product.name}</p>
                    <p className="text-[10px] text-stone-500">{item.selectedWeight} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#D4AF37]">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              {crumbsDiscount > 0 && (
                <div className="flex justify-between text-[#D4AF37] font-semibold">
                  <span>Crumbs Points Off</span>
                  <span>-₹{crumbsDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>GST (5%)</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline text-base font-bold text-stone-900 dark:text-[#F3E5AB]">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Payment...' : `Pay ₹${grandTotal} & Place Order`}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
