import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Crown, X, Tag } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const lang = useStore(state => state.lang);
  const [showPromo, setShowPromo] = useState(true);

  const slides = [
    {
      id: 1,
      bg: 'linear-gradient(135deg, #00453e, #006b5e)',
      titleBn: 'সেরা মৌসুমি আম',
      titleEn: 'Premium Seasonal Mangoes',
      subBn: 'সরাসরি বাগান থেকে আপনার দরজায়',
      subEn: 'Directly from orchard to your doorstep',
      img: '🥭'
    },
    {
      id: 2,
      bg: 'linear-gradient(135deg, #f58220, #e67300)',
      titleBn: '১০০% রাসায়নিকমুক্ত আম',
      titleEn: '100% Chemical-Free',
      subBn: 'কার্বাইড ছাড়া প্রাকৃতিকভাবে পাকানো',
      subEn: 'Naturally ripened without carbide',
      img: '🥭'
    },
    {
      id: 3,
      bg: 'linear-gradient(135deg, #003530, #00453e)',
      titleBn: 'সারাদেশে হোম ডেলিভারি',
      titleEn: 'Nationwide Home Delivery',
      subBn: 'ডাবল অর্ডারে বিশেষ ছাড়',
      subEn: 'Special discount on double orders',
      img: '🚚'
    },
    {
      id: 4,
      bg: 'linear-gradient(135deg, #e63946, #d90429)',
      titleBn: 'রাজশাহীর আসল স্বাদ',
      titleEn: 'Authentic Taste of Rajshahi',
      subBn: '১০০% ফরমালিন মুক্ত গ্যারান্টি',
      subEn: '100% Formalin-free guarantee',
      img: <Crown size={150} className="text-yellow-300 drop-shadow-lg mx-auto stroke-1" />,
      imgTextBn: 'ফলের রাজা আম, আর আমের রাজা রাজশাহী',
      imgTextEn: 'Mango is the king of fruits, Rajshahi is the king of mangoes',
    },
    {
      id: 5,
      bg: 'linear-gradient(135deg, #2a9d8f, #264653)',
      titleBn: 'এক্সপোর্ট কোয়ালিটি প্যাকেজিং',
      titleEn: 'Export Quality Packaging',
      subBn: 'আপনার আম পৌঁছাবে একদম ফ্রেশ',
      subEn: 'Your mangoes will arrive totally fresh',
      img: '📦'
    },
    {
      id: 6,
      bg: 'linear-gradient(135deg, #1d3557, #457b9d)',
      titleBn: 'দ্রুত ডেলিভারি',
      titleEn: 'Express Delivery',
      subBn: '৪ কর্ম দিবসের মধ্যে আপনি আপনার পণ্য হাতে পাবেন',
      subEn: 'Receive your products within 4 working days',
      img: (
        <div className="relative w-[300px] h-[150px] flex items-center justify-end pr-8">
          <span className="text-[120px] z-0 leading-none">🏠</span>
          <div className="absolute bottom-6 left-0 right-16 h-2 bg-white/20 rounded-full"></div>
          <span className="text-[70px] absolute bottom-3 left-0 z-10 animate-[slideCar_4s_infinite_linear] leading-none inline-block">
            <span className="inline-block scale-x-[-1]">🚚</span>
          </span>
        </div>
      )
    }
  ];

  return (
    <section className="w-full relative">
      {showPromo && (
        <div className="bg-red-50 text-red-600 px-4 py-2 flex items-center justify-between text-sm md:text-base border-b border-red-100 z-20 relative">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1 justify-center">
            <Tag size={16} className="shrink-0" />
            <span className="font-medium font-serif">
              {lang === 'bn' 
                ? 'বিশেষ অফার: ডাবল অর্ডার বা মাল্টিপল প্যাকেজ অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!' 
                : 'Special Offer: Free delivery on double orders or multiple packages!'}
            </span>
          </div>
          <button 
            onClick={() => setShowPromo(false)} 
            className="p-1 hover:bg-red-100 rounded-full transition-colors shrink-0"
            aria-label="Close promotion"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        loop={true}
        speed={800}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[250px] xs:h-[300px] sm:h-[360px] md:h-[500px] w-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div 
              style={{ background: slide.bg }}
              className="h-full w-full flex flex-row items-center justify-between px-4 sm:px-10 md:px-20 text-white relative overflow-hidden gap-4"
            >
              <div className="z-10 max-w-xl md:max-w-2xl flex-1 text-left">
                <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 drop-shadow-md animate-in slide-in-from-left duration-700 leading-tight">
                  {lang === 'bn' ? slide.titleBn : slide.titleEn}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mb-4 md:mb-8 drop-shadow-md opacity-90 animate-in slide-in-from-left duration-700 delay-150 leading-relaxed max-w-[280px] sm:max-w-none">
                  {lang === 'bn' ? slide.subBn : slide.subEn}
                </p>
                <div className="flex flex-row gap-2.5 sm:gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
                  <Link 
                    to="/products" 
                    className="bg-[#f58220] hover:bg-[#e0751a] text-white px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm text-center transition-all shadow-sm active:scale-95"
                  >
                    {lang === 'bn' ? 'এখনই অর্ডার করুন' : 'Order Now'}
                  </Link>
                  <Link 
                    to="/products" 
                    className="bg-transparent border border-white/60 hover:border-white text-white px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm text-center hover:bg-white/10 transition-all active:scale-95"
                  >
                    {lang === 'bn' ? 'আম দেখুন' : 'View Mangoes'}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-[64px] sm:text-[110px] md:text-[150px] z-10 animate-in zoom-in duration-1000 select-none shrink-0">
                {slide.img}
                {(slide.imgTextBn || slide.imgTextEn) && (
                  <p className="text-[9px] sm:text-sm md:text-xl font-serif mt-1 md:mt-2 text-yellow-100 italic font-medium tracking-wide drop-shadow-md text-center max-w-[100px] sm:max-w-none leading-tight">
                    "{lang === 'bn' ? slide.imgTextBn : slide.imgTextEn}"
                  </p>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style>{`
        .swiper-pagination-bullet { background: white; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: white; opacity: 1; }
        .swiper-button-next, .swiper-button-prev { 
          color: #f58220; 
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: none !important;
        }
        @media (min-width: 1024px) {
          .swiper-button-next, .swiper-button-prev {
            display: flex !important;
          }
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        @keyframes slideCar {
          0% { transform: translateX(-60px) translateY(0); opacity: 0; }
          15% { opacity: 1; }
          35% { transform: translateX(40px) translateY(0); opacity: 1; }
          40% { transform: translateX(40px) translateY(-2px); opacity: 1; }
          45% { transform: translateX(40px) translateY(0); opacity: 1; }
          50% { transform: translateX(40px) translateY(-2px); opacity: 1; }
          55% { transform: translateX(40px) translateY(0); opacity: 1; }
          60% { transform: translateX(40px) translateY(-2px); opacity: 1; }
          65% { transform: translateX(40px) translateY(0); opacity: 1; }
          70% { transform: translateX(40px) translateY(-2px); opacity: 1; }
          75% { transform: translateX(40px) translateY(0); opacity: 1; }
          85% { transform: translateX(40px) translateY(0); opacity: 1; }
          100% { transform: translateX(40px) translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
