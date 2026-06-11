import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Home, ShoppingBag, Heart, Search } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const lang = useStore(state => state.lang);
  
  const cartCount = useStore(state => state.getCartCount());
  const wishlistCount = useStore(state => state.wishlistItems.length);
  
  const setCartOpen = useStore(state => state.setCartOpen);
  const setWishlistOpen = useStore(state => state.setWishlistOpen);
  const setSearchOpen = useStore(state => state.setSearchOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] z-[4000] lg:hidden safe-bottom-padding select-none">
      <div className="flex justify-around items-center h-[50px] max-w-md mx-auto px-2">
        {/* Home Tab */}
        <Link 
          id="mobile-nav-home"
          to="/" 
          className="flex flex-col items-center justify-center flex-1 h-full text-center transition-colors relative"
        >
          <div className={`p-0.5 rounded-xl transition-all ${isActive('/') ? 'text-[#f58220]' : 'text-gray-400 hover:text-gray-600'}`}>
            <Home size={19} className={isActive('/') ? 'scale-110 transition-transform' : ''} />
          </div>
          <span className={`text-[9px] font-medium leading-none font-sans mt-0.5 ${isActive('/') ? 'text-[#f58220] font-bold' : 'text-gray-400'}`}>
            {lang === 'bn' ? 'হোম' : 'Home'}
          </span>
          {isActive('/') && (
            <span className="absolute bottom-0.5 w-1 h-1 bg-[#f58220] rounded-full"></span>
          )}
        </Link>

        {/* Search Tab */}
        <button 
          id="mobile-nav-search"
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full text-center transition-colors relative"
        >
          <div className="p-0.5 rounded-xl text-gray-400 hover:text-gray-600">
            <Search size={19} />
          </div>
          <span className="text-[9px] font-medium leading-none font-sans mt-0.5 text-gray-400">
            {lang === 'bn' ? 'খুঁজুন' : 'Search'}
          </span>
        </button>

        {/* Cart Tab */}
        <button 
          id="mobile-nav-cart"
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full text-center transition-colors relative"
        >
          <div className="p-0.5 rounded-xl text-gray-400 hover:text-gray-600 relative">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f58220] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white animate-bounce-short">
                {lang === 'bn' ? cartCount.toLocaleString('bn') : cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium leading-none font-sans mt-0.5 text-gray-400">
            {lang === 'bn' ? 'কার্ট' : 'Cart'}
          </span>
        </button>

        {/* Wishlist Tab */}
        <button 
          id="mobile-nav-wishlist"
          onClick={() => setWishlistOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full text-center transition-colors relative"
        >
          <div className="p-0.5 rounded-xl text-gray-400 hover:text-gray-600 relative">
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                {lang === 'bn' ? wishlistCount.toLocaleString('bn') : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium leading-none font-sans mt-0.5 text-gray-400">
            {lang === 'bn' ? 'পছন্দ' : 'Wishlist'}
          </span>
        </button>
      </div>

      {/* Style block to support safe bottom bar padding for modern notch devices (iOS / Android) */}
      <style>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-bottom-padding {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-short {
          animation: bounce-short 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
