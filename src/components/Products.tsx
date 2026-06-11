import ProductCard from './ProductCard';
import { useStore } from '../store/useStore';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Products({ activeCategory }: { activeCategory: string }) {
  const lang = useStore(state => state.lang);
  const products = useStore(state => state.products);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [searchQuery]);

  // Filter logic
  const filteredProducts = products.filter(product => {
    // 1. Check Category Nav
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // 2. Check Search Query
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(lowerQuery);
      const matchNameEn = product.nameEn.toLowerCase().includes(lowerQuery);
      const matchCategory = product.category.toLowerCase().includes(lowerQuery);
      const matchType = product.type.toLowerCase().includes(lowerQuery);
      return matchName || matchNameEn || matchCategory || matchType;
    }

    return true;
  });

  return (
    <section ref={sectionRef} id="products" className="pt-8 pb-16 px-4 md:px-10 bg-[#fafafa] min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-12 border-b border-gray-200 pb-2">
          <h2 className="text-[22px] md:text-[26px] font-bold text-gray-800 relative after:content-[''] after:absolute after:-bottom-[11px] after:left-0 after:w-16 after:h-[3px] after:bg-[#f58220]">
            {searchQuery 
              ? (lang === 'bn' ? `পাওয়া গেছে (${filteredProducts.length} টি)` : `Found (${filteredProducts.length} items)`)
              : (lang === 'bn' ? 'সকল পণ্য' : 'Top Selling Products')}
          </h2>
          {searchQuery ? (
            <Link 
              to="/products"
              className="flex items-center text-[#f58220] hover:text-[#e0751a] text-sm font-bold mt-4 sm:mt-0 transition-colors uppercase tracking-wide bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg"
            >
              {lang === 'bn' ? 'অনুসন্ধান মুছুন ✕' : 'Clear Search ✕'}
            </Link>
          ) : (
            <Link 
              to="/products"
              className="flex items-center text-[#f58220] hover:text-[#e0751a] text-sm font-medium mt-4 sm:mt-0 transition-colors uppercase tracking-wide"
            >
              {lang === 'bn' ? 'সব পণ্য দেখুন' : 'VIEW ALL ITEMS'} <span className="text-lg ml-1 leading-none">→</span>
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="text-6xl mb-4 opacity-30">🥭</div>
            <h3 className="text-xl font-medium text-gray-400">
              {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
