import { X, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function WishlistSidebar() {
  const wishlistItems = useStore(state => state.wishlistItems);
  const isWishlistOpen = useStore(state => state.isWishlistOpen);
  const setWishlistOpen = useStore(state => state.setWishlistOpen);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const addToCart = useStore(state => state.addToCart);
  const lang = useStore(state => state.lang);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[2999] transition-opacity duration-300 ${isWishlistOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setWishlistOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 w-full sm:w-[380px] h-[100dvh] bg-white z-[3000] shadow-[-5px_0_30px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-300 ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-5 flex justify-between items-center shrink-0">
          <h2 className="font-bold flex items-center gap-2 text-lg">
            <Heart size={20} className="fill-current text-white" />
            {lang === 'bn' ? 'আপনার উইশলিস্ট' : 'Your Wishlist'}
          </h2>
          <button onClick={() => setWishlistOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Heart size={64} className="opacity-20" />
              <p>{lang === 'bn' ? 'উইশলিস্ট খালি' : 'Your wishlist is empty'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((product) => (
                <div key={product.id} className="flex gap-4 py-3 border-b border-gray-100 last:border-0 relative">
                  <div 
                    className="w-[70px] h-[70px] shrink-0 rounded-lg flex items-center justify-center text-3xl"
                    style={{ background: product.gradient }}
                  >
                    {product.emoji}
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <h4 className="font-semibold text-base truncate text-gray-800">
                      {lang === 'bn' ? product.name : product.nameEn}
                    </h4>
                    <p className="text-sm font-bold text-primary mt-1">
                      ৳{product.price} <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
                    </p>
                    <button 
                      onClick={() => {
                        addToCart(product, product.minKg === 12 ? '12KG' : '24KG');
                        toggleWishlist(product); // removed from wishlist after adding
                        alert(`${product.name} কার্টে যোগ হয়েছে!`);
                      }}
                      className="mt-2 text-xs font-bold bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1 w-max"
                    >
                      <ShoppingBag size={12} />
                      {lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                    </button>
                  </div>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-0 text-red-400 hover:text-red-600 p-1 transition-colors"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
