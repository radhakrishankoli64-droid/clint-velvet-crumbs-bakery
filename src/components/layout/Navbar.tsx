import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  MapPin, 
  ChevronDown,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types';

interface NavbarProps {
  onNavigate: (view: string, param?: string) => void;
  currentView: string;
  onOpenAIModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, onOpenAIModal }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalCartItemsCount, wishlist, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.products || []);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8F0]/90 dark:bg-[#1A1311]/90 border-b border-[#D4AF37]/20 transition-colors shadow-xs">
      {/* Top Banner Announcement */}
      <div className="bg-[#5D4037] dark:bg-[#2A1D19] text-[#FFF8F0] text-xs py-1.5 px-4 text-center flex items-center justify-center gap-4 font-medium tracking-wide">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
          Express Same-Day Delivery in Mumbai, Delhi NCR & Bengaluru
        </span>
        <span className="hidden md:inline text-[#D4AF37]">|</span>
        <span className="hidden md:flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          100% Eggless & Vegan Options Available
        </span>
        <span className="hidden md:inline text-[#D4AF37]">|</span>
        <span className="text-[#D4AF37] font-semibold hover:underline cursor-pointer" onClick={() => onNavigate('shop')}>
          Use Code VELVET10 for 10% OFF
        </span>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex flex-col cursor-pointer group" onClick={() => onNavigate('home')}>
          <h1 className="text-2xl sm:text-3xl font-serif italic tracking-tight text-[#5D4037] dark:text-[#F3E5AB]">
            Velvet Crumbs
          </h1>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Luxury Bakery Portfolio
          </p>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#5D4037] dark:text-[#E8D8CE]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'home' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Shop
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'shop' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Artisanal Menu
          </button>
          <button
            onClick={() => onNavigate('categories')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'categories' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Categories
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'about' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigate('blog')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'blog' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Journal
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#D4AF37] ${currentView === 'contact' ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] pb-1' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Actions (Search, AI Assistant, Wishlist, Cart, Profile, Theme) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Concierge Button */}
          <button
            onClick={onOpenAIModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            title="Velvet AI Bakery Assistant"
          >
            <Sparkles className="w-4 h-4 text-amber-100 animate-pulse" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full text-[#5D4037] dark:text-[#E8D8CE] hover:bg-[#5D4037]/10 dark:hover:bg-[#FFF8F0]/10 transition-colors"
            title="Search bakery items"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => onNavigate('wishlist')}
            className="p-2 rounded-full text-[#5D4037] dark:text-[#E8D8CE] hover:bg-[#5D4037]/10 dark:hover:bg-[#FFF8F0]/10 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full text-[#5D4037] dark:text-[#E8D8CE] hover:bg-[#5D4037]/10 dark:hover:bg-[#FFF8F0]/10 transition-colors relative"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {totalCartItemsCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[#5D4037] dark:text-[#F3E5AB] hover:bg-[#5D4037]/10 dark:hover:bg-[#FFF8F0]/10 transition-colors"
            title="Toggle Light / Dark Luxury Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Account Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1 p-1.5 rounded-full border border-[#D4AF37]/30 text-[#5D4037] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <UserIcon className="w-5 h-5" />
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-xl py-2 z-50 text-sm">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800">
                      <p className="font-semibold text-stone-900 dark:text-stone-100">{user.name}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{user.email}</p>
                      <div className="mt-1 flex items-center justify-between text-xs text-[#D4AF37] font-medium">
                        <span>Crumbs Balance:</span>
                        <span className="font-bold">{user.crumbsPoints} pts</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                    >
                      Customer Dashboard
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-[#D4AF37] font-medium"
                      >
                        Admin Portal
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-rose-600 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="p-3">
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">Login to manage orders & earn Crumbs points.</p>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('login');
                      }}
                      className="w-full py-2 rounded-xl bg-[#5D4037] text-white text-xs font-semibold hover:bg-[#4A322B] transition-colors"
                    >
                      Login / Sign Up
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden rounded-lg text-[#5D4037] dark:text-[#E8D8CE]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Floating Search Bar Drawer */}
      {isSearchOpen && (
        <div className="border-t border-[#D4AF37]/20 bg-[#FFF8F0] dark:bg-[#1A1311] p-4 shadow-lg">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search chocolate cakes, sourdough, French macarons, eggless pastries..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-[#D4AF37]/40 bg-white dark:bg-[#2A1D19] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              autoFocus
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Live Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#201815] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                {searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      onNavigate('product-details', p.id);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer transition-colors border-b border-stone-100 dark:border-stone-800 last:border-0"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">{p.name}</p>
                      <p className="text-xs text-[#D4AF37] font-semibold">₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#FFF8F0] dark:bg-[#1A1311] px-6 py-6 flex flex-col gap-4 text-base font-medium text-[#5D4037] dark:text-[#E8D8CE]">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('home');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('shop');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Artisanal Shop
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('categories');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Categories
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('about');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Our Atelier Story
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('tracking');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Track Order Status
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('contact');
            }}
            className="text-left py-2 border-b border-stone-200 dark:border-stone-800"
          >
            Store Locations & Contact
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAIModal();
            }}
            className="text-left py-3.5 px-4 rounded-xl bg-[#5D4037] text-[#D4AF37] font-semibold flex items-center justify-between"
          >
            <span>Velvet AI Concierge</span>
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </button>
        </div>
      )}
    </header>
  );
};
