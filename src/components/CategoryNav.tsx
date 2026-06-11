import { useStore } from '../store/useStore';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryNav({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (f: string) => void }) {
  const lang = useStore(state => state.lang);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'himsagar', label: lang === 'bn' ? 'হিমসাগর' : 'Himsagar', icon: '🥭' },
    { id: 'langra', label: lang === 'bn' ? 'ল্যাংড়া' : 'Langra', icon: '🥭' },
    { id: 'fazli', label: lang === 'bn' ? 'ফজলি' : 'Fazli', icon: '🥭' },
    { id: 'amrapali', label: lang === 'bn' ? 'আম্রপালি' : 'Amrapali', icon: '🥭' },
    { id: 'gobindobhog', label: lang === 'bn' ? 'গোবিন্দভোগ' : 'Gobindobhog', icon: '🥭' },
    { id: 'katimon', label: lang === 'bn' ? 'কাঁচা আম' : 'Raw Mango', icon: '🥭' },
    { id: 'pickle', label: lang === 'bn' ? 'আচার' : 'Pickle', icon: '🌶️' },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-10 pb-4 px-4 md:px-10 bg-[#fafafa]">
      <div className="text-center mb-8">
        <h2 className="text-[26px] md:text-[32px] font-medium text-gray-800">
          {lang === 'bn' ? 'ফিচার্ড ক্যাটাগরি' : 'Featured Categories'}
        </h2>
      </div>

      <div className="relative group/nav">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 text-gray-600 hover:text-[#f58220] opacity-0 group-hover/nav:opacity-100 transition-opacity disabled:opacity-0 focus:opacity-100 -ml-2 border border-gray-100"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-4 justify-start"
        >
          <button
            onClick={() => {
              setActiveFilter('all');
              const prods = document.getElementById('products');
              if (prods) {
                const y = prods.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center gap-3 min-w-[100px] md:min-w-[120px] group"
          >
            <div className={`w-[90px] h-[90px] md:w-[120px] md:h-[120px] bg-white rounded-[20px] shadow-sm flex items-center justify-center transition-all ${
              activeFilter === 'all' ? 'border-2 border-[#f58220] shadow-md' : 'border border-gray-100 group-hover:shadow-md'
            }`}>
               <span className="text-4xl md:text-5xl">🌟</span>
            </div>
            <span className={`text-[15px] transition-colors ${activeFilter === 'all' ? 'text-[#f58220] font-medium' : 'text-gray-700'}`}>
              {lang === 'bn' ? 'সব পণ্য' : 'All Products'}
            </span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                // Scroll to products section smoothly
                const prods = document.getElementById('products');
                if (prods) {
                  const y = prods.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="flex flex-col items-center gap-3 min-w-[100px] md:min-w-[120px] group"
            >
              <div className={`w-[90px] h-[90px] md:w-[120px] md:h-[120px] bg-white rounded-[20px] shadow-sm flex items-center justify-center transition-all ${
                activeFilter === cat.id ? 'border-2 border-[#f58220] shadow-md' : 'border border-gray-100 group-hover:shadow-md'
              }`}>
                 <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              </div>
              <span className={`text-[15px] transition-colors ${activeFilter === cat.id ? 'text-[#f58220] font-medium' : 'text-gray-700'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 text-gray-600 hover:text-[#f58220] opacity-0 group-hover/nav:opacity-100 transition-opacity disabled:opacity-0 focus:opacity-100 -mr-2 border border-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
