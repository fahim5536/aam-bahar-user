import { useState } from 'react';
import Hero from '../components/Hero';
import CategoryNav from '../components/CategoryNav';
import Products from '../components/Products';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryNav activeFilter={activeCategory} setActiveFilter={setActiveCategory} />
      <Products activeCategory={activeCategory} />
      <WhyUs />
      <Testimonials />
    </div>
  );
}
