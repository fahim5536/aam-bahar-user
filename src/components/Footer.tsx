import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const lang = useStore(state => state.lang);

  // Simple and highly robust detection of mobile devices to handle app redirects
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Custom deep link mapping for mobile vs. web redirects for PCs
  const fbLink = isMobile 
    ? 'fb://facewebmodal/f?href=https://www.facebook.com/profile.php?id=61589027043851'
    : 'https://www.facebook.com/profile.php?id=61589027043851';

  const ytLink = isMobile
    ? 'vnd.youtube://www.youtube.com/@aambahar04'
    : 'https://www.youtube.com/@aambahar04';

  const waLink = isMobile
    ? 'whatsapp://send?phone=8801303456220&text=আমি আম অর্ডার করতে চাই'
    : 'https://web.whatsapp.com/send?phone=8801303456220&text=আমি আম অর্ডার করতে চাই';

  const mailLink = isMobile
    ? 'mailto:ambahar04@gmail.com'
    : 'https://mail.google.com/mail/?view=cm&fs=1&to=ambahar04@gmail.com';

  const igLink = isMobile
    ? 'instagram://user?username=aambahar04'
    : 'https://www.instagram.com/aambahar04';

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Aam Bahar Logo" className="h-[80px] object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'flex'; }} />
              <div className="hidden items-center gap-2">
                 <span className="text-3xl font-serif text-[#f58220]">🥭</span>
                 <span className="text-xl font-bold text-gray-800 uppercase tracking-wider">
                    {lang === 'bn' ? 'আম বাহার' : 'AAM BAHAR'}
                 </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {lang === 'bn' 
                ? 'আম বাহার হলো এমন একটি ই-কমার্স প্ল্যাটফর্ম যা সকলের দোরগোড়ায় নিরাপদ ও স্বাস্থ্যসম্মত পণ্য পৌঁছে দিতে নিবেদিত।'
                : 'Aam Bahar is an e-commerce platform dedicated to providing safe and reliable food to every home.'}
            </p>
            
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <MapPin size={18} className="shrink-0 text-gray-500 mt-0.5" />
                <span className="text-sm text-gray-600">
                  {lang === 'bn' ? 'শ্রীপুর গাজীপুর, গাজীপুর, বাংলাদেশ, ১৭২০' : 'Sreepur gazipur , Gazipur, Bangladesh, 1720'}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} className="shrink-0 text-gray-500" />
                <span className="text-sm text-gray-600 font-sans">01919-270836 ({lang === 'bn' ? 'কল করুন' : 'Call Main'})</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-emerald-500 text-sm font-semibold shrink-0">W</span>
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-600 font-sans hover:text-emerald-500 hover:underline"
                >
                  +880 13 0345 6220 (WhatsApp)
                </a>
              </li>
              <li 
                className="flex gap-2 items-center cursor-pointer hover:bg-gray-50 p-1 -ml-1 rounded transition-colors"
                onClick={() => {
                  if (isMobile) {
                    window.location.href = mailLink;
                  } else {
                    window.open(mailLink, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <Mail size={18} className="shrink-0 text-gray-500" />
                <span className="text-sm text-gray-600">ambahar04@gmail.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-4">
              <a 
                href={fbLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300"
                title="Facebook Page"
              >
                <Facebook size={16} />
              </a>
              <a 
                href={ytLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300 delay-75"
                title="YouTube Channel"
              >
                <Youtube size={16} />
              </a>
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300 delay-100"
                title={lang === 'bn' ? 'হোয়াটসঅ্যাপ করুন' : 'WhatsApp Chat'}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a 
                href="tel:+8801919270836" 
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300 delay-150"
                title={lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Directly'}
              >
                <Phone size={16} />
              </a>
              <a 
                href={mailLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300 delay-175"
                title={lang === 'bn' ? 'ইমেইল করুন' : 'Email Directly'}
              >
                <Mail size={16} />
              </a>
              <a 
                href={igLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-orange-50 text-[#f58220] flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors animate-in zoom-in duration-300 delay-200"
                title="Instagram Profile"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-base font-semibold mb-6 text-gray-800">
              {lang === 'bn' ? 'তথ্য' : 'Information'}
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About us'}</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact us'}</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'কোম্পানি তথ্য' : 'Company Information'}</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'আম বাহারের গল্প' : 'Aam Bahar Stories'}</Link></li>
              <li><Link to="/info/terms" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions'}</Link></li>
              <li><Link to="/info/privacy" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</Link></li>
              <li><Link to="/info/careers" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'ক্যারিয়ার' : 'Careers'}</Link></li>
            </ul>
          </div>

          {/* Shop By */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-base font-semibold mb-6 text-gray-800">
              {lang === 'bn' ? 'শপ বাই' : 'Shop By'}
            </h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'আম' : 'Mango'}</Link></li>
              <li><Link to="/special" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'সিজনাল স্পেশাল' : 'Seasonal Specials'}</Link></li>
              <li><Link to="/corporate" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'কর্পোরেট গিফট' : 'Corporate Gifts'}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-base font-semibold mb-6 text-gray-800">
              {lang === 'bn' ? 'সাপোর্ট' : 'Support'}
            </h3>
            <ul className="space-y-3">
              <li><Link to="/info/support" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'সাপোর্ট সেন্টার' : 'Support Center'}</Link></li>
              <li><Link to="/info/how-to-order" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'কিভাবে অর্ডার করবেন' : 'How to Order'}</Link></li>
              <li><Link to="/info/track-order" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking'}</Link></li>
              <li><Link to="/info/payment" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment'}</Link></li>
              <li><Link to="/info/shipping" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'ডেলিভারি পলিসি' : 'Shipping'}</Link></li>
              <li><Link to="/info/faq" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'FAQ'}</Link></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-base font-semibold mb-4 md:mb-6 text-gray-800">
              {lang === 'bn' ? 'পলিসি' : 'Consumer Policy'}
            </h3>
            <ul className="space-y-3">
              <li><Link to="/info/return-policy" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'হ্যাপি রিটার্ন' : 'Happy Return'}</Link></li>
              <li><Link to="/info/refund-policy" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'রিফান্ড পলিসি' : 'Refund Policy'}</Link></li>
              <li><Link to="/info/exchange-policy" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'এক্সচেঞ্জ পলিসি' : 'Exchange'}</Link></li>
              <li><Link to="/info/cancellation" className="text-sm text-gray-600 hover:text-[#f58220] transition-colors">{lang === 'bn' ? 'অর্ডার বাতিলকরণ' : 'Cancellation'}</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-8 mt-8 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10 w-full md:w-auto">
            <div>
               <p className="text-xs text-gray-500 font-semibold mb-2">{lang === 'bn' ? 'মোবাইল অ্যাপ ডাউনলোড করুন (শীঘ্রই আসছে):' : 'Download App on Mobile (Coming soon):'}</p>
               <div className="flex gap-3 opacity-60">
                  <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800">
                     <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M99.617 8.057a50.191 50.191 0 00-38.815-4.043C42.868 9.873 32 25.132 32 45.485V466.49c0 19.349 9.816 33.684 26.071 39.549 16.275 5.872 35.158 2.052 49.336-10.024L317.062 316.51 99.617 8.057zM348.653 289.654L133.729 82.518l214.924 163.535 34.004-26.012c14.281-10.929 22.846-27.184 22.846-44.471 0-17.288-8.565-33.542-22.846-44.472L125.684 9.09C121.564 5.923 116.711 3.518 111.458 2v1l366.568 251.688c20.316 13.948 32.148 36.31 32 60.598-1.536-12.774-8.811-23.957-20.088-30.825L348.653 289.654z" /></svg>
                     <div className="text-left">
                        <div className="text-[10px] uppercase leading-none">Get it on</div>
                        <div className="text-sm font-bold leading-none">Google Play</div>
                     </div>
                  </div>
                  <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800">
                     <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                     <div className="text-left">
                        <div className="text-[10px] uppercase leading-none">Download on the</div>
                        <div className="text-sm font-bold leading-none">App Store</div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-semibold mb-2">{lang === 'bn' ? 'পেমেন্ট গেটওয়ে:' : 'Pay with Mobile Banking:'}</p>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/60 px-4 py-2 rounded-xl w-max">
                <img src="/bkash.png" alt="bKash" className="h-6 md:h-7 object-contain" />
                <span className="text-gray-300 font-bold text-xs select-none">/</span>
                <img src="/nogod.png" alt="Nagad" className="h-8 md:h-9 object-contain" />
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right shrink-0 flex flex-col items-center md:items-end gap-1">
            <p className="text-sm text-gray-500">Copyright © {new Date().getFullYear()} Aam Bahar</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
