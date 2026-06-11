import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function CartSidebar() {
  const cartItems = useStore(state => state.cartItems);
  const isCartOpen = useStore(state => state.isCartOpen);
  const setCartOpen = useStore(state => state.setCartOpen);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getCartTotal = useStore(state => state.getCartTotal);
  const lang = useStore(state => state.lang);
  const navigate = useNavigate();

  const total = getCartTotal();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[2999] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 w-full sm:w-[380px] h-[100dvh] bg-white z-[3000] shadow-[-5px_0_30px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-5 flex justify-between items-center shrink-0">
          <h2 className="font-bold flex items-center gap-2 text-lg">
            <ShoppingBag size={20} />
            {lang === 'bn' ? '🛒 আপনার কার্ট' : '🛒 Your Cart'}
          </h2>
          <button onClick={() => setCartOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>



        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>{lang === 'bn' ? 'আপনার কার্ট খালি' : 'Your cart is empty'}</p>
              <button onClick={() => setCartOpen(false)} className="px-6 py-2 border rounded-full text-sm hover:bg-gray-50 text-gray-600">
                {lang === 'bn' ? 'পণ্য দেখুন' : 'View Products'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.packageType}`} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                  <div 
                    className="w-[50px] h-[50px] shrink-0 rounded-lg flex items-center justify-center text-2xl"
                    style={{ background: item.product.gradient }}
                  >
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{lang === 'bn' ? item.product.name : item.product.nameEn}</h4>
                    <p className="text-[13px] text-gray-500 mb-2">
                       {item.packageType === '12KG' ? (lang === 'bn' ? '১২ কেজি প্যাকেজ' : '12 KG Package') : (lang === 'bn' ? '২৪ কেজি প্যাকেজ' : '24 KG Package')} - ৳{item.product.price * (item.packageType === '12KG' ? 12 : 24)} × {item.quantity} = <span className="font-medium text-gray-800">৳{item.product.price * (item.packageType === '12KG' ? 12 : 24) * item.quantity}</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.packageType, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 border border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.packageType, item.quantity + 1)}
                          className="w-6 h-6 border border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.packageType)}
                        className="ml-auto text-gray-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t-2 border-gray-100 p-5 bg-gray-50">
            <div className="flex justify-between text-sm mb-2 text-gray-600">
              <span>{lang === 'bn' ? 'পণ্যের মোট:' : 'Subtotal:'}</span>
              <span>৳{total}</span>
            </div>
            {/* Ex: Delivery charge calculation goes here */}
            <div className="flex justify-between text-lg font-bold text-primary mt-3 pt-3 border-t border-gray-200">
              <span>{lang === 'bn' ? 'মোট:' : 'Total:'}</span>
              <span>৳{total}</span>
            </div>

            {/* Special Notice / Return Limitation Warning */}
            <div className="mt-3 bg-red-50/90 border border-red-100 rounded-lg p-2.5 text-[11px] text-gray-700 font-bangla flex gap-2">
              <span className="text-red-500 text-xs shrink-0 pt-0.5">⚠️</span>
              <div className="flex-1 leading-relaxed text-left">
                <span className="font-bold text-red-700">
                  {lang === 'bn' ? 'বিশেষ দ্রষ্টব্য: ' : 'Note: '}
                </span>
                {lang === 'bn' 
                  ? '৪ থেকে ৫ টা আম পচা থাকলে সেটা রিটার্নযোগ্য নহে।' 
                  : 'If only 4 to 5 mangoes are rotten, it is not eligible for return.'}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full mt-3 bg-primary text-white py-3 rounded-xl font-bold hover:bg-[#006b5e] transition-colors shadow-lg shadow-primary/20"
            >
              {lang === 'bn' ? 'চেকআউট করুন →' : 'Checkout →'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
