import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = useStore(state => state.testimonials);
  const addTestimonial = useStore(state => state.addTestimonial);
  const lang = useStore(state => state.lang);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    text: '',
    rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    
    const colors = ['bg-[#00453e]', 'bg-[#FF6B35]', 'bg-[#40916c]', 'bg-[#e63946]', 'bg-[#f58220]', 'bg-[#2a9d8f]', 'bg-[#264653]'];
    const bgs = colors[Math.floor(Math.random() * colors.length)];
    
    addTestimonial({
      id: Date.now().toString(),
      initial: formData.name.charAt(0).toUpperCase(),
      initialEn: formData.name.charAt(0).toUpperCase(),
      bg: bgs,
      name: formData.name,
      nameEn: formData.name,
      location: formData.location || (lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'),
      locationEn: formData.location || 'Bangladesh',
      text: formData.text,
      textEn: formData.text,
      rating: formData.rating,
      date: new Date().toISOString(),
    });
    
    setFormData({ name: '', location: '', text: '', rating: 5 });
    setIsModalOpen(false);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-10 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-[26px] md:text-[32px] font-medium text-gray-800 mb-2">
              {lang === 'bn' ? 'আমাদের সন্তুষ্ট গ্রাহকরা' : 'Our Satisfied Customers'}
            </h2>
            <p className="text-gray-500">
              {lang === 'bn' ? 'হাজারো পরিবার আমাদের বিশ্বাস করেন' : 'Thousands of families trust us'}
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            <MessageSquarePlus size={18} />
            {lang === 'bn' ? 'রিভিউ দিন' : 'Write a Review'}
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop={testimonials.length >= 3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {testimonials.map((t, i) => {
            let enText = t.textEn || t.text;
            let enName = t.nameEn || t.name;
            let enLoc = t.locationEn || t.location;
            let enInit = t.initialEn || t.initial;

            if (!t.textEn) {
              if (t.id === '1' || t.name === 'রহিমা বেগম') {
                enText = 'Truly amazing mangoes! No chemicals, I will buy from here for the rest of my life.';
                enName = 'Rahima Begum';
                enLoc = 'Dhaka';
                enInit = 'R';
              } else if (t.id === '2' || t.name === 'করিম সাহেব') {
                enText = 'Excellent packaging, not a single mango was damaged. Got fast delivery.';
                enName = 'Karim Saheb';
                enLoc = 'Chattogram';
                enInit = 'K';
              } else if (t.id === '3' || t.name === 'তানভীর আহমেদ') {
                enText = 'Gave as corporate gifts, everyone praised it a lot.';
                enName = 'Tanvir Ahmed';
                enLoc = 'Sylhet';
                enInit = 'T';
              } else if (t.id === '4' || t.name === 'মাহমুদ হাসান') {
                enText = 'Best tasting mangoes. My whole family liked it very much.';
                enName = 'Mahmud Hasan';
                enLoc = 'Khulna';
                enInit = 'M';
              }
            }

            return (
            <SwiperSlide key={i}>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={16} fill="#f58220" className="text-[#f58220]" />)}
                  {[...Array(5 - (t.rating || 5))].map((_, i) => <Star key={i} size={16} className="text-gray-300" />)}
                </div>
                <p className="text-gray-600 italic text-[15px] leading-relaxed mb-6 flex-1">
                  "{lang === 'bn' ? t.text : enText}"
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${t.bg}`}>
                    {lang === 'bn' ? t.initial : enInit}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">{lang === 'bn' ? t.name : enName}</h4>
                    <p className="text-xs text-gray-500">{lang === 'bn' ? t.location : enLoc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )})}
        </Swiper>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm pt-10 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 shadow-xl my-auto">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-xl text-gray-800">
                {lang === 'bn' ? 'আপনার মতামত দিন' : 'Write a Review'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto shrink overflow-x-hidden">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'bn' ? 'রেটিং' : 'Rating'}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={28} 
                          fill={star <= formData.rating ? "#f58220" : "transparent"} 
                          className={star <= formData.rating ? "text-[#f58220]" : "text-gray-300"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'bn' ? 'ঠিকানা (জেলা)' : 'Location (District)'}
                  </label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={lang === 'bn' ? 'যেমন: ঢাকা' : 'e.g., Dhaka'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'bn' ? 'মতামত *' : 'Review *'}
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder={lang === 'bn' ? 'আমাদের আম সম্পর্কে আপনার মতামত লিখুন...' : 'Write your review about our mangoes...'}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                >
                  {lang === 'bn' ? 'সাবমিট করুন' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
