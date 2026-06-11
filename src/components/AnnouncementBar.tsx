import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lang = useStore((state) => state.lang);

  useEffect(() => {
    const isClosed = localStorage.getItem('ab_bar_closed');
    if (isClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ab_bar_closed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 relative flex items-center justify-center text-sm">
      <span>
        {lang === 'bn' 
          ? '🥭 মৌসুমি আমের প্রি-বুকিং চলছে! ডেলিভারি ১২-১৫ মে' 
          : '🥭 Pre-booking open! Delivery May 12-15'}
      </span>
      <button 
        onClick={handleClose} 
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 hover:rounded-full transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
