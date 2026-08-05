import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  X, 
  Edit3, 
  Trash2,
  ChefHat
} from 'lucide-react';
import { Order, Product, OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'ai-insights'>('orders');
  const [aiInsightText, setAiInsightText] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Add Product Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('cakes');
  const [newPrice, setNewPrice] = useState('1200');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resOrders, resProducts] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products?maxPrice=10000')
      ]);
      const dataOrders = await resOrders.json();
      const dataProducts = await resProducts.json();

      if (dataOrders.success) setOrders(dataOrders.orders || []);
      if (dataProducts.success) setProducts(dataProducts.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          category: newCategory,
          price: Number(newPrice),
          description: newDesc,
          image: newImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
          inStock: true,
          dietaryTags: ['eggless'],
          weightOptions: ['1.0 kg']
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewName('');
        setNewDesc('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAIInsights = async () => {
    setIsAiLoading(true);
    setAiInsightText('');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: "Act as an executive bakery consultant. Analyze today's top trends: high demand for 100% eggless Belgian chocolate truffle cakes and sourdough bread in Mumbai and Delhi. Provide 3 actionable executive recommendations for inventory stocking, weekend promotional hampers, and pricing optimization."
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiInsightText(data.reply);
      }
    } catch (err) {
      setAiInsightText("Failed to generate AI insights.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
            Velvet Crumbs Executive Suite
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            Bakery Admin Dashboard
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#D4AF37] text-stone-950 font-bold text-xs hover:bg-[#C5A028] transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bakery Item</span>
        </button>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-semibold">Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-[#F3E5AB]">₹{totalRevenue}</p>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% from last week</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-semibold">Active Kitchen Orders</span>
            <ChefHat className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-[#F3E5AB]">{orders.length}</p>
          <span className="text-[10px] text-stone-400">Orders in active baking queue</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-semibold">Bakery Items</span>
            <Package className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-[#F3E5AB]">{products.length}</p>
          <span className="text-[10px] text-stone-400">Catalog items online</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-semibold">Gemini AI Executive</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#D4AF37]">Active</p>
          <span className="text-[10px] text-stone-400">Demand Forecasting Ready</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Orders Workflow ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'inventory'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Catalog & Inventory Management
        </button>
        <button
          onClick={() => setActiveTab('ai-insights')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'ai-insights'
              ? 'bg-[#5D4037] text-[#D4AF37] shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          AI Sales & Inventory Advisor
        </button>
      </div>

      {/* 1. Orders Workflow Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#201815]">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 dark:bg-[#2A1D19] text-stone-700 dark:text-stone-300 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                    <td className="p-4 font-mono font-bold text-[#D4AF37]">{order.orderNumber}</td>
                    <td className="p-4">
                      <p className="font-bold text-stone-900 dark:text-stone-100">{order.customerName}</p>
                      <p className="text-[10px] text-stone-400">{order.customerPhone}</p>
                    </td>
                    <td className="p-4 max-w-xs truncate">
                      {order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="p-4 font-bold">₹{order.totalAmount}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={e => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700 font-bold text-xs"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Baking">Baking</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Inventory Management Tab */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="p-4 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 flex gap-3">
              <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-2xl" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{p.name}</p>
                <p className="text-[11px] font-bold text-[#D4AF37]">₹{p.price}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. AI Insights Tab */}
      {activeTab === 'ai-insights' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#D4AF37] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Gemini AI Bakery Demand & Pricing Intelligence
            </h3>
            <button
              onClick={handleGenerateAIInsights}
              disabled={isAiLoading}
              className="px-6 py-2.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B]"
            >
              {isAiLoading ? 'Analyzing Trends...' : 'Run Demand Audit'}
            </button>
          </div>

          {aiInsightText ? (
            <div className="p-6 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/20 text-xs leading-relaxed whitespace-pre-line text-stone-800 dark:text-stone-200">
              {aiInsightText}
            </div>
          ) : (
            <p className="text-xs text-stone-500">
              Click "Run Demand Audit" to generate real-time AI recommendations on inventory stock levels, best-selling eggless pastry combos, and seasonal holiday hamper pricing.
            </p>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FFF8F0] dark:bg-[#1E1715] rounded-3xl p-6 border border-[#D4AF37]/40 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-[#5D4037] dark:text-[#F3E5AB]">
                Add New Bakery Item
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Kashmiri Saffron Pistachio Tart"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700"
                  >
                    <option value="cakes">Cakes</option>
                    <option value="breads">Breads</option>
                    <option value="pastries">Pastries</option>
                    <option value="macarons">Macarons</option>
                    <option value="hampers">Hampers</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#201815] border border-stone-300 dark:border-stone-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B]"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
