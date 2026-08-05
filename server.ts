import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_BLOGS, INITIAL_REVIEWS } from './src/data/mockData.js';
import { Product, Order, User, Coupon, OrderStatus } from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-Memory Database collections
let productsStore: Product[] = [...INITIAL_PRODUCTS];
let couponsStore: Coupon[] = [...INITIAL_COUPONS];
let reviewsStore = [...INITIAL_REVIEWS];

let usersStore: User[] = [
  {
    id: 'user-admin',
    name: 'Executive Chef Velvet',
    email: 'admin@velvetcrumbs.in',
    phone: '+91 98200 99999',
    role: 'admin',
    crumbsPoints: 1250,
    addresses: [
      {
        id: 'addr-admin-1',
        fullName: 'Executive Chef Velvet',
        phone: '+91 98200 99999',
        addressLine1: 'Velvet Crumbs Studio, Waterfield Rd',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true
      }
    ],
    savedWishlistIds: ['vc-prod-01', 'vc-prod-05']
  },
  {
    id: 'user-demo',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    crumbsPoints: 350,
    addresses: [
      {
        id: 'addr-demo-1',
        fullName: 'Ananya Sharma',
        phone: '+91 98765 43210',
        addressLine1: 'Flat 402, Sunshine Apartments, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true
      }
    ],
    savedWishlistIds: ['vc-prod-02']
  }
];

let ordersStore: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'VC-89241',
    userId: 'user-demo',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@example.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-demo-1',
      fullName: 'Ananya Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Sunshine Apartments, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true
    },
    items: [
      {
        id: 'cart-item-1',
        product: INITIAL_PRODUCTS[0],
        selectedWeight: '1.0 kg',
        isEggless: true,
        customMessage: 'Happy 30th Birthday Ananya!',
        quantity: 1,
        unitPrice: 1850,
        addOnCandles: true,
        addOnTopper: 'Golden 30'
      }
    ],
    subtotal: 1850,
    discount: 185,
    appliedCoupon: 'VELVET10',
    crumbsUsed: 0,
    crumbsDiscount: 0,
    deliveryFee: 0,
    taxAmount: 83.25,
    totalAmount: 1748.25,
    status: 'Baking',
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliveryTimeSlot: '4:00 PM - 7:00 PM',
    trackingHistory: [
      {
        status: 'Placed',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        note: 'Order confirmed and sent to Bandra Bakery Atelier.'
      },
      {
        status: 'Baking',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        note: 'Master Baker preparing 70% Belgian chocolate mousse.'
      }
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    notes: 'Please leave with security if unavailable.'
  }
];

// Initialize Gemini Client
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// API ROUTE HANDLERS

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    brand: 'Velvet Crumbs Bakery',
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// 2. Products API
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, dietary, minPrice, maxPrice, sort, isBestseller } = req.query;

  let result = [...productsStore];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (dietary && dietary !== 'all') {
    result = result.filter(p => p.dietaryTags.includes(dietary as any));
  }

  if (isBestseller === 'true') {
    result = result.filter(p => p.isBestseller);
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(i => i.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // Sorting
  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }

  res.json({ success: true, count: result.length, products: result });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = productsStore.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const related = productsStore
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const reviews = reviewsStore.filter(r => r.productId === product.id);

  res.json({ success: true, product, related, reviews });
});

// Admin Product Create
app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    id: `vc-prod-${Date.now()}`,
    sku: `VC-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
    rating: 5.0,
    reviewCount: 0,
    galleryImages: [req.body.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000'],
    ...req.body
  };
  productsStore.unshift(newProduct);
  res.status(201).json({ success: true, product: newProduct });
});

// Admin Product Update
app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = productsStore.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  productsStore[index] = { ...productsStore[index], ...req.body };
  res.json({ success: true, product: productsStore[index] });
});

// Admin Product Delete
app.delete('/api/products/:id', (req: Request, res: Response) => {
  productsStore = productsStore.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Product removed' });
});

// 3. User Auth & Profile API
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, role } = req.body;
  let user = usersStore.find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: role === 'admin' ? 'admin' : 'customer',
      crumbsPoints: 100, // 100 welcome points!
      addresses: [],
      savedWishlistIds: []
    };
    usersStore.push(user);
  }

  res.json({
    success: true,
    user,
    token: `jwt_token_velvet_${user.id}`
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.json({ success: false, user: null });
  }
  const userId = token.replace('jwt_token_velvet_', '');
  const user = usersStore.find(u => u.id === userId) || usersStore[1];
  res.json({ success: true, user });
});

// 4. Coupons Validation
app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, cartSubtotal } = req.body;
  const coupon = couponsStore.find(c => c.code.toUpperCase() === code?.toUpperCase() && c.isActive);

  if (!coupon) {
    return res.status(400).json({ success: false, message: 'Invalid or expired coupon code.' });
  }

  if (cartSubtotal < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount for code ${coupon.code} is ₹${coupon.minOrderValue}`
    });
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = (cartSubtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else {
    discountAmount = coupon.discountValue;
  }

  res.json({
    success: true,
    coupon,
    discountAmount
  });
});

// 5. Orders API
app.get('/api/orders', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    const userOrders = ordersStore.filter(o => o.userId === userId);
    return res.json({ success: true, orders: userOrders });
  }
  res.json({ success: true, orders: ordersStore });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = ordersStore.find(
    o => o.id === req.params.id || o.orderNumber.toLowerCase() === req.params.id.toLowerCase()
  );
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, order });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    items,
    subtotal,
    discount,
    appliedCoupon,
    crumbsUsed,
    crumbsDiscount,
    deliveryFee,
    paymentMethod,
    deliveryDate,
    deliveryTimeSlot,
    notes
  } = req.body;

  const taxAmount = Number(((subtotal - discount - crumbsDiscount) * 0.05).toFixed(2));
  const totalAmount = Number((subtotal - discount - crumbsDiscount + deliveryFee + taxAmount).toFixed(2));
  const orderNum = `VC-${Math.floor(10000 + Math.random() * 90000)}`;

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    userId: userId || 'guest-user',
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    items,
    subtotal,
    discount: discount || 0,
    appliedCoupon,
    crumbsUsed: crumbsUsed || 0,
    crumbsDiscount: crumbsDiscount || 0,
    deliveryFee: deliveryFee || 0,
    taxAmount,
    totalAmount,
    status: 'Placed',
    paymentMethod: paymentMethod || 'Razorpay',
    paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
    deliveryDate: deliveryDate || new Date().toISOString().split('T')[0],
    deliveryTimeSlot: deliveryTimeSlot || '2:00 PM - 5:00 PM',
    trackingHistory: [
      {
        status: 'Placed',
        timestamp: new Date().toISOString(),
        note: 'Order successfully placed. Received by Velvet Crumbs Kitchen.'
      }
    ],
    createdAt: new Date().toISOString(),
    notes
  };

  ordersStore.unshift(newOrder);

  // Reward Crumbs Loyalty Points (+5% of order subtotal as points)
  if (userId) {
    const user = usersStore.find(u => u.id === userId);
    if (user) {
      const earnedPoints = Math.floor(subtotal * 0.05);
      user.crumbsPoints = (user.crumbsPoints || 0) - (crumbsUsed || 0) + earnedPoints;
    }
  }

  res.status(201).json({
    success: true,
    order: newOrder,
    message: `Order ${orderNum} created successfully!`
  });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status, note } = req.body as { status: OrderStatus; note?: string };
  const order = ordersStore.find(o => o.id === req.params.id || o.orderNumber === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = status;
  order.trackingHistory.push({
    status,
    timestamp: new Date().toISOString(),
    note: note || `Order status updated to ${status}`
  });

  res.json({ success: true, order });
});

// 6. AI Bakery Assistant ("Velvet AI Concierge") with Gemini API
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    if (!genAI) {
      // Fallback mock response if GEMINI_API_KEY isn't set yet
      return res.json({
        success: true,
        reply: `Welcome to Velvet Crumbs Bakery! 🍰 I'm your AI Bakery Concierge. For the prompt "${prompt}", I highly recommend our signature Belgian Dark Chocolate Velvet Truffle Cake (100% Eggless available) or our Royal Kashmiri Saffron Tres Leches. Would you like me to guide you on portion sizes or dietary options?`,
        suggestedProducts: [productsStore[0], productsStore[1]]
      });
    }

    const availableProductsSummary = productsStore
      .map(
        p =>
          `- ${p.name} (₹${p.price}, Category: ${p.category}, Tags: ${p.dietaryTags.join(', ')}, Short: ${p.shortDescription})`
      )
      .join('\n');

    const systemInstruction = `You are "Velvet AI Concierge", the elite, warm, and highly knowledgeable AI Sommelier and Concierge for Velvet Crumbs Bakery — India's premier luxury modern bakery brand.

Brand Tone: Sophisticated, courteous, mouth-watering, helpful, and elegant.
Currency: INR (₹)
City coverage: Express same-day delivery in Mumbai, Delhi NCR, and Bengaluru.

Current Product Catalog:
${availableProductsSummary}

Key Bakery Rules:
1. Portion advice: 0.5 kg serves 4-5 guests; 1.0 kg serves 8-10 guests; 2.0 kg serves 15-20 guests.
2. Dietary expertise: Highlight eggless options clearly, as well as gluten-free macarons or vegan sourdough breads.
3. Recommend specific products from our catalog when relevant.
4. Keep answers concise, helpful, formatted with clean bullet points and polite bakery hospitality.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const replyText = response.text || "I'd be delighted to assist you with your cake and pastry selections today!";

    // Find suggested products based on response
    const suggested = productsStore.filter(p =>
      replyText.toLowerCase().includes(p.name.toLowerCase().slice(0, 15))
    );

    res.json({
      success: true,
      reply: replyText,
      suggestedProducts: suggested.length > 0 ? suggested : [productsStore[0], productsStore[4]]
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process AI Bakery Assistant request',
      error: error.message
    });
  }
});

// Vite Middleware for development OR static serving in production
async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍰 Velvet Crumbs Bakery Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
