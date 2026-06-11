import { useStore } from '../store/useStore';

export default function About() {
  const lang = useStore(state => state.lang);
  
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          {lang === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
        </h1>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-text-main">
            {lang === 'bn' ? 'আম বাহার কেন তৈরি হলো' : 'Why Aam Bahar was Created'}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {lang === 'bn' ? 'আমরা দেখেছি বাজারের বেশির ভাগ আম কেমিক্যাল দিয়ে পাকানো হয়। আমাদের উদ্দেশ্য হলো সারা দেশের মানুষের কাছে ১০০% প্রাকৃতিক ও সরাসরি চাঁপাইনবাবগঞ্জের বাগান থেকে সেরা মানের আম পৌঁছে দেওয়া।' : 'We noticed most mangoes in the market are ripened with chemicals. Our goal is to deliver 100% natural, premium mangoes straight from Chapainawabganj orchards to people nationwide.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {lang === 'bn' ? 'আমাদের নিজস্ব বাগানের যত্নশীল কৃষকদের মাধ্যমে আমরা নিশ্চিত করি প্রতিটি আমের প্রকৃত স্বাদ ও মান।' : 'Through careful farmers in our own orchards, we ensure the authentic taste and quality of every mango.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold text-primary mb-2">৫০০+</h3>
            <p className="text-gray-600 font-medium">{lang === 'bn' ? 'সন্তুষ্ট গ্রাহক' : 'Happy Customers'}</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold text-primary mb-2">৩টি</h3>
            <p className="text-gray-600 font-medium">{lang === 'bn' ? 'নিজস্ব বাগান' : 'Own Orchards'}</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-100 sm:col-span-2">
            <h3 className="text-3xl font-bold text-primary mb-2">১০০%</h3>
            <p className="text-gray-600 font-medium">{lang === 'bn' ? 'রাসায়নিকমুক্ত' : 'Chemical Free'}</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <blockquote className="text-2xl md:text-3xl font-serif text-primary italic mb-8">
          "{lang === 'bn' ? 'মিষ্টতার নামই — আম বাহার' : 'The Taste of Sweetness — Aam Bahar'}"
        </blockquote>
      </div>
    </div>
  );
}
