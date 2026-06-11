import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SearchModal() {
  const isSearchOpen = useStore(state => state.isSearchOpen);
  const setSearchOpen = useStore(state => state.setSearchOpen);
  const lang = useStore(state => state.lang);
  const addToCart = useStore(state => state.addToCart);
  const products = useStore(state => state.products);
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[4000] flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />
      
      {/* Search Box */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-top-4">
        <div className="flex items-center px-4 py-3 border-b flex-shrink-0">
          <Search className="text-gray-400 mr-3 hidden sm:block" />
          <input 
            autoFocus
            type="text" 
            placeholder={lang === 'bn' ? 'পণ্য খুঁজুন... (e.g., হিমসাগর, Fazli)' : 'Search products...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none w-full bg-transparent p-2 text-gray-800"
          />
          <button 
            onClick={() => setSearchOpen(false)}
            className="p-2 ml-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto w-full">
          {query.trim() !== '' && filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="p-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer" onClick={() => {
                   setSearchOpen(false);
                   const el = document.getElementById('products');
                   if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: product.gradient }}
                  >
                    {product.emoji}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-800">{lang === 'bn' ? product.name : product.nameEn}</h5>
                    <p className="text-sm text-primary font-medium">৳{product.price} /{product.unit}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.minKg);
                      alert(`${product.name} কার্টে যোগ হয়েছে!`);
                    }}
                    className="px-4 py-2 bg-primary text-white bg-opacity-10 text-primary hover:bg-opacity-100 hover:text-white rounded-lg text-sm font-bold transition-all"
                  >
                    {lang === 'bn' ? 'যোগ করুন' : 'Add'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
