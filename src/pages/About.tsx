import React from 'react';
import { Award, Sparkles, Heart, CheckCircle2, MapPin } from 'lucide-react';
import { bakeryAmbianceImg, artisanCakeImg, BAKERY_LOCATIONS } from '../data/mockData';

interface AboutProps {
  onNavigateShop: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateShop }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-xs">
          Our Heritage & Craft
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          The Story of Velvet Crumbs Bakery
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
          Founded in Mumbai with a single stone oven and an unyielding commitment to French pastry excellence, Velvet Crumbs has grown into India's premier luxury modern bakery atelier.
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-[#D4AF37]/30 shadow-2xl">
          <img src={bakeryAmbianceImg} alt="Bakery Atelier" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
            The 36-Hour Sourdough & 70% Belgian Chocolate Promise
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            We believe that true flavor requires time. Our wild sourdough starter has been nurtured for over 6 years, undergoing a slow 36-hour cold fermentation that breaks down gluten proteins for optimal digestion and rich tangy aroma.
          </p>
          <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Pure French Charentes-Poitou PDO Butter</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>70% Single-Origin Callebaut Belgian Dark Chocolate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Dedicated 100% Eggless & Vegan Stations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Ateliers */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-[#F3E5AB] text-center">
          Visit Our Flagship Ateliers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BAKERY_LOCATIONS.map(loc => (
            <div key={loc.id} className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#2A1D19] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-[#F3E5AB]">{loc.name}</h3>
              <p className="text-xs text-stone-500">{loc.address}</p>
              <p className="text-xs text-[#D4AF37] font-bold">{loc.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
