import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  FileText, ShieldCheck, HelpCircle, Truck, RefreshCw, XCircle, Briefcase, 
  CreditCard, ChevronRight, CheckCircle2, Search, MapPin, Calendar, Clock, User, CheckCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const pageData: Record<string, { icon: React.ElementType, titleEn: string, titleBn: string, contentEn: React.ReactNode, contentBn: React.ReactNode }> = {
  'terms': {
    icon: FileText,
    titleEn: 'Terms & Conditions',
    titleBn: 'শর্তাবলী',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Welcome to Aam Bahar. By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials on Aam Bahar's web site for personal, non-commercial transitory viewing only.</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Disclaimer</h3>
        <p>The materials on Aam Bahar's web site are provided "as is". Aam Bahar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আম বাহার এ স্বাগতম। এই ওয়েবসাইট ব্যবহার করার মাধ্যমে, আপনি আমাদের শর্তাবলীর সাথে সম্মত হচ্ছেন।</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">১. ব্যবহার নীতিমালা</h3>
        <p>ব্যক্তিগত ব্যবহারের জন্য আমাদের ওয়েবসাইটের তথ্য ডাউনলোড বা ব্যবহার করা যেতে পারে, তবে ব্যবসায়িক উদ্দেশ্যে নয়।</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">২. স্বীকৃতি</h3>
        <p>আম বাহার ওয়েবসাইটে থাকা সমস্ত তথ্য "যেমন আছে" ভিত্তিতে প্রদান করা হয়।</p>
      </div>
    )
  },
  'privacy': {
    icon: ShieldCheck,
    titleEn: 'Privacy Policy',
    titleBn: 'গোপনীয়তা নীতি',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information.</p>
        <ul className="space-y-2 list-none mt-4">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> We will identify the purposes for which information is being collected.</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> We will collect and use personal information solely with the objective of fulfilling those purposes specified by us.</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> We will protect personal information by reasonable security safeguards against loss or theft.</li>
        </ul>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ এবং ব্যবহার করি তা বোঝানোর জন্য এই নীতিটি তৈরি করেছি।</p>
        <ul className="space-y-2 list-none mt-4">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> আমরা কোন তথ্য সংগ্রহ করছি তা আপনাকে জানানো হবে।</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> আপনার তথ্য সম্পূর্ণ সুরক্ষিত রাখা হবে।</li>
        </ul>
      </div>
    )
  },
  'careers': {
    icon: Briefcase,
    titleEn: 'Careers',
    titleBn: 'ক্যারিয়ার',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Join the Aam Bahar team! We are always looking for passionate individuals who share our love for fresh, organic mangoes and exceptional customer service.</p>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6 text-center">
          <h4 className="font-bold text-gray-800 mb-2">No Open Positions Currently</h4>
          <p className="text-sm">Please check back later or send your resume to ambahar04@gmail.com for future opportunities.</p>
        </div>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আম বাহার টিমে যোগ দিন! আমরা সবসময় এমন মানুষদের খুঁজছি যারা আমাদের সাথে মিলে সেরা আম সবার কাছে পৌঁছে দিতে আগ্রহী।</p>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6 text-center">
          <h4 className="font-bold text-gray-800 mb-2">বর্তমানে কোন পদ ফাঁকা নেই</h4>
          <p className="text-sm">দয়া করে পরবর্তীতে আবার চেক করুন অথবা আপনার সিভি ambahar04@gmail.com এ পাঠিয়ে রাখুন।</p>
        </div>
      </div>
    )
  },
  'support': {
    icon: HelpCircle,
    titleEn: 'Support Center',
    titleBn: 'সাপোর্ট সেন্টার',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Need help with your order? Our support team is available from 9 AM to 9 PM everyday to assist you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border border-gray-200 rounded-lg text-center shadow-sm">
            <h4 className="font-bold text-lg mb-2">Call Us (Direct)</h4>
            <p className="text-primary font-bold text-xl">+8801303-456220</p>
          </div>+880 13 0345 6220
          <div className="p-4 border border-gray-200 rounded-lg text-center shadow-sm">
            <h4 className="font-bold text-lg mb-2">WhatsApp</h4>
            <p className="text-emerald-600 font-bold text-xl">+8801919-270836</p>
          </div>
          <div 
            className="p-4 border border-gray-200 rounded-lg text-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText('ambahar04@gmail.com');
              alert('Email copied!');
            }}
          >
            <h4 className="font-bold text-lg mb-2">Email Us</h4>
            <p className="font-medium text-gray-800 text-sm">ambahar04@gmail.com</p>
          </div>
        </div>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আপনার অর্ডারের জন্য কোন সাহায্য প্রয়োজন? আমাদের সাপোর্ট টিম প্রতিদিন সকাল ৯ টা থেকে রাত ৯ টা পর্যন্ত আপনার সেবায় নিয়োজিত আছে।</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border border-gray-200 rounded-lg text-center shadow-sm">
            <h4 className="font-bold text-lg mb-2">সরাসরি কল দিন</h4>
            <p className="text-primary font-bold text-xl">+8801303456220</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center shadow-sm">
            <h4 className="font-bold text-lg mb-2">হোয়াটসঅ্যাপ</h4>
            <p className="text-emerald-600 font-bold text-xl">+8801919-270836</p>
          </div>
          <div 
            className="p-4 border border-gray-200 rounded-lg text-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText('ambahar04@gmail.com');
              alert('ইমেইল কপি করা হয়েছে!');
            }}
          >
            <h4 className="font-bold text-lg mb-2">ইমেইল করুন</h4>
            <p className="font-medium text-gray-800 text-sm">ambahar04@gmail.com</p>
          </div>
        </div>
      </div>
    )
  },
  'how-to-order': {
    icon: HelpCircle,
    titleEn: 'How to Order',
    titleBn: 'কিভাবে অর্ডার করবেন',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed mt-4">
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">1</div>
           <div>
             <h4 className="font-bold text-gray-800">Choose your mangoes</h4>
             <p>Browse our collection and select the mango variety you want to purchase.</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">2</div>
           <div>
             <h4 className="font-bold text-gray-800">Add to Cart & Checkout</h4>
             <p>Click "Add to Cart" and proceed to the checkout page.</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">3</div>
           <div>
             <h4 className="font-bold text-gray-800">Fill Details & Pay</h4>
             <p>Provide your delivery information and choose a payment method (bKash/Nagad or Cash on Delivery for some areas).</p>
           </div>
        </div>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla mt-4">
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">১</div>
           <div>
             <h4 className="font-bold text-gray-800">আম নির্বাচন করুন</h4>
             <p>আমাদের কালেকশন থেকে আপনার পছন্দের আম নির্বাচন করুন।</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">২</div>
           <div>
             <h4 className="font-bold text-gray-800">কার্টে যুক্ত করে চেকআউট করুন</h4>
             <p>"Add to Cart" বাটনে ক্লিক করুন এবং চেকআউট পেজে যান।</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">৩</div>
           <div>
             <h4 className="font-bold text-gray-800">তথ্য দিন ও পেমেন্ট করুন</h4>
             <p>আপনার ডেলিভারি তথ্য দিন এবং পেমেন্ট মেথড (বিকাশ/নগদ) নির্বাচন করুন।</p>
           </div>
        </div>
      </div>
    )
  },
  'track-order': {
    icon: Truck,
    titleEn: 'Order Tracking',
    titleBn: 'অর্ডার ট্র্যাকিং',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>You can track your order using your Order ID.</p>
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl max-w-md mx-auto">
          <input type="text" placeholder="Enter Order ID" className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-4" />
          <button className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-opacity-90 transition-all">Track Now</button>
        </div>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আপনি আপনার অর্ডার আইডি ব্যবহার করে আপনার অর্ডারের বর্তমান অবস্থা জানতে পারবেন।</p>
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl max-w-md mx-auto">
          <input type="text" placeholder="অর্ডার আইডি দিন" className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-4" />
          <button className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-opacity-90 transition-all">ট্র্যাক করুন</button>
        </div>
      </div>
    )
  },
  'payment': {
    icon: CreditCard,
    titleEn: 'Payment Options',
    titleBn: 'পেমেন্ট মাধ্যম',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>We accept the following payment methods:</p>
        <ul className="space-y-2 list-none mt-4">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> bKash (Send Money / Payment)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Nagad (Send Money / Payment)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Cash on Delivery (Specific areas only)</li>
        </ul>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আমরা নিম্নোক্ত মাধ্যমগুলোতে পেমেন্ট গ্রহণ করে থাকি:</p>
        <ul className="space-y-2 list-none mt-4">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> বিকাশ (সেন্ড মানি / পেমেন্ট)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> নগদ (সেন্ড মানি / পেমেন্ট)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> ক্যাশ অন ডেলিভারি (শুধুমাত্র নির্দিষ্ট এলাকায়)</li>
        </ul>
      </div>
    )
  },
  'shipping': {
    icon: Truck,
    titleEn: 'Shipping Policy',
    titleBn: 'ডেলিভারি পলিসি',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>We deliver mangoes directly from our Rajshahi orchards to your home across Bangladesh.</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Delivery Time</h3>
        <p>Delivery takes 24-48 hours depending on your location after harvesting.</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Delivery Charges</h3>
        <p>Enjoy free shipping on double orders!</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আমরা রাজশাহীর বাগান থেকে সরাসরি আপনার বাসায় তাজা আম পৌঁছে দেই।</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ডেলিভারি সময়</h3>
        <p>আপনার লোকেশনের উপর ভিত্তি করে ডেলিভারি পেতে ২৪ থেকে ৪৮ ঘণ্টা সময় লাগতে পারে।</p>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ডেলিভারি চার্জ</h3>
        <p>ডাবল অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</p>
      </div>
    )
  },
  'faq': {
    icon: HelpCircle,
    titleEn: 'Frequently Asked Questions',
    titleBn: 'সাধারণ প্রশ্নোত্তর (FAQ)',
    contentEn: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <div>
          <h4 className="font-bold text-gray-800 mb-1">Are your mangoes chemical-free?</h4>
          <p>Yes! We guarantee 100% formalin and carbide-free naturally ripened mangoes.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">Can I cancel my order?</h4>
          <p>Orders can only be cancelled before they are dispatched for shipping.</p>
        </div>
      </div>
    ),
    contentBn: (
      <div className="space-y-6 text-gray-600 leading-relaxed font-bangla">
        <div>
          <h4 className="font-bold text-gray-800 mb-1">আপনাদের আম কি কেমিক্যাল মুক্ত?</h4>
          <p>হ্যাঁ! আমরা ১০০% ফরমালিন এবং কার্বাইড মুক্ত প্রাকৃতিকভাবে পাকানো আমের গ্যারান্টি দিচ্ছি।</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">আমি কি অর্ডার বাতিল করতে পারবো?</h4>
          <p>ডেলিভারি কাজে কুরিয়ারের কাছে হস্তান্তর করার পূর্ব পর্যন্ত আপনি অর্ডার বাতিল করতে পারবেন।</p>
        </div>
      </div>
    )
  },
  'return-policy': {
    icon: RefreshCw,
    titleEn: 'Happy Return',
    titleBn: 'রিটার্ন পলিসি',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>If you receive damaged or rotten mangoes, report it to our delivery person immediately upon receiving.</p>
        <p>We have a "Happy Return" policy where you will only be charged for the fresh mangoes.</p>
        <p className="font-bold text-red-600">Note: If only 4 to 5 mangoes are found rotten, it is not eligible for return.</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আম যদি পঁচা বা নষ্ট বের হয় তাহলে আমাদের কুরিয়ারম্যান থাকা অবস্থায় পার্সেল চেক করে সাথে সাথে রিটার্ন করতে পারবেন।</p>
        <p>পার্সেল রিসিভ করার পর কোনো অভিযোগ বা রিটার্ন গ্রহণযোগ্য হবে না।</p>
        <p className="font-bold text-red-600">বিশেষ দ্রষ্টব্য: ৪ থেকে ৫ টা আম পচা থাকলে যেটা রিটার্ন যোগ্য নহে।</p>
      </div>
    )
  },
  'refund-policy': {
    icon: RefreshCw,
    titleEn: 'Refund Policy',
    titleBn: 'রিফান্ড পলিসি',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Refunds will be processed to the original payment method within 3-5 working days if your cancellation request is approved or you encounter an issue covered by our Happy Return policy.</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>আপনার ক্যানসেলেশন রিকোয়েস্ট এক্সেপ্ট হলে অথবা আমাদের রিটার্ন পলিসি অনুযায়ী কোনো সমস্যা প্রমাণিত হলে ৩ থেকে ৫ কার্যদিবসের মধ্যে আপনার বিকাশ/নগদ নাম্বারে টাকা রিফান্ড করা হবে।</p>
      </div>
    )
  },
  'exchange-policy': {
    icon: RefreshCw,
    titleEn: 'Exchange Policy',
    titleBn: 'এক্সচেঞ্জ পলিসি',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>Due to the perishable nature of our products (Mangoes), we generally do not offer exchanges once the order is checked and received by the customer.</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>যেহেতু আম একটি পচনশীল পণ্য, ডেলিভারিম্যানের থেকে বুঝে নেওয়ার পর কোনো এক্সচেঞ্জ করা সম্ভব নয়। পার্সেল বুঝে নেওয়ার সময় দয়া করে চেক করে নিন।</p>
      </div>
    )
  },
  'cancellation': {
    icon: XCircle,
    titleEn: 'Cancellation Policy',
    titleBn: 'অর্ডার বাতিলকরণ',
    contentEn: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>You can cancel your order before it is handed over to the courier service. Once dispatched from Rajshahi, the order cannot be cancelled.</p>
        <p>To cancel, please call our hotline immediately after placing the order.</p>
      </div>
    ),
    contentBn: (
      <div className="space-y-4 text-gray-600 leading-relaxed font-bangla">
        <p>অর্ডার কনফার্ম করার পর কুরিয়ারে হস্তান্তর করার পূর্ব পর্যন্ত আপনি অর্ডার বাতিল করতে পারবেন। একবার রাজশাহী থেকে আম পাঠানো হয়ে গেলে আর বাতিল করা যাবে না।</p>
        <p>অর্ডার বাতিল করতে দ্রুত আমাদের হটলাইনে কল দিন।</p>
      </div>
    )
  }
};

export default function ContentPage() {
  const { pageId } = useParams();
  const lang = useStore(state => state.lang);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  const page = pageId && pageData[pageId] ? pageData[pageId] : null;

  if (pageId === 'track-order') {
    return <OrderTrackingPanel />;
  }

  if (!page) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50">
        <h2 className="text-4xl font-serif text-gray-400 mb-4">Content Not Found</h2>
        <Link to="/" className="text-primary font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const Icon = page.icon;

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-wrap gap-2 items-center text-sm text-gray-500 uppercase tracking-wider font-medium">
          <Link to="/" className="hover:text-primary transition-colors">{lang === 'bn' ? 'হোম' : 'Home'}</Link>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-gray-800">{lang === 'bn' ? page.titleBn : page.titleEn}</span>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-primary shrink-0">
              <Icon size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
              {lang === 'bn' ? page.titleBn : page.titleEn}
            </h1>
          </div>
          
          <div className="prose prose-orange max-w-none prose-p:text-gray-600 prose-headings:text-gray-800 prose-li:text-gray-600">
            {lang === 'bn' ? page.contentBn : page.contentEn}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderTrackingPanel() {
  const lang = useStore(state => state.lang);
  const orders = useStore(state => state.orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const filtered = orders.filter((order: any) => {
      const matchOrderId = order.orderId.toLowerCase().includes(query);
      const matchItemOrderId = order.cartItems.some((item: any) => 
        item.itemOrderId.toLowerCase().includes(query)
      );
      return matchOrderId || matchItemOrderId;
    });

    setResults(filtered);
    setSearched(true);
  };

  const statuses: Array<{
    key: 'pending' | 'processing' | 'harvesting' | 'shipped' | 'delivered';
    titleBn: string;
    titleEn: string;
    descBn: string;
    descEn: string;
  }> = [
    {
      key: 'pending',
      titleBn: 'অর্ডার নিশ্চিত হয়েছে',
      titleEn: 'Order Confirmed',
      descBn: 'অর্ডার রিসিভড ও কনফার্ম হয়েছে।',
      descEn: 'Order successfully received and confirmed.'
    },
    {
      key: 'processing',
      titleBn: 'প্রসেসিং হচ্ছে',
      titleEn: 'Processing',
      descBn: 'আম বাছাই ও গুণগতমান পরীক্ষা হচ্ছে।',
      descEn: 'Sorting and quality-testing mangoes.'
    },
    {
      key: 'harvesting',
      titleBn: 'আম পাড়া হচ্ছে',
      titleEn: 'Harvesting & Packing',
      descBn: 'বাগান থেকে তাজা আম সংগ্রহ করে প্যাক করা হচ্ছে।',
      descEn: 'Harvesting fresh mangoes from the trees and packing them.'
    },
    {
      key: 'shipped',
      titleBn: 'কুরিয়ারে পাঠানো হয়েছে',
      titleEn: 'Shipped',
      descBn: 'আপনার এলাকায় ডেলিভারির জন্য কুরিয়ারে পাঠানো হয়েছে।',
      descEn: 'Handed over to courier for transit to your city.'
    },
    {
      key: 'delivered',
      titleBn: 'ডেলিভারি সফল',
      titleEn: 'Delivered',
      descBn: 'আম আপনার বাসায় সফলভাবে পৌঁছে দেওয়া হয়েছে।',
      descEn: 'Your package of mangoes was successfully delivered.'
    }
  ];

  const getStatusIndex = (status: string) => {
    return statuses.findIndex(s => s.key === status);
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-10 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-wrap gap-2 items-center text-sm text-gray-500 uppercase tracking-wider font-medium font-sans">
          <Link to="/" className="hover:text-primary transition-colors">{lang === 'bn' ? 'হোম' : 'Home'}</Link>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-gray-800 font-bangla">{lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking'}</span>
        </div>

        {/* Searching Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center">
              <Truck size={36} />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-bangla">
            {lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking'}
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6 font-bangla">
            {lang === 'bn' 
              ? 'আপনার অর্ডার আইডি বা পণ্য ট্র্যাকিং নম্বর দিন' 
              : 'Enter your primary Order ID or Track ID'}
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'অর্ডার আইডি বা ট্র্যাকিং আইডি লিখুন' : 'Enter Order ID or Track ID'} 
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bangla" 
            />
            <button type="submit" className="bg-primary hover:bg-[#003630] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-sm shadow-md font-bangla">
              <Search size={16} />
              {lang === 'bn' ? 'ট্র্যাক করুন' : 'Track Now'}
            </button>
          </form>

          {/* Quick test hints */}
          <div className="mt-5 inline-flex flex-wrap gap-2 justify-center text-xs text-gray-400 font-bangla">
            <span>{lang === 'bn' ? 'পরীক্ষা করতে ডেমো ব্যবহার করুন:' : 'Click to test with demo:'}</span>
            <button type="button" onClick={() => { setSearchQuery('AMB-384912'); setSearched(false); }} className="underline text-primary hover:text-[#f58220] font-sans font-bold">AMB-384912</button>
          </div>
        </div>

        {/* Results display */}
        {searched && (
          <div className="space-y-6">
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center py-12">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-gray-800 font-bangla">
                  {lang === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No Order Found'}
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto font-bangla">
                  {lang === 'bn' 
                    ? 'আপনার প্রদানকৃত তথ্যটি সঠিক নয়। অনুগ্রহ করে অর্ডার রিসিপ্ট চেক করুন।' 
                    : 'We could not find any active order under this identifier. Please double check.'}
                </p>
              </div>
            ) : (
              results.map((order) => (
                <div key={order.orderId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 space-y-6 font-bangla">
                  {/* Order Customer Header info */}
                  <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gray-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-2 sm:gap-4 items-center mb-1">
                        <span className="text-xs bg-[#00453e]/5 text-primary border border-primary/10 px-2 py-0.5 rounded font-extrabold font-sans">
                          {lang === 'bn' ? 'অর্ডার নাম্বার: ' : 'Order ID: '} {order.orderId}
                        </span>
                        <span className="text-xs bg-red-50 text-red-650 border border-red-100 px-2 py-0.5 rounded font-mono font-bold">
                          {lang === 'bn' ? 'মেমো রশিদ নাম্বার: ' : 'Memo Receipt #: '} {order.receiptNo || 'MEMO-2026-9042'}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800 pt-0.5">
                        {lang === 'bn' ? `গ্রাহক: ${order.customerName}` : `Customer: ${order.customerName}`}
                      </h3>
                      <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Clock size={14} /> {order.date} {order.time && `• ${order.time}`}</span>
                        <span className="flex items-center gap-1 font-sans"><User size={14} /> {order.phone}</span>
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 px-3.5 py-2 rounded-xl text-xs text-primary font-bold">
                      {lang === 'bn' ? `সর্বমোট: ৳${order.grandTotal}` : `Grand Total: ৳${order.grandTotal}`}
                    </div>
                  </div>

                  {/* Individual Products List in that Order */}
                  <div className="space-y-8">
                    <h4 className="text-sm font-bold text-gray-800 border-l-4 border-primary pl-2.5">
                      {lang === 'bn' ? 'পণ্যের live অবস্থান ও ট্র্যাকিং' : 'Products live location & status'}
                    </h4>

                    {order.cartItems.map((item: any, index: number) => {
                      const statusIndex = getStatusIndex(item.status);
                      const productName = lang === 'bn' ? item.product.name : item.product.nameEn;
                      
                      return (
                        <div key={index} className="bg-[#fdfefd] p-4 md:p-6 rounded-2xl border border-gray-100 space-y-6 shadow-sm">
                          {/* Item header */}
                          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{item.product.emoji || '🥭'}</span>
                              <div>
                                <h5 className="font-bold text-gray-850 text-sm">
                                  {productName}
                                </h5>
                                <p className="text-xs text-gray-500">
                                  {item.packageType === '12KG' ? '12 KG' : '24 KG'} × {item.quantity} {lang === 'bn' ? 'প্যাকেজ' : 'Pack'}
                                </p>
                              </div>
                            </div>
                            <div className="text-left bg-primary/5 hover:bg-primary/10 transition-colors px-3 py-1.5 rounded-lg border border-primary/10">
                              <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                                {lang === 'bn' ? 'পণ্য ট্র্যাকিং আইডি' : 'Product Track ID'}
                              </span>
                              <span className="text-xs text-primary font-bold font-sans">
                                {item.itemOrderId}
                              </span>
                            </div>
                          </div>

                          {/* Live Location Block */}
                          <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-4 flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                {lang === 'bn' ? 'বর্তমান লাইভ অবস্থান (Live Location)' : 'Current Physical Location'}
                              </span>
                              <p className="font-bold text-sm text-gray-850 leading-relaxed mt-0.5">
                                {lang === 'bn' ? item.currentLocationBn : item.currentLocationEn}
                              </p>
                              {item.deliveryDateBn && (
                                <p className="text-[11px] text-[#f58220] font-bold mt-1.5 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/40 w-max">
                                  <Calendar size={13} />
                                  {lang === 'bn' ? `ডেলিভারি সম্ভাব্য তারিখ: ${item.deliveryDateBn}` : `Est. Delivery: ${item.deliveryDateEn}`}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Standard Tracker Stepper */}
                          <div className="relative pt-2">
                            {/* Desktop Stepper */}
                            <div className="hidden md:flex justify-between items-start relative">
                              {/* Horizontal Gray progress line overlay */}
                              <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 -z-0"></div>
                              {/* Active Green color line overlay */}
                              <div 
                                className="absolute top-5 left-10 h-0.5 bg-primary -z-0 transition-all duration-500" 
                                style={{ width: `${(statusIndex / (statuses.length - 1)) * 80}%` }}
                              ></div>

                              {statuses.map((step, idx) => {
                                const isCompleted = idx <= statusIndex;
                                const isActive = idx === statusIndex;
                                
                                return (
                                  <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10 px-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                      isCompleted 
                                        ? 'bg-primary border-primary text-white shadow-sm' 
                                        : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                      {isCompleted ? <CheckCircle size={16} /> : <span className="font-bold text-xs font-sans">{idx + 1}</span>}
                                    </div>
                                    <p className={`text-[11px] font-bold mt-2 ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>
                                      {lang === 'bn' ? step.titleBn : step.titleEn}
                                    </p>
                                    <p className="text-[9px] text-gray-400 mt-0.5 max-w-[110px] leading-tight">
                                      {lang === 'bn' ? step.descBn : step.descEn}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Mobile Vertical Stepper */}
                            <div className="flex md:hidden flex-col space-y-6 relative pl-6">
                              {/* Vertical Gray Line */}
                              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                              
                              {statuses.map((step, idx) => {
                                const isCompleted = idx <= statusIndex;
                                const isActive = idx === statusIndex;

                                return (
                                  <div key={idx} className="flex gap-3 position-relative items-start text-left">
                                    <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all -translate-x-1.5 ${
                                      isCompleted 
                                        ? 'bg-primary border-primary text-white shadow-sm' 
                                        : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                      {isCompleted ? <CheckCircle size={12} /> : <span className="text-[9px] font-sans">{idx + 1}</span>}
                                    </div>
                                    <div className="pl-2">
                                      <p className={`text-xs font-bold ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>
                                        {lang === 'bn' ? step.titleBn : step.titleEn}
                                      </p>
                                      <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                                        {lang === 'bn' ? step.descBn : step.descEn}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Customer Information summary */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 text-xs">
                    <p className="font-bold text-gray-750 mb-2 border-b border-gray-200/60 pb-1.5 uppercase tracking-wider">
                      {lang === 'bn' ? 'ডেলিভারি ঠিকানা ও বিবরণ' : 'Delivery details'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 leading-relaxed">
                      <p><span className="font-bold">{lang === 'bn' ? 'ঠিকানা: ' : 'Address: '}</span> {order.address}, {order.upazila}, {order.district}</p>
                      <p><span className="font-bold">{lang === 'bn' ? 'পেমেন্ট মেথড: ' : 'Payment Method: '}</span> {order.paymentMethod === 'cod' ? (lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery') : (lang === 'bn' ? 'অনলাইন পেমেন্ট' : 'Online Payment')}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
