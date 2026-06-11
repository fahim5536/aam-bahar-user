import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryNav from '../components/CategoryNav';
import Products from '../components/Products';
import { useStore } from '../store/useStore';

export default function ProductsPage({ type = 'all' }: { type?: 'all' | 'special' | 'corporate' }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const lang = useStore(state => state.lang);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const getTitle = () => {
    if (searchQuery.trim() !== '') {
      return lang === 'bn' 
        ? `অনুসন্ধানের ফলাফল: "${searchQuery}"` 
        : `Search Results for: "${searchQuery}"`;
    }
    if (type === 'special') return lang === 'bn' ? 'সিজন স্পেশাল' : 'Seasonal Special';
    if (type === 'corporate') return lang === 'bn' ? 'কর্পোরেট গিফট' : 'Corporate Gift';
    return lang === 'bn' ? 'সকল ম্যাঙ্গো' : 'All Mangoes';
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-white py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">
          {getTitle()}
        </h1>
      </div>
      <CategoryNav activeFilter={activeCategory} setActiveFilter={setActiveCategory} />
      <Products activeCategory={activeCategory} />
    </div>
  );
}
