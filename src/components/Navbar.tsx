import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, User, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import TopBar from './TopBar';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const cartCount = useStore((state) => state.getCartCount());
  const setCartOpen = useStore((state) => state.setCartOpen);
  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);
  const wishlistCount = useStore((state) => state.wishlistItems.length);

  const t = {
    home: lang === 'bn' ? 'হোম' : 'Home',
    mango: lang === 'bn' ? 'ম্যাঙ্গো' : 'Mango',
    special: lang === 'bn' ? 'সিজন স্পেশাল' : 'Offer Zone',
    corporate: lang === 'bn' ? 'কর্পোরেট গিফট' : 'Corporate',
    about: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us',
    contact: lang === 'bn' ? 'যোগাযোগ' : 'Contact',
    search: lang === 'bn' ? 'এখানে খুঁজুন...' : 'Search in...',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.special, path: '/special' },
    { name: t.mango, path: '/products' },
    { name: t.corporate, path: '/corporate' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products?q=' + encodeURIComponent(searchQuery));
      setSearchQuery('');
    }
  };

  return (
    <>
      <TopBar />
      <header 
        className={`sticky top-0 z-[1000] bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_25px_rgba(0,0,0,0.12)]' : ''
        }`}
      >
        {/* Main Header Area (White Background) */}
        <div className="px-4 md:px-10 py-1 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Aam Bahar Logo" className="h-[52px] xs:h-[58px] md:h-[70px] lg:h-[80px] object-contain transition-all scale-115 md:scale-130 origin-left" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#f58220] hidden">🥭 আম বাহার</span>
          </Link>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:block flex-1 max-w-3xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <input 
                type="text" 
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100/80 rounded-full py-3.5 px-6 pr-12 outline-none focus:ring-1 focus:ring-gray-300 transition-all text-sm"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                <Search size={22} strokeWidth={1.5} />
              </button>
            </form>
          </div>

          {/* Icons Context */}
          <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
            {/* Language Switcher (Desktop) */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
               <button 
                 onClick={() => setLang('bn')} 
                 className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'bn' ? 'bg-[#033621] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
               >
                 বাং
               </button>
               <button 
                 onClick={() => setLang('en')} 
                 className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-[#033621] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
               >
                 EN
               </button>
            </div>

            {/* Track Order */}
            <Link to="/info/track-order" className="hidden lg:flex flex-col items-center cursor-pointer hover:text-[#f58220] text-gray-700 group transition-colors">
              <MapPin size={24} strokeWidth={1.5} className="mb-1 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-xs font-medium">{lang === 'bn' ? 'ট্র্যাক' : 'Track Order'}</span>
            </Link>
            


            {/* Wishlist */}
            <div 
              onClick={() => useStore.getState().setWishlistOpen(true)}
              className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#f58220] text-gray-700 relative group transition-colors"
            >
              <Heart size={24} strokeWidth={1.5} className="mb-1 group-hover:-translate-y-0.5 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#f58220] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  {wishlistCount}
                </span>
              )}
              <span className="text-xs font-medium">{lang === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}</span>
            </div>

            {/* Cart */}
            <div 
              onClick={() => setCartOpen(true)}
              className="flex flex-col items-center cursor-pointer hover:text-[#f58220] text-gray-700 relative group transition-colors"
            >
              <ShoppingCart size={24} strokeWidth={1.5} className="mb-1 group-hover:-translate-y-0.5 transition-transform" />
              <span className="absolute -top-1 -right-2 bg-[#f58220] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold border-2 border-white">
                {cartCount}
              </span>
              <span className="text-[11px] md:text-xs font-medium mt-1">{lang === 'bn' ? 'কার্ট' : 'Cart'}</span>
            </div>
            
            {/* Mobile Nav Toggle */}
            <button 
              className="md:hidden text-gray-700 hover:text-[#f58220]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only visible on small screens below header) */}
        <div className="px-4 pb-3 md:hidden">
            <form onSubmit={handleSearch} className="relative w-full">
              <input 
                type="text" 
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-full py-2.5 px-5 pr-10 outline-none focus:ring-1 focus:ring-gray-300 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </button>
            </form>
        </div>

        {/* Categories Bar (Dark Green Background) */}
        <nav className="bg-[#033621] text-white hidden md:block">
          <div className="px-4 md:px-10 overflow-x-auto hide-scrollbar whitespace-nowrap">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `block py-3 px-5 text-sm font-semibold transition-colors border-b-2 hover:bg-white/10 ${
                        isActive ? 'border-[#f58220] text-[#f58220]' : 'border-transparent text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[2000] md:hidden">
            {/* Backdrop with fade effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-md" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Slide-in Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-lg shadow-2xl flex flex-col"
            >
              <div className="p-3.5 flex justify-between items-center border-b border-gray-100 bg-[#033621] text-white">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border-2 border-[#f58220]">
                    <img src="/logo.png" alt="Aam Bahar Logo" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
                    <span className="hidden select-none">🥭</span>
                  </div>
                  <span className="font-serif font-bold text-[17px] tracking-wide text-white">{lang === 'bn' ? 'আম বাহার' : 'Aam Bahar'}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col py-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => 
                          `block px-6 py-3 border-l-4 transition-all ${
                            isActive 
                              ? 'border-[#f58220] bg-orange-50 text-[#f58220] text-base font-bold' 
                              : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-black text-[15px] font-medium'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                
                <div className="px-6 py-4 border-t border-gray-100 mt-2">

                   <Link 
                     to="/info/track-order"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="flex items-center gap-3 mb-4 cursor-pointer hover:text-[#f58220] text-gray-600 transition-colors"
                   >
                      <MapPin size={20} />
                      <span className="font-medium">{lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}</span>
                   </Link>
                   <button 
                     onClick={() => {
                       setIsMobileMenuOpen(false);
                       useStore.getState().setWishlistOpen(true);
                     }}
                     className="flex items-center gap-3 mb-6 cursor-pointer hover:text-[#f58220] text-gray-600 w-full transition-colors text-left"
                   >
                      <Heart size={20} />
                      <span className="font-medium">{lang === 'bn' ? `উইশলিস্ট (${wishlistCount})` : `Wishlist (${wishlistCount})`}</span>
                   </button>

                   {/* Language Switcher in Mobile Menu */}
                   <div className="flex bg-gray-100 rounded-md border border-gray-200 overflow-hidden w-full">
                      <button 
                        onClick={() => setLang('bn')} 
                        className={`flex-1 py-2 font-medium transition-colors ${lang === 'bn' ? 'bg-[#033621] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        বাংলা
                      </button>
                      <button 
                        onClick={() => setLang('en')} 
                        className={`flex-1 py-2 font-medium transition-colors ${lang === 'en' ? 'bg-[#033621] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        EN
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
