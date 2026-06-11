import React from 'react';
import { useStore } from '../store/useStore';

export default function Contact() {
  const lang = useStore(state => state.lang);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'bn' ? 'আপনার বার্তা পাঠানো হয়েছে!' : 'Message sent successfully!');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">
          {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'নাম *' : 'Name *'}
              </label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'ইমেইল *' : 'Email *'}
              </label>
              <input required type="email" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'বিষয়' : 'Subject'}
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                <option>{lang === 'bn' ? 'সাধারণ প্রশ্ন' : 'General Query'}</option>
                <option>{lang === 'bn' ? 'অর্ডার সংক্রান্ত' : 'Order Related'}</option>
                <option>{lang === 'bn' ? 'অভিযোগ' : 'Complaint'}</option>
                <option>{lang === 'bn' ? 'কর্পোরেট অর্ডার' : 'Corporate Order'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'বার্তা *' : 'Message *'}
              </label>
              <textarea required rows={4} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold bg-[#00453e] hover:bg-[#006b5e] transition-colors">
              {lang === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="bg-white flex flex-col gap-6 p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl">📞</div>
            <div>
              <h4 className="font-bold text-gray-800">{lang === 'bn' ? 'সরাসরি কল' : 'Direct Call'}</h4>
              <p className="text-gray-600 font-sans">01919-270836</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl">💬</div>
            <div>
              <h4 className="font-bold text-gray-800">{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</h4>
              <a 
                href="https://wa.me/8801303456220?text=আমি আম অর্ডার করতে চাই" 
                target="_blank" 
                rel="noreferrer" 
                className="text-emerald-600 font-sans hover:underline font-medium"
              >
                +880 13 0345 6220
              </a>
            </div>
          </div>
          <div 
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors"
            onClick={() => {
              navigator.clipboard.writeText('ambahar04@gmail.com');
              alert(lang === 'bn' ? 'ইমেইল কপি করা হয়েছে!' : 'Email copied!');
            }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl">✉️</div>
            <div>
              <h4 className="font-bold text-gray-800">{lang === 'bn' ? 'ইমেইল' : 'Email'}</h4>
              <p className="text-gray-600">ambahar04@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl">📍</div>
            <div>
              <h4 className="font-bold text-gray-800">{lang === 'bn' ? 'ঠিকানা' : 'Address'}</h4>
              <p className="text-gray-600">{lang === 'bn' ? 'শ্রীপুর, গাজীপুর, বাংলাদেশ ১৭২০' : 'Sreepur, Gazipur, Bangladesh, 1720'}</p>
            </div>
          </div>
          <div className="w-full h-48 sm:h-64 mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <iframe 
              src="https://maps.google.com/maps?q=Sreepur,%20Gazipur,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
