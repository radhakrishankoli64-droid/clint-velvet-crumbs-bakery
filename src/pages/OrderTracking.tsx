import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, Truck, ChefHat, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  initialOrderId?: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ initialOrderId = 'VC-89241' }) => {
  const [searchId, setSearchId] = useState<string>(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialOrderId) {
      handleSearchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearchOrder = async (idToSearch?: string) => {
    const query = idToSearch || searchId;
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/orders/${query}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setErrorMsg(`Order '${query}' not found. Please verify your order number (e.g. VC-89241).`);
      }
    } catch (err) {
      setErrorMsg('Failed to fetch order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps: { status: OrderStatus; label: string; icon: any }[] = [
    { status: 'Placed', label: 'Order Confirmed', icon: CheckCircle2 },
    { status: 'Baking', label: 'Artisanal Baking', icon: ChefHat },
    { status: 'Quality Check', label: 'Quality Check', icon: ShieldCheck },
    { status: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
    { status: 'Delivered', label: 'Delivered', icon: CheckCircle2 }
  ];

  const getStepIndex = (status?: OrderStatus) => {
    switch (status) {
      case 'Placed': return 0;
      case 'Baking': return 1;
      case 'Quality Check': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Bar Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
          Live Bakery Tracker
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Track Your Order
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm">
          Enter your 5-digit Velvet Crumbs order ID (e.g. <span className="font-bold text-[#D4AF37]">VC-89241</span>)
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearchOrder();
          }}
          className="flex gap-2 pt-2"
        >
          <input
            type="text"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="e.g. VC-89241"
            className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-[#201815] border border-[#D4AF37]/40 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs sm:text-sm hover:bg-[#4A322B] shadow-md"
          >
            Track Status
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="py-12 text-center text-stone-500 text-sm">
          Fetching live tracking updates from Bandra Atelier...
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2 max-w-md mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {order && !isLoading && (
        <div className="space-y-8">
          {/* Status Header Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 gap-2">
              <div>
                <p className="text-xs text-stone-400">Order Reference:</p>
                <h3 className="font-serif text-2xl font-bold text-[#D4AF37]">{order.orderNumber}</h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-stone-400">Current Status:</p>
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Timeline Progress Bar */}
            <div className="pt-4 pb-2">
              <div className="relative flex items-center justify-between">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx <= currentStepIdx;
                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-110'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 mt-2 text-center max-w-[70px]">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Partner Info */}
            <div className="p-4 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Velvet Cold-Chain Express</p>
                  <p className="text-stone-500">Insulated temperature van delivery</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-stone-500">Scheduled Slot:</p>
                <p className="font-bold text-[#D4AF37]">{order.deliveryDate} ({order.deliveryTimeSlot})</p>
              </div>
            </div>
          </div>

          {/* Tracking Activity Log */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-[#F3E5AB]">
              Live Kitchen & Logistics Log
            </h3>
            <div className="space-y-3 text-xs">
              {order.trackingHistory.map((hist, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-stone-50 dark:bg-[#2A1D19]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">{hist.status}</p>
                    <p className="text-stone-600 dark:text-stone-300 mt-0.5">{hist.note}</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      {new Date(hist.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
