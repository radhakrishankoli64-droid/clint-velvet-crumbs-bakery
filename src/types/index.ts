export type ProductCategory = 
  | 'cakes' 
  | 'pastries' 
  | 'breads' 
  | 'macarons' 
  | 'hampers' 
  | 'savories';

export type DietaryTag = 'eggless' | 'gluten-free' | 'vegan' | 'sugar-free' | 'contains-egg';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number; // in INR (₹)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  shortDescription: string;
  ingredients: string[];
  weightOptions: string[]; // e.g., ["0.5 kg", "1.0 kg", "1.5 kg", "2.0 kg"]
  dietaryTags: DietaryTag[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isCustomizable?: boolean;
  inStock: boolean;
  stockCount: number;
  prepTimeHours: number;
  caloriesPerServing?: number;
  sku: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface CartItem {
  id: string; // unique cart line ID
  product: Product;
  selectedWeight: string;
  isEggless: boolean;
  customMessage?: string;
  quantity: number;
  unitPrice: number;
  addOnCandles?: boolean;
  addOnTopper?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15% or 200 for ₹200 off
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  crumbsPoints: number; // Reward points system (1 point = ₹1)
  addresses: UserAddress[];
  savedWishlistIds: string[];
}

export type OrderStatus = 
  | 'Placed' 
  | 'Baking' 
  | 'Quality Check' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: UserAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  appliedCoupon?: string;
  crumbsUsed: number;
  crumbsDiscount: number;
  deliveryFee: number;
  taxAmount: number; // GST 5%
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'Razorpay' | 'Stripe' | 'UPI' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  deliveryDate: string;
  deliveryTimeSlot: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  createdAt: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedProducts?: Product[];
}

export interface BakeryStoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  openingHours: string;
  mapEmbedUrl?: string;
}
