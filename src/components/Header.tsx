import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Search, MapPin, Phone, ShieldCheck, Menu, X, Heart } from 'lucide-react';
import { User, AdminUser } from '../types';
import logoImg from '../assets/images/mujtaba_gold_logo_1786177848393.jpg';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  wishlistCount?: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenLocation: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: { key: string; label: string }[];
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartCount,
  wishlistCount = 0,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenProfile,
  onOpenLocation,
  searchQuery,
  onSearchChange,
  categories,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navCategories = [
    { key: 'ALL COLLECTIONS', label: 'HOME' },
    { key: 'NEW ARRIVALS', label: 'NEW ARRIVALS' },
    ...categories,
    { key: 'SALE', label: 'SALE' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm transition-all">
      {/* Top Announcement Bar - Scaled & Clear */}
      <div className="bg-slate-950 text-stone-200 text-xs font-semibold tracking-[0.25em] uppercase py-2.5 px-6 sm:px-10 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Complimentary Worldwide Express Shipping on Orders over Rs. 100,000</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs text-stone-300">
          <a
            href="https://wa.me/923318858108"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp & Call: 03318858108
          </a>
          <button
            onClick={onOpenLocation}
            className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" /> Store Locator & Pickup
          </button>
        </div>
      </div>

      {/* Main Brand & Nav Bar - Scaled Up Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
        {/* Mobile Hamburger Menu Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-slate-800 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={onOpenLocation}
            className="p-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-slate-800"
            title="Store Location"
          >
            <MapPin className="w-5 h-5 text-amber-800" />
          </button>
        </div>

        {/* Center/Left Brand Identity with Scaled Logo */}
        <div
          className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
          onClick={() => onSelectCategory('ALL COLLECTIONS')}
        >
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-slate-200 p-0.5 overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src={logoImg}
              alt="Mujtaba Designer Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.3em] text-slate-950 uppercase leading-none font-ethnocentric">
              MUJTABA DESIGNER
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.5em] text-slate-500 font-semibold uppercase mt-1">
              HAUTE COUTURE
            </span>
          </div>
        </div>

        {/* Search & Actions Right Bar - Large Touch Targets */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Toggle / Expanded Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-stone-100 rounded-full px-4 py-2 border border-stone-300 shadow-inner">
                <Search className="w-4 h-4 text-stone-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search kurtas, sherwanis, sarees..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none w-44 sm:w-64"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="ml-2 text-stone-400 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2.5 sm:p-3 text-slate-800 hover:text-amber-800 transition-colors cursor-pointer rounded-xl hover:bg-stone-100"
                title="Search"
              >
                <Search className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* User Account / Profile */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 bg-stone-100 hover:bg-amber-100 px-4 py-2.5 rounded-full border border-stone-200 text-xs sm:text-sm font-bold text-slate-900 transition-all cursor-pointer shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-xs font-bold">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{user.firstName}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2.5 sm:px-4 sm:py-2.5 text-slate-800 hover:text-amber-800 transition-colors flex items-center gap-2 text-xs font-bold cursor-pointer rounded-xl hover:bg-stone-100"
              title="Sign In / Register"
            >
              <UserIcon className="w-6 h-6" />
              <span className="hidden sm:inline uppercase tracking-[0.2em] text-xs">
                Account
              </span>
            </button>
          )}

          {/* Wishlist Heart Drawer Button */}
          {onOpenWishlist && (
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 sm:p-3 text-slate-800 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer rounded-xl flex items-center gap-1.5"
              aria-label="Open Wishlist"
              title="My Favourites Wishlist"
            >
              <Heart className="w-6 h-6 text-rose-600 fill-rose-600/20" />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider text-slate-800">
                Wishlist
              </span>
              {wishlistCount > 0 && (
                <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Shopping Bag Drawer Button - Prominent */}
          <button
            onClick={onOpenCart}
            className="relative p-3 bg-slate-950 text-white hover:bg-amber-800 transition-colors cursor-pointer rounded-xl shadow-lg flex items-center gap-2"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Bag</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Category Navigation Bar - Scaled */}
      <nav className="hidden lg:block bg-stone-50/80 border-t border-stone-200/80">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-center gap-10 py-3">
          {navCategories.map((item) => {
            const isActive = activeCategory === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectCategory(item.key)}
                className={`text-xs font-bold tracking-[0.25em] uppercase transition-all py-1.5 border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-amber-800 text-amber-900 font-extrabold'
                    : 'border-transparent text-slate-700 hover:text-slate-950 hover:border-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={onOpenLocation}
            className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 hover:text-amber-950 py-1.5 flex items-center gap-1.5 cursor-pointer border-b-2 border-transparent"
          >
            <MapPin className="w-4 h-4" /> LOCATIONS
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer - Full Width & Spacious */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-stone-200 px-6 py-6 space-y-4 shadow-2xl">
          <div className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mb-3">
            LUXURY COLLECTIONS
          </div>
          {navCategories.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelectCategory(item.key);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-3 text-sm font-bold uppercase tracking-[0.2em] border-b border-stone-100 ${
                activeCategory === item.key ? 'text-amber-800 font-extrabold bg-amber-50/50 px-3 rounded-lg' : 'text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                onOpenLocation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-amber-800 font-bold py-3 px-4 bg-amber-50 rounded-xl w-full"
            >
              <MapPin className="w-5 h-5 text-amber-800" /> Store Locations & Pickup
            </button>
            <a
              href="https://wa.me/923318858108"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold py-3 px-4 bg-emerald-50 rounded-xl w-full"
            >
              <Phone className="w-5 h-5 text-emerald-700" /> WhatsApp Direct: 03318858108
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
