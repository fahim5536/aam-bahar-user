import { Store, Leaf, Truck, Package, RotateCcw, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function WhyUs() {
  const lang = useStore(state => state.lang);

  const features = [
    {
      icon: <Store className="text-[#00453e]" size={24} />,
      bg: 'bg-[#00453e]/10',
      titleBn: 'নিজস্ব বাগানের আম',
      titleEn: 'Own Orchard Mangoes',
      descBn: 'সরাসরি বাগান থেকে, কোনো মধ্যস্থভোগী নেই',
      descEn: 'Straight from the orchard, no middlemen',
    },
    {
      icon: <Leaf className="text-[#40916c]" size={24} />,
      bg: 'bg-[#40916c]/10',
      titleBn: '১০০% প্রাকৃতিক',
      titleEn: '100% Natural',
      descBn: 'কার্বাইড বা কেমিক্যাল ছাড়া পাকানো',
      descEn: 'Ripened without carbide or chemicals',
    },
    {
      icon: <Truck className="text-[#FF6B35]" size={24} />,
      bg: 'bg-[#FF6B35]/10',
      titleBn: 'হোম ডেলিভারি',
      titleEn: 'Home Delivery',
      descBn: 'চাঁপাইনবাবগঞ্জ থেকে সারাদেশে',
      descEn: 'From Chapainawabganj to nationwide',
    },
    {
      icon: <Package className="text-[#d4a017]" size={24} />,
      bg: 'bg-[#d4a017]/10',
      titleBn: 'প্রিমিয়াম প্যাকেজিং',
      titleEn: 'Premium Packaging',
      descBn: 'Export Grade Box এ নিরাপদে পৌঁছায়',
      descEn: 'Arrives safely in Export Grade Box',
    },
    {
      icon: <RotateCcw className="text-[#e63946]" size={24} />,
      bg: 'bg-[#e63946]/10',
      titleBn: 'মানি ব্যাক গ্যারান্টি',
      titleEn: 'Money Back Guarantee',
      descBn: 'পছন্দ না হলে টাকা ফেরত',
      descEn: 'Refund if not satisfied',
    },
    {
      icon: <Search className="text-[#4361ee]" size={24} />,
      bg: 'bg-[#4361ee]/10',
      titleBn: 'যাচাইকৃত আম',
      titleEn: 'Verified Mangoes',
      descBn: 'প্রতিটি আম বাছাই করে পাঠানো',
      descEn: 'Each mango is hand-picked',
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center justify-center">
          <h2 className="text-[26px] md:text-[32px] font-medium text-gray-800">
            {lang === 'bn' ? (
               'কেন আমরা সেরা?'
            ) : (
               'Why Choose Us?'
            )}
          </h2>
          <div className="relative mt-3 h-1.5 w-32 flex items-center justify-center">
            {/* Main polished forest green underline */}
            <div className="h-1 w-20 bg-primary rounded-full"></div>
            {/* Outer soft glowing accent dots */}
            <div className="absolute left-2 w-1.5 h-1.5 bg-primary/40 rounded-full"></div>
            <div className="absolute right-2 w-1.5 h-1.5 bg-primary/40 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${feature.bg}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">{lang === 'bn' ? feature.titleBn : feature.titleEn}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{lang === 'bn' ? feature.descBn : feature.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
