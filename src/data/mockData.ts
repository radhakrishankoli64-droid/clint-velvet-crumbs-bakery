import { Product, Coupon, BlogPost, BakeryStoreLocation, Review } from '../types';

export const heroBannerImg = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200';
export const artisanCakeImg = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=1000';
export const bakeryAmbianceImg = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=1000';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vc-prod-01',
    name: 'Belgian Dark Chocolate Velvet Truffle Cake',
    slug: 'belgian-dark-chocolate-velvet-truffle-cake',
    category: 'cakes',
    price: 1850,
    originalPrice: 2200,
    rating: 4.9,
    reviewCount: 142,
    image: artisanCakeImg,
    galleryImages: [
      artisanCakeImg,
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Our signature masterpiece. Handcrafted with 70% single-origin Callebaut Belgian dark chocolate mousse, silky ganache layers, and edible 24k gold leaf flakes. Delicately balanced for chocolate connoisseurs.',
    shortDescription: 'Rich 70% Belgian chocolate mousse & silky ganache with 24k gold leaf.',
    ingredients: ['70% Callebaut Dark Chocolate', 'French Butter', 'Organic Cocoa', 'Heavy Cream', 'Gold Flakes'],
    weightOptions: ['0.5 kg', '1.0 kg', '1.5 kg', '2.0 kg'],
    dietaryTags: ['eggless', 'contains-egg'],
    isBestseller: true,
    isNewArrival: false,
    isCustomizable: true,
    inStock: true,
    stockCount: 18,
    prepTimeHours: 4,
    caloriesPerServing: 380,
    sku: 'VC-CK-001'
  },
  {
    id: 'vc-prod-02',
    name: 'Royal Kashmiri Saffron & Pistachio Tres Leches',
    slug: 'kashmiri-saffron-pistachio-tres-leches',
    category: 'cakes',
    price: 1650,
    originalPrice: 1900,
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Airy sponge infused with genuine Kashmiri Mogra saffron, soaked in a luxurious blend of condensed milk, whole milk, and double cream, crowned with crushed Iranian pistachios.',
    shortDescription: 'Melt-in-mouth saffron sponge soaked in 3 spiced milks & toasted pistachios.',
    ingredients: ['Kashmiri Saffron', 'Iranian Pistachios', 'Condensed Milk', 'Cardamom', 'Cream'],
    weightOptions: ['0.5 kg', '1.0 kg', '1.5 kg'],
    dietaryTags: ['eggless'],
    isBestseller: true,
    isNewArrival: true,
    isCustomizable: true,
    inStock: true,
    stockCount: 12,
    prepTimeHours: 3,
    caloriesPerServing: 310,
    sku: 'VC-CK-002'
  },
  {
    id: 'vc-prod-03',
    name: 'Parisian Berry & Madagascar Vanilla Mille-Feuille',
    slug: 'parisian-berry-vanilla-mille-feuille',
    category: 'pastries',
    price: 480,
    originalPrice: 550,
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crisp caramelized puff pastry leaves layered with real Bourbon Madagascar vanilla bean pastry cream and fresh organic raspberries.',
    shortDescription: 'Crispy caramelized puff pastry with real vanilla bean mousseline & raspberries.',
    ingredients: ['French Butter', 'Madagascar Vanilla Pods', 'Fresh Raspberries', 'Unbleached Flour'],
    weightOptions: ['Single Slice (150g)', 'Box of 2', 'Box of 4'],
    dietaryTags: ['eggless'],
    isBestseller: false,
    isNewArrival: true,
    isCustomizable: false,
    inStock: true,
    stockCount: 25,
    prepTimeHours: 2,
    caloriesPerServing: 290,
    sku: 'VC-PS-003'
  },
  {
    id: 'vc-prod-04',
    name: 'Artisanal Golden Sourdough Loaf (36-hr Fermentation)',
    slug: 'artisanal-golden-sourdough-loaf',
    category: 'breads',
    price: 320,
    originalPrice: 380,
    rating: 4.9,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Baked fresh every dawn using a 7-year-old active wild starter. Blended stone-ground wheat, crispy blistered crust, and open airy crumb with subtle pleasant acidity.',
    shortDescription: 'Crusty, open-crumb naturally fermented sourdough starter loaf.',
    ingredients: ['Stone-ground Whole Wheat', 'Organic Starter', 'Himalayan Pink Salt', 'Filtered Water'],
    weightOptions: ['Standard 500g', 'Large 800g'],
    dietaryTags: ['vegan', 'eggless'],
    isBestseller: true,
    isNewArrival: false,
    isCustomizable: false,
    inStock: true,
    stockCount: 30,
    prepTimeHours: 36,
    caloriesPerServing: 180,
    sku: 'VC-BR-004'
  },
  {
    id: 'vc-prod-05',
    name: 'Luxury Velvet Macaron Gift Box (12 Pieces)',
    slug: 'luxury-velvet-macaron-gift-box-12',
    category: 'macarons',
    price: 1250,
    originalPrice: 1450,
    rating: 5.0,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'An assortment of 12 hand-piped French macarons featuring Rose Raspberry, Salted Butter Caramel, Earl Grey Chocolate, Matcha Pistachio, Alphonso Mango, and Lavender Vanilla.',
    shortDescription: '12 artisanal French macarons with delicate shells & rich ganache filling.',
    ingredients: ['Californian Almond Flour', 'White Chocolate Ganache', 'Rose Water', 'Salted Caramel', 'Fruit Puree'],
    weightOptions: ['Box of 12', 'Box of 24'],
    dietaryTags: ['gluten-free', 'eggless'],
    isBestseller: true,
    isNewArrival: false,
    isCustomizable: true,
    inStock: true,
    stockCount: 20,
    prepTimeHours: 5,
    caloriesPerServing: 90,
    sku: 'VC-MC-005'
  },
  {
    id: 'vc-prod-06',
    name: 'Grand Celebration Festive Royal Hamper',
    slug: 'grand-celebration-festive-royal-hamper',
    category: 'hampers',
    price: 3499,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 54,
    image: heroBannerImg,
    galleryImages: [
      heroBannerImg,
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Curated luxury hamper featuring Saffron Shortbread Cookies, Artisanal Hazelnut Spread, 6 Macarons, Spiced Almond Biscotti, Organic Sourdough Crackers, and Velvet Crumb Signature Dark Chocolate Bar.',
    shortDescription: 'Bespoke gift basket with cookies, spreads, macarons, and chocolates.',
    ingredients: ['Assorted Gourmet Bakery Products', 'Organic Honey', 'Premium Nuts'],
    weightOptions: ['Standard Gift Box', 'Deluxe Velvet Basket'],
    dietaryTags: ['eggless'],
    isBestseller: true,
    isNewArrival: true,
    isCustomizable: true,
    inStock: true,
    stockCount: 10,
    prepTimeHours: 6,
    caloriesPerServing: 450,
    sku: 'VC-HM-006'
  },
  {
    id: 'vc-prod-07',
    name: 'Truffle & Caramelized Onion Brioche Crown',
    slug: 'truffle-caramelized-onion-brioche-crown',
    category: 'savories',
    price: 620,
    originalPrice: 700,
    rating: 4.7,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Flaky, buttery French brioche baked in a woven crown, filled with slow-caramelized balsamic onions, Gruyère cheese melt, and white truffle oil drizzle.',
    shortDescription: 'Savory butter brioche crown with caramelized balsamic onions & truffle oil.',
    ingredients: ['French Butter', 'Gruyere Cheese', 'White Truffle Oil', 'Balsamic Caramelized Onions'],
    weightOptions: ['400g Crown'],
    dietaryTags: ['contains-egg'],
    isBestseller: false,
    isNewArrival: true,
    isCustomizable: false,
    inStock: true,
    stockCount: 15,
    prepTimeHours: 3,
    caloriesPerServing: 340,
    sku: 'VC-SV-007'
  },
  {
    id: 'vc-prod-08',
    name: 'Classic Alphonso Mango & Passion Fruit Opera Cake',
    slug: 'alphonso-mango-passion-fruit-opera-cake',
    category: 'cakes',
    price: 1950,
    originalPrice: 2300,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Layers of almond joconde sponge, fresh Ratnagiri Alphonso mango compote, tangy passion fruit curd, and whipped white chocolate cream.',
    shortDescription: 'Ratnagiri Alphonso mango compote & passion fruit curd layered opera cake.',
    ingredients: ['Ratnagiri Mangoes', 'Passion Fruit Curd', 'Almond Sponge', 'White Chocolate'],
    weightOptions: ['0.5 kg', '1.0 kg', '1.5 kg'],
    dietaryTags: ['eggless'],
    isBestseller: true,
    isNewArrival: false,
    isCustomizable: true,
    inStock: true,
    stockCount: 14,
    prepTimeHours: 4,
    caloriesPerServing: 320,
    sku: 'VC-CK-008'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VELVET10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 800,
    description: 'Get 10% OFF on orders above ₹800',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'LUXURY200',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 1500,
    description: 'Flat ₹200 OFF on luxury cakes & hampers',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'FIRSTCRUMB',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 500,
    maxDiscount: 350,
    description: '15% OFF for first time customers',
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Secret Behind 36-Hour Sourdough Fermentation',
    slug: 'secret-behind-36-hour-sourdough-fermentation',
    excerpt: 'Discover why our head baker ferments wild sourdough starters for 36 hours for perfect gut health and blistered crusts.',
    content: `At Velvet Crumbs Bakery, bread is not merely baked; it is cultivated with deep patience. Our sourdough starters trace back to a 7-year-old starter nurtured daily in our Mumbai test kitchen.`,
    author: {
      name: 'Chef Antoine Moreau',
      role: 'Master Boulanger',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'
    },
    category: 'Artisanal Baking',
    publishedAt: '2026-07-28',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&q=80&w=1000',
    tags: ['Sourdough', 'Fermentation', 'Healthy Baking', 'Bread']
  },
  {
    id: 'blog-2',
    title: 'How to Pair Fine Wines with Belgian Chocolate Cakes',
    slug: 'pairing-fine-wines-with-belgian-chocolate-cakes',
    excerpt: 'Elevate your dinner parties with our sommelier-guided pairing tips for dark chocolate truffles, tarts, and berry cakes.',
    content: `Dark chocolate is notorious for swamping delicate wines. However, when paired with high-tannin reds or fortified dessert wines, the combination creates pure harmony.`,
    author: {
      name: 'Meera Kapoor',
      role: 'Pastry Chef & Sommelier',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200'
    },
    category: 'Gourmet Guide',
    publishedAt: '2026-08-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
    tags: ['Wine Pairing', 'Chocolate', 'Dessert Guide', 'Fine Dining']
  }
];

export const MOCK_BLOGS = INITIAL_BLOGS;

export const BAKERY_LOCATIONS: BakeryStoreLocation[] = [
  {
    id: 'loc-1',
    name: 'Velvet Crumbs Flagship Atelier - Bandra',
    city: 'Mumbai',
    address: 'Waterfield Road, Bandra West, Mumbai - 400050',
    phone: '+91 98200 11223',
    openingHours: 'Mon - Sun: 8:00 AM - 11:00 PM',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Bandra+West+Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'loc-2',
    name: 'Velvet Crumbs Boutique - GK 1',
    city: 'Delhi NCR',
    address: 'M-Block Market, Greater Kailash 1, New Delhi - 110048',
    phone: '+91 98110 33445',
    openingHours: 'Mon - Sun: 8:30 AM - 10:30 PM',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Greater+Kailash+1+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'loc-3',
    name: 'Velvet Crumbs Atelier - Indiranagar',
    city: 'Bengaluru',
    address: '100 Feet Road, Indiranagar, Bengaluru - 560038',
    phone: '+91 98800 55667',
    openingHours: 'Mon - Sun: 8:00 AM - 11:00 PM',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Indiranagar+Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'vc-prod-01',
    userName: 'Rohan Sharma',
    rating: 5,
    title: 'Out of this world chocolate cake!',
    comment: 'Ordered the 1kg Belgian Dark Chocolate Truffle for my wife’s birthday. The gold flakes and deep cocoa flavor were absolutely divine. Delivered right on time in Bandra!',
    date: '2026-07-29',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    productId: 'vc-prod-01',
    userName: 'Priya Nambiar',
    rating: 5,
    title: 'The eggless version is unmatched!',
    comment: 'It is so rare to find an eggless cake that is this moist and rich without feeling heavy. Velvet Crumbs is now our official family bakery.',
    date: '2026-08-02',
    verifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    productId: 'vc-prod-05',
    userName: 'Ananya Mehta',
    rating: 5,
    title: 'Most authentic French macarons in India',
    comment: 'The rose raspberry and salted butter caramel flavors blew my mind. Packaging is super luxurious for gifting too.',
    date: '2026-08-04',
    verifiedPurchase: true,
    helpfulCount: 11
  }
];
