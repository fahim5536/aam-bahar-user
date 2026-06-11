import { useStore } from '../store/useStore';
import { MessageSquareText, Phone, Mail, X, HeadphonesIcon, Check } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const lang = useStore(state => state.lang);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = 'ambahar04@gmail.com';
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback copy method
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textarea);
      });
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+8801919270836';
  };

  return (
    <div className="fixed bottom-22 lg:bottom-6 right-6 z-[9000] flex flex-col items-end gap-3">
      {/* Expanded Menu Options */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 mb-2' : 'scale-0 opacity-0 h-0 w-0 mb-0 pointer-events-none'}`}>
        
        {/* Email Float */}
        <div 
          className="group flex items-center justify-end relative cursor-pointer" 
          onClick={handleCopyEmail}
          title={lang === 'bn' ? 'ইমেইল কপি করতে চাপুন' : 'Click to copy email'}
        >
          <div className="absolute right-14 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-right-1 after:-translate-y-1/2 after:border-[6px] after:border-y-transparent after:border-r-transparent after:border-l-gray-900 shadow-md">
            {copied ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Check size={12} /> {lang === 'bn' ? 'কপি করা হয়েছে!' : 'Copied!'}
              </span>
            ) : (
              <span>Email: ambahar04@gmail.com</span>
            )}
          </div>
          <div className={`w-10 h-10 ${copied ? 'bg-emerald-600' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all`}>
            {copied ? <Check size={20} /> : <Mail size={20} />}
          </div>
        </div>

        {/* Phone Float */}
        <div 
          className="group flex items-center justify-end relative cursor-pointer"
          onClick={handlePhoneClick}
          title={lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Now'}
        >
          <div className="absolute right-14 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-right-1 after:-translate-y-1/2 after:border-[6px] after:border-y-transparent after:border-r-transparent after:border-l-gray-900 shadow-md">
            {lang === 'bn' ? 'সরাসরি কল দিন: 01919-270836' : 'Call: 01919-270836'}
          </div>
          <button 
            type="button"
            className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <Phone size={20} />
          </button>
        </div>

        {/* WhatsApp Float */}
        <div className="group flex items-center justify-end relative">
          <div className="absolute right-14 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-right-1 after:-translate-y-1/2 after:border-[6px] after:border-y-transparent after:border-r-transparent after:border-l-gray-900 shadow-md">
            {lang === 'bn' ? 'হোয়াটসঅ্যাপ: +880 13 0345 6220' : 'WhatsApp: +880 13 0345 6220'}
          </div>
          <a 
            href="https://wa.me/8801303456220?text=আমি আম অর্ডার করতে চাই" 
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-[#f58220] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <MessageSquareText size={20} />
          </a>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all relative"
        aria-label="Contact options"
      >
        {isOpen ? <X size={28} /> : <HeadphonesIcon size={28} />}
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
           </span>
        )}
      </button>
    </div>
  );
}
