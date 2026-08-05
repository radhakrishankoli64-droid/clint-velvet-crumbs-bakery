import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, Shield, Award, Sparkles, Send } from 'lucide-react';
import { BAKERY_LOCATIONS } from '../../data/mockData';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1E1715] text-[#E8D8CE] border-t border-[#D4AF37]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Subscription Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#2A1D19] via-[#3D2B25] to-[#2A1D19] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Join Velvet Society
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
              Subscribe for Secret Tasting Menu Invitations & 10% Off
            </h3>
            <p className="mt-2 text-sm text-stone-300">
              Be the first to sample our seasonal festive hampers, artisan sourdough drops, and exclusive chef masterclasses.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3E5AB] font-medium text-sm">
                🎉 Welcome! Use code <span className="font-bold text-white uppercase bg-[#5D4037] px-2 py-0.5 rounded">VELVET10</span> for 10% OFF your first order.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-[#D4AF37]/40 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-stone-950 font-bold text-sm hover:bg-[#C5A028] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex flex-col mb-4">
              <h4 className="font-serif italic text-2xl font-bold text-[#F3E5AB]">Velvet Crumbs</h4>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Luxury Bakery Portfolio</p>
            </div>
            <p className="text-xs leading-relaxed text-stone-300 mb-4 font-light">
              Freshly Baked. Lovingly Crafted. India’s pinnacle luxury modern bakery atelier crafting Belgian dark chocolate cakes, 36-hr fermented sourdough, and French macarons.
            </p>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                +91 (022) 4900 8822
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                concierge@velvetcrumbs.in
              </p>
            </div>
          </div>

          {/* Col 2: Atelier Navigation */}
          <div>
            <h5 className="font-serif text-base font-semibold text-[#F3E5AB] mb-4">Explore Menu</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Signature Cakes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'breads')} className="hover:text-[#D4AF37] transition-colors">
                  36-hr Sourdough Loaves
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'macarons')} className="hover:text-[#D4AF37] transition-colors">
                  French Macaron Gift Boxes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'hampers')} className="hover:text-[#D4AF37] transition-colors">
                  Festive Royal Hampers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors">
                  100% Eggless & Vegan Specials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h5 className="font-serif text-base font-semibold text-[#F3E5AB] mb-4">Customer Care</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-[#D4AF37] transition-colors">
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#D4AF37] transition-colors">
                  Delivery Slots & Same-Day Express
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors">
                  Ingredients Source & Quality Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Custom Wedding Cake Consultation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#D4AF37] transition-colors">
                  Refunds & Replacements Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Locations */}
          <div>
            <h5 className="font-serif text-base font-semibold text-[#F3E5AB] mb-4">Flagship Ateliers</h5>
            <div className="space-y-3 text-xs text-stone-300">
              {BAKERY_LOCATIONS.map(loc => (
                <div key={loc.id} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {loc.name}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Velvet Crumbs Bakery Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-3 font-mono text-[11px] text-stone-400">
            <span>Accepted Payments:</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[#D4AF37]">Razorpay</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[#D4AF37]">UPI / GPay</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[#D4AF37]">Visa / MC</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[#D4AF37]">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
