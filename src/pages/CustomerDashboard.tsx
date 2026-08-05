import React, { useState, useEffect } from 'react';
import { User, Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  ShoppingBag, 
  MapPin, 
  User as UserIcon, 
  Clock, 
  RefreshCw, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface CustomerDashboardProps {
  onNavigateTracking: (orderId: string) => void;
  onNavigateShop: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onNavigateTracking,
  onNavigateShop
}) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'crumbs' | 'addresses'>('orders');

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/orders?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrders(data.orders || []);
          }
        })
        .catch(err => console.error(err));
    }
  }, [user?.id]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <UserIcon className="w-12 h-12 text-[#D4AF37] mx-auto" />
        <h2 className="font-serif text-2xl font-bold">Please Login to Access Dashboard</h2>
        <button
          onClick={onNavigateShop}
          className="px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] text-xs font-bold"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#5D4037] via-[#3D2B25] to-[#2A1D19] text-white border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] text-stone-950 font-serif font-bold text-2xl flex items-center justify-center shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#F3E5AB]">{user.name}</h1>
            <p className="text-xs text-stone-300">{user.email} • {user.phone}</p>
          </div>
        </div>

        {/* Crumbs Wallet Box */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
          <div>
            <span className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold">
              Crumbs Loyalty Wallet
            </span>
            <p className="font-serif text-2xl font-bold text-[#F3E5AB]">{user.crumbsPoints} Points</p>
            <p className="text-[10px] text-emerald-400">1 Point = ₹1 Discount on Next Order</p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          My Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('crumbs')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'crumbs'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Crumbs Rewards History
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'addresses'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Saved Delivery Addresses
        </button>
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#201815] rounded-3xl border border-stone-200 dark:border-stone-800">
              <p className="text-sm font-bold text-stone-800 dark:text-stone-200">No orders placed yet.</p>
              <button
                onClick={onNavigateShop}
                className="mt-4 px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs"
              >
                Browse Bakery Menu
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 dark:border-stone-800 pb-3 gap-2">
                  <div>
                    <p className="text-xs text-stone-400">Order Number:</p>
                    <p className="font-serif text-lg font-bold text-[#D4AF37]">{order.orderNumber}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase">
                      {order.status}
                    </span>
                    <button
                      onClick={() => onNavigateTracking(order.orderNumber)}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-[#D4AF37] hover:text-stone-950 transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-stone-900 dark:text-stone-100">{item.product.name}</span>
                        <span className="text-stone-400 ml-2">({item.selectedWeight} × {item.quantity})</span>
                      </div>
                      <span className="font-bold text-[#D4AF37]">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs font-bold text-stone-900 dark:text-[#F3E5AB]">
                  <span>Total Amount Paid:</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map(addr => (
            <div key={addr.id} className="p-5 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-2">
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                {addr.fullName}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300">{addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-xs text-stone-400">Phone: {addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
