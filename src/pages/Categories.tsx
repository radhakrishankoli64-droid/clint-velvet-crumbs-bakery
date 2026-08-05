import React from 'react';
import { heroBannerImg, bakeryAmbianceImg, artisanCakeImg } from '../data/mockData';

interface CategoriesProps {
  onNavigateShop: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onNavigateShop }) => {
  const categories = [
    {
      id: 'cakes',
      name: 'Signature Celebration Cakes',
      description: 'Belgian dark chocolate truffle, Kashmir saffron tres leches, and red velvet royale.',
      itemCount: 18,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'breads',
      name: '36-Hour Sourdough Loaves',
      description: 'Wild yeast starter, organic stone-ground wheat, rosemary sea salt, and multiseed.',
      itemCount: 12,
      image: 'https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'macarons',
      name: 'Hand-Piped French Macarons',
      description: 'Pistachio praline, Rose Ispahan, salted caramel, and lavender Earl Grey.',
      itemCount: 10,
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'pastries',
      name: 'French Butter Pastries & Tarts',
      description: 'Golden croissants, pain au chocolat, fresh mango fruit tarts, and eclairs.',
      itemCount: 15,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'hampers',
      name: 'Festive Royal Gift Hampers',
      description: 'Curated brass tin boxes with almond biscotti, chocolate truffles, and macaron towers.',
      itemCount: 8,
      image: heroBannerImg
    },
    {
      id: 'savories',
      name: 'Gourmet Artisanal Savories',
      description: 'Truffle mushroom quiche, spinach feta croissants, and jalapeño sourdough toast.',
      itemCount: 9,
      image: bakeryAmbianceImg
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-xs">
          Explore Velvet Collections
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Artisanal Bakery Categories
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => onNavigateShop(cat.id)}
            className="group rounded-3xl overflow-hidden bg-white dark:bg-[#201815] border border-[#D4AF37]/20 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-900">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[#D4AF37] text-xs font-bold">
                {cat.itemCount} Items
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <span className="text-xs font-bold text-[#D4AF37] group-hover:underline flex items-center gap-1">
                Explore Category →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
