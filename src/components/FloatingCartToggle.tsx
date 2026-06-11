import { ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function FloatingCartToggle() {
  const cartCount = useStore(state => state.getCartCount());
  const cartTotal = useStore(state => state.getCartTotal());
  const setCartOpen = useStore(state => state.setCartOpen);
  const lang = useStore(state => state.lang);

  return (
    <div 
      className="fixed top-1/2 right-0 -translate-y-1/2 z-[1000] cursor-pointer shadow-lg group"
      onClick={() => setCartOpen(true)}
    >
      <div className="bg-[#f58220] rounded-l py-2.5 px-2 flex flex-col items-center justify-center transition-transform group-hover:-translate-x-1">
        <ShoppingBag size={20} className="text-white mb-1" />
        <span className="text-white font-medium text-xs text-center leading-tight">
          {cartCount} {lang === 'bn' ? 'টি' : (cartCount === 1 ? 'item' : 'items')}
        </span>
      </div>
      <div className="bg-white rounded-bl border-l border-b border-[#f58220]/20 text-[#f58220] py-1.5 px-2 text-center text-xs font-bold leading-tight shadow-sm">
        ৳{cartTotal.toLocaleString()}
      </div>
    </div>
  );
}
