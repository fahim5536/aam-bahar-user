import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Star, Printer, Download, Phone, MapPin, CreditCard, ShoppingBag, HelpCircle, Mail, Send, AlertTriangle, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import emailjs from '@emailjs/browser';
import { generateOrderPDF } from '../utils/pdfGenerator';

export default function OrderSuccess() {
  const lang = useStore(state => state.lang);
  const addTestimonial = useStore(state => state.addTestimonial);
  const location = useLocation();
  const orderId = location.state?.orderId || 'AB' + Date.now().toString().slice(-6);
  
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [receiptLang, setReceiptLang] = useState<'bn' | 'en'>(lang);

  // Fallback high-fidelity details in case page is loaded/reloaded directly
  const fallbackOrderDetails = {
    orderId: orderId,
    receiptNo: 'MEMO-2026-9042',
    customerName: lang === 'bn' ? 'সম্মানিত ক্রেতা' : 'Valued Customer',
    phone: '01XXXXXXXXX',
    email: '',
    division: lang === 'bn' ? 'রাজশাহী' : 'Rajshahi',
    district: lang === 'bn' ? 'চাঁপাইনবাবগঞ্জ' : 'Chapainawabganj',
    upazila: lang === 'bn' ? 'সদর' : 'Sadar',
    address: lang === 'bn' ? 'আম ভ্যালি রোড' : 'Mango Valley Road',
    paymentMethod: 'cod',
    paymentAmount: 'full',
    cartItems: [
      {
        product: {
          id: '1',
          name: 'হিমসাগর আম (Premium Himsagar)',
          nameEn: 'Premium Himsagar Mango',
          price: 130,
          image: '',
          category: 'popular'
        },
        packageType: '12KG',
        quantity: 1
      }
    ],
    cartTotal: 1560,
    deliveryFee: 100,
    grandTotal: 1660,
    amountToPay: 1660,
    date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  const orderDetails = location.state?.orderDetails || fallbackOrderDetails;

  // Real-time EmailJS Automated Scheduler Configuration
  const [emailAddress, setEmailAddress] = useState(orderDetails.email || '');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automated 5 minutes email countdown execution
  useEffect(() => {
    if (emailAddress && emailStatus === 'idle') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Auto dispatch email trigger
            sendEmailReceipt(emailAddress);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [emailAddress, emailStatus]);

  const sendEmailReceipt = async (targetEmail = emailAddress) => {
    if (!targetEmail || !targetEmail.includes('@')) {
      setEmailStatus('failed');
      setErrorMessage(lang === 'bn' ? 'দয়া করে একটি সঠিক জিমেইল বা ইমেইল এড্রেস লিখুন।' : 'Please enter a valid active email address.');
      return;
    }

    setEmailStatus('sending');
    setErrorMessage('');
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // List item details listed clearly
    const itemsSummary = orderDetails.cartItems.map((item: any) => {
      const name = item.product.nameEn || item.product.name;
      const amount = item.packageType === '12KG' ? '12 KG' : '24 KG';
      return `${name} (${amount}) x ${item.quantity}`;
    }).join(', ');

    const templateParams = {
      to_name: orderDetails.customerName,
      to_email: targetEmail.trim(),
      order_id: orderDetails.orderId,
      receipt_no: orderDetails.receiptNo || 'MEMO-2026-9042',
      grand_total: `BDT ${orderDetails.grandTotal.toLocaleString()}`,
      delivery_address: `${orderDetails.address}, ${orderDetails.upazila}, ${orderDetails.district}, ${orderDetails.division}`,
      items_summary: itemsSummary,
      contact_phone: orderDetails.phone,
      reply_to: 'ambahar04@gmail.com'
    };

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'service_default';
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'template_default';
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      // Offline sandbox backup simulator for easy offline tests
      setTimeout(() => {
        console.log("No VITE_EMAILJS_PUBLIC_KEY configured yet. Simulated Email response details:", templateParams);
        setEmailStatus('sent');
      }, 1500);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setEmailStatus('sent');
    } catch (err: any) {
      console.error("EmailJS sending error: ", err);
      setEmailStatus('failed');
      setErrorMessage(err?.text || err?.message || 'Connection error. Please check your keys in Vercel configuration.');
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = generateOrderPDF(orderDetails, receiptLang);
      doc.save(`Aam_Bahar_Receipt_${orderDetails.orderId}.pdf`);
    } catch (err) {
      console.error("Error generating pdf: ", err);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim()) {
      const colors = ['bg-[#00453e]', 'bg-[#FF6B35]', 'bg-[#40916c]', 'bg-[#e63946]', 'bg-[#f58220]', 'bg-[#2a9d8f]', 'bg-[#264653]'];
      const bgs = colors[Math.floor(Math.random() * colors.length)];
      
      const defaultName = orderDetails.customerName || (lang === 'bn' ? 'গ্রাহক' : 'Customer');
      
      addTestimonial({
        id: Date.now().toString(),
        initial: defaultName.charAt(0).toUpperCase(),
        initialEn: 'C',
        bg: bgs,
        name: defaultName,
        nameEn: 'Customer',
        location: `${orderDetails.district || (lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh')}`,
        locationEn: 'Bangladesh',
        text: reviewText,
        textEn: reviewText,
        rating: rating,
        date: new Date().toISOString(),
      });
      setIsReviewSubmitted(true);
    }
  };

  // Remaining due to collect on delivery
  const isCOD = orderDetails.paymentMethod === 'cod';
  const isHalf = orderDetails.paymentMethod === 'mobile' && orderDetails.paymentAmount === 'half';
  const isFull = orderDetails.paymentMethod === 'mobile' && orderDetails.paymentAmount === 'full';

  const paidAmount = isCOD ? 0 : orderDetails.amountToPay;
  const dueAmount = orderDetails.grandTotal - paidAmount;

  // Format date dynamically based on active receipt language
  const formattedInvoiceDate = new Date().toLocaleDateString(receiptLang === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Helper to translate digits dynamically for time based on selected receipt language
  const formatTimeLocale = (timeStr?: string) => {
    if (!timeStr) {
      return new Date().toLocaleTimeString(receiptLang === 'bn' ? 'bn-BD' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    
    let result = timeStr;
    if (receiptLang === 'bn') {
      return result.replace(/[0-9]/g, (w) => '০১২৩৪৫৬৭৮৯'[parseInt(w)]);
    } else {
      return result.replace(/[০-৯]/g, (b) => {
        const idx = '০১২৩৪৫৬৭৮৯'.indexOf(b);
        return idx !== -1 ? idx.toString() : b;
      });
    }
  };

  const formattedInvoiceTime = formatTimeLocale(orderDetails.time);

  const handlePrintReceipt = () => {
    const printContent = document.getElementById('receipt-print-area');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank', 'width=800,height=950');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Am Bahar Invoice - ${orderDetails.orderId}</title>
            <meta charset="utf-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      primary: '#00453e',
                    },
                    fontFamily: {
                      sans: ['"Anek Bangla"', '"Outfit"', 'sans-serif'],
                      serif: ['"Playfair Display"', 'serif'],
                    }
                  }
                }
              }
            </script>
            <style>
              body {
                font-family: 'Anek Bangla', 'Outfit', sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color: #2d3748;
              }
              @media print {
                .no-print { display: none !important; }
                body { padding: 0; background: white; }
                .print-border { border: none !important; box-shadow: none !important; }
              }
            </style>
          </head>
          <body class="bg-gray-50 py-8 px-4">
            <div class="max-w-2xl mx-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-sm print-border">
              ${printContent.innerHTML}
              
              <div class="mt-8 pt-6 border-t border-dashed border-gray-200 text-center no-print">
                <button onclick="window.print();" class="bg-[#00453e] hover:bg-[#003630] text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md mr-3 inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  ${receiptLang === 'bn' ? 'ডাউনলোড / প্রিন্ট করুন' : 'Download / Print Receipt'}
                </button>
                <button onclick="window.close();" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-all">
                  ${receiptLang === 'bn' ? 'বন্ধ করুন' : 'Close Window'}
                </button>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 py-12 md:py-16 bg-bg-site animate-in fade-in duration-500">
      
      {/* Thank you card */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md max-w-2xl w-full text-center border-t-8 border-primary relative z-10 mb-8">
        <div className="flex justify-center mb-5 animate-bounce">
          <CheckCircle className="text-primary w-20 h-20" />
        </div>
        
        <h1 className="text-2xl md:text-3.5xl font-serif font-bold text-gray-800 mb-3">
          {lang === 'bn' ? 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!' : 'Order Placed Successfully!'}
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 mb-6 font-bangla">
          {lang === 'bn' 
            ? 'আপনার আমের অর্ডারটি সফলভাবে দাখিল করা হয়েছে। নিচে পেমেন্ট রিসিট ও অর্ডার সামারি দেওয়া হলো।' 
            : 'Your mango order request has been received. Your payment receipt and order summary are listed below.'}
        </p>
      </div>

      {/* Email Delivery Automation Scheduler */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md max-w-2xl w-full border border-gray-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100">
          <div 
            className="h-full bg-primary transition-all duration-1000" 
            style={{ width: `${(timeLeft / 300) * 100}%` }}
          ></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-4 text-left w-full md:w-auto">
            <div className="p-3 bg-primary/5 text-primary rounded-xl shrink-0 mt-1">
              <Mail className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#f58220] font-sans">
                {lang === 'bn' ? 'ফ্রি ইমেইল অটোমেশন' : 'FREE EMAIL AUTOMATION'}
              </h2>
              <h3 className="text-base font-bold text-gray-800 font-sans mt-0.5">
                {lang === 'bn' ? 'অর্ডার মেমো ও পিডিএফ রশিদ প্রেরণ' : 'Digital Confirmation Receipt'}
              </h3>
              
              <p className="text-xs text-gray-500 font-bangla mt-1 leading-relaxed max-w-sm">
                {lang === 'bn' 
                  ? 'আপনার অর্ডার সাবমিশনের ৫ মিনিটের মাথায় ক্যাশ মেমো রশিদটি জিমেইলে অটোমেটিক চলে যাবে।' 
                  : 'Your automated transactional receipt starts dispatch sequence in 5 minutes.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
            <div className="bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-2xl flex items-center gap-3.5 shadow-inner">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <span className="text-xs font-bold text-[#f58220] animate-ping font-mono">⏱️</span>
              </div>
              <div className="text-left font-mono">
                <span className="text-lg font-black text-gray-800">
                  {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] text-gray-400 block tracking-tight uppercase">
                  {lang === 'bn' ? 'বিতরণ অবশিষ্ট সময়' : 'Time Scheduled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 text-left space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5 items-end">
            <div className="w-full">
              <label className="block text-[11px] font-bold text-gray-700 font-bangla mb-1.5 uppercase tracking-wide">
                {lang === 'bn' ? 'রিসিট পাঠানোর ইমেইল এড্রেস :' : 'Recipient Email Address :'}
              </label>
              <div className="relative">
                <input 
                  type="email"
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    if (emailStatus === 'sent' || emailStatus === 'failed') {
                      setEmailStatus('idle');
                    }
                  }}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-300 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <button
              onClick={() => sendEmailReceipt(emailAddress)}
              disabled={emailStatus === 'sending'}
              className="w-full sm:w-auto shrink-0 bg-[#00453e] hover:bg-[#003630] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 disabled:opacity-50"
            >
              {emailStatus === 'sending' ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>{lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>{lang === 'bn' ? 'এখনই পাঠান' : 'Send Now'}</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback Indicators */}
          {emailStatus === 'sent' && (
            <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-green-700 text-xs font-bold font-bangla flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <span>
                {lang === 'bn' 
                  ? 'আপনার ইমেইলটি সফলভাবে সেন্ড করা হয়েছে! ইনবক্সটি চেক করুন।' 
                  : 'Email successfully sent! Please check your folder if not loaded.'}
              </span>
            </div>
          )}

          {emailStatus === 'failed' && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-semibold font-bangla flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
              <span>
                {errorMessage || (lang === 'bn' ? 'ইমেইল পাঠাতে ব্যর্থ হয়েছে। সঠিক ইমেইল দিন।' : 'Email transmission failed. Provide a correct email.')}
              </span>
            </div>
          )}

          {emailStatus === 'idle' && !emailAddress && (
            <div className="p-3 bg-amber-50/50 border border-amber-200/50 rounded-xl text-[#b25e1a] text-xs font-semibold font-bangla flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>
                {lang === 'bn' 
                  ? 'ইমেইল অ্যাড্রেস খুঁজে পাওয়া যায়নি। পিডিএফ ই-রিসিট পেতে উপরে ইমেইল লিখে "এখনই পাঠান" বাটনে ক্লিক করুন।' 
                  : 'Email not set. Please enter your email address to receive your digital invoice copy.'}
              </span>
            </div>
          )}
        </div>
      </div>


      {/* Language Switcher Card Specifically for Receipt */}
      <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-[#f58220] hidden sm:inline shrink-0" />
          <p className="text-xs md:text-sm font-bold text-gray-700 font-bangla text-center sm:text-left">
            {lang === 'bn' 
              ? 'মেমো রশিদ বা পেমেন্ট রিসিটটি ডাউনলোড করার জন্য নিচের ভাষা পরিবর্তন করতে পারেন:' 
              : 'Choose the language below to format and download the payment memo:'}
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 overflow-hidden shrink-0">
          <button 
            type="button"
            onClick={() => setReceiptLang('bn')} 
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${receiptLang === 'bn' ? 'bg-[#00453e] text-white shadow-sm' : 'text-gray-600 hover:text-gray-950'}`}
          >
            বাংলা রিসিট
          </button>
          <button 
            type="button"
            onClick={() => setReceiptLang('en')} 
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${receiptLang === 'en' ? 'bg-[#f58220] text-white shadow-sm' : 'text-gray-600 hover:text-gray-950'}`}
          >
            English Memo
          </button>
        </div>
      </div>

      {/* RENDERABLE BILLING RECEIPT CARD */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8 relative">
        <div className="absolute top-0 right-0 bg-[#f58220] text-white text-[11px] font-bold py-1 px-4 rounded-bl-lg">
          {receiptLang === 'bn' ? 'অফিসিয়াল মেমো রিসিট' : 'OFFICIAL MEMO RECEIPT'}
        </div>

        {/* PRINT TARGET AREA START */}
        <div id="receipt-print-area" className="p-6 md:p-10 font-sans text-gray-800 bg-white">
          
          {/* Top Header Section matching the image style but strictly tailored to user request */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 mb-4 border-b border-gray-100/80">
            {/* Left Column: Company Brand block with Logo + Info */}
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-full bg-orange-50/50 border border-orange-100/80 flex items-center justify-center shrink-0 p-1.5 shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="Aam Bahar Logo" 
                  className="w-14 h-14 object-contain" 
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.classList.remove('hidden');
                    }
                  }} 
                />
                <div className="hidden text-center">
                  <span className="text-2xl">🥭</span>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none font-serif">
                  {receiptLang === 'bn' ? 'আম বাহার' : 'Aam Bahar'}
                </h2>
                <div className="text-gray-500 font-bangla text-xs space-y-0.5 mt-1.5 leading-relaxed">
                  <p className="flex items-center gap-1.5 font-medium text-gray-700">
                    <MapPin size={14} className="text-red-500 shrink-0" />
                    <span>{receiptLang === 'bn' ? 'শ্রীপুর, গাজীপুর, বাংলাদেশ, ১৭২০' : 'Sreepur, Gazipur, Bangladesh, 1720'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold text-xs">📞</span>
                    <span className="font-semibold text-gray-700">+8801919270836</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-sans">
                    <span className="text-blue-500 text-xs">✉️</span>
                    <span className="text-gray-600">ambahar04@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Decorative active organic state badge */}
            <div className="hidden sm:flex flex-col items-end text-right select-none">
              <div className="bg-[#00453e]/5 text-[#00453e] px-4 py-2 rounded-2xl border border-[#00453e]/10 text-xs font-bold font-serif flex items-center gap-1.5 shadow-sm">
                <span className="text-emerald-600 font-bold">🍀</span>
                <span>{receiptLang === 'bn' ? 'শতভাগ বিশুদ্ধ ও বিষমুক্ত আম' : '100% Organic & Chemical Free'}</span>
              </div>
            </div>
          </div>

          {/* Styled Order Memo/Receipt title section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 mt-5 pb-3 border-b border-gray-100">
            <div className="text-left">
              <span className="text-[10px] tracking-widest font-extrabold text-[#f58220] uppercase font-sans">
                OFFICIAL MEMO RECEIPT
              </span>
              <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-[#00453e] font-sans mt-0.5">
                {receiptLang === 'bn' ? 'অর্ডার মেমো রশিদ' : 'ORDER RECEIPT'}
              </h1>
            </div>
            <div className="h-1.5 w-16 bg-[#f58220] mt-2 md:mt-0 rounded-full"></div>
          </div>

          {/* Billed To vs Invoice Stats info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Customer Information (Billed To) */}
            <div className="space-y-2 text-left">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#f58220] border-b border-gray-100 pb-1">
                {receiptLang === 'bn' ? 'অর্ডারকারীর নাম, ঠিকানা ও যোগাযোগ তথ্য:' : 'Customer Name, Address & Contact Info'}
              </h3>
              <p className="font-extrabold text-gray-900 text-base">{orderDetails.customerName}</p>
              <div className="text-xs text-gray-600 leading-relaxed font-bangla space-y-1">
                <p><span className="font-semibold text-gray-800">{receiptLang === 'bn' ? 'মোবাইল নাম্বার:' : 'Phone:'}</span> {orderDetails.phone}</p>
                {orderDetails.email && (
                  <p><span className="font-semibold text-gray-800">{receiptLang === 'bn' ? 'ইমেল এড্রেস:' : 'Email:'}</span> {orderDetails.email}</p>
                )}
                <p className="pt-1 text-gray-700 leading-relaxed max-w-sm border-t border-gray-100/50 mt-1">
                  <span className="font-semibold text-gray-800">{receiptLang === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Shipping Address:'}</span> {orderDetails.address}, {orderDetails.upazila}, {orderDetails.district}, {orderDetails.division}
                </p>
              </div>
            </div>

            {/* Receipt Stats Information (Invoice info) */}
            <div className="md:text-right flex flex-col justify-between h-full space-y-4">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#f58220] border-b border-gray-100 pb-1 md:text-right font-bangla">
                  {receiptLang === 'bn' ? 'মেমো রিসিট বিবরণ:' : 'Receipt Data'}
                </h3>
                <div className="text-xs text-gray-600 space-y-2.5 md:inline-block md:text-right md:w-full">
                  <div className="flex justify-between md:justify-end md:gap-4 border-b border-gray-100/50 pb-1">
                    <span className="font-semibold text-gray-700">{receiptLang === 'bn' ? 'মেমো রিসিট নাম্বার:' : 'Receipt #'}</span>
                    <span className="font-mono font-bold text-red-600 tracking-wider text-sm">
                      {orderDetails.receiptNo || 'MEMO-2026-9042'}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-end md:gap-4 border-b border-gray-100/50 pb-1">
                    <div className="text-left md:text-right">
                      <span className="font-extrabold text-[#00453e]">{receiptLang === 'bn' ? 'অর্ডার নাম্বার (ট্র্যাকিং আইডি):' : 'Order ID (Tracking):'}</span>
                      <span className="text-[10px] text-gray-400 block">{receiptLang === 'bn' ? '(অর্ডার ট্র্যাক করতে এটি ব্যবহার করুন)' : '(Use this to track your order)'}</span>
                    </div>
                    <span className="font-mono font-black text-[#00453e] tracking-wider text-sm md:text-base self-center bg-[#00453e]/5 px-2.5 py-1 rounded">
                      {orderDetails.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-end md:gap-4 font-bangla border-b border-gray-100/50 pb-1">
                    <span className="font-semibold text-gray-700">{receiptLang === 'bn' ? 'মেমো তারিখ:' : 'Memo Date:'}</span>
                    <span className="font-bold text-gray-900">{formattedInvoiceDate}</span>
                  </div>
                  <div className="flex justify-between md:justify-end md:gap-4 font-bangla border-b border-gray-100/50 pb-1">
                    <span className="font-semibold text-gray-700">{receiptLang === 'bn' ? 'মেমো সময়:' : 'Memo Time:'}</span>
                    <span className="font-bold text-gray-900">{formattedInvoiceTime}</span>
                  </div>
                  <div className="flex justify-between md:justify-end md:gap-4 font-bangla">
                    <span className="font-semibold text-gray-700">{receiptLang === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Method'}</span>
                    <span className="font-bold text-gray-900 font-sans">
                      {isCOD ? (receiptLang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)') : (receiptLang === 'bn' ? 'মোবাইল ব্যাংক পেমেন্ট' : 'Mobile Banking Pay')}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-end md:gap-4 font-bangla animate-pulse">
                    <span className="font-semibold text-gray-700">{receiptLang === 'bn' ? 'পেমেন্ট স্ট্যাটাস:' : 'Booking Status'}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      isCOD 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : isHalf 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isCOD 
                        ? (receiptLang === 'bn' ? 'ডেলিভারিতে সম্পূর্ণ প্রদেয়' : 'Pay on Delivery') 
                        : isHalf 
                          ? (receiptLang === 'bn' ? '৫০% এডভান্স বুকিং পরিশোধিত' : '50% Booking Paid') 
                          : (receiptLang === 'bn' ? '১০০% সম্পূর্ণ পরিশোধিত' : '100% Fully Paid')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Items Table with navy/forest green standard styling */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-[#00453e] text-white font-bangla border-b border-gray-200">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-center w-16">{receiptLang === 'bn' ? 'পরিমাণ' : 'QTY'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">{receiptLang === 'bn' ? 'আমের জাত ও বিবরণ' : 'Description'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">{receiptLang === 'bn' ? 'একক মূল্য' : 'Unit Price'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">{receiptLang === 'bn' ? 'মোট দাম' : 'Amount'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-bangla">
                {orderDetails.cartItems.map((item, index) => {
                  const name = receiptLang === 'bn' ? item.product.name : item.product.nameEn;
                  const kgAmount = item.packageType === '12KG' ? 12 : 24;
                  const itemPriceSub = item.product.price * kgAmount * item.quantity;
                  const itemUnitValPrice = item.product.price * kgAmount;
                  return (
                    <tr key={index} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 text-center font-extrabold text-gray-900 border-r border-gray-100 text-sm">
                        {item.quantity}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">{name}</p>
                        <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                          Package: {item.packageType === '12KG' ? (receiptLang === 'bn' ? '১২ কেজি ক্যারেট' : '12 KG Crate') : (receiptLang === 'bn' ? '২৪ কেজি ক্যারেট' : '24 KG Crate')} ({item.product.price} BDT / Kg)
                        </p>
                        {item.itemOrderId && (
                          <div className="inline-block text-[9px] text-[#00453e] font-extrabold mt-1.5 bg-[#00453e]/5 px-2 py-0.5 rounded">
                            {receiptLang === 'bn' ? 'পণ্য ট্র্যাকিং নাম্বার: ' : 'Track # '} {item.itemOrderId}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-gray-800">
                        ৳{itemUnitValPrice.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-gray-900 text-sm">
                        ৳{itemPriceSub.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Section aligned right */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-6 mb-6">
            {/* Note placeholder to balance space */}
            <div className="hidden sm:block"></div>

            {/* Price lines */}
            <div className="w-full sm:w-72 text-xs space-y-2.5 font-bangla">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">{receiptLang === 'bn' ? 'সাবটোটাল (আমের মূল্য):' : 'Subtotal:'}</span>
                <span className="font-semibold text-gray-700 text-sm">৳{orderDetails.cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">{receiptLang === 'bn' ? 'ডেলিভারি চার্জ (শিপিং):' : 'Delivery / Shipping:'}</span>
                <span className="font-semibold text-gray-700 text-sm">৳{orderDetails.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-900 border-t border-gray-200 pt-2.5 font-extrabold text-sm sm:text-base">
                <span>{receiptLang === 'bn' ? 'সর্বমোট প্রদেয় মূল্য (টোটাল BDT):' : 'Grand Total (BDT):'}</span>
                <span className="text-[#00453e] font-sans font-extrabold text-base md:text-lg">৳{orderDetails.grandTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100 text-xs">
                <span className="font-medium">{receiptLang === 'bn' ? 'পরিশোধ করা হয়েছে (এডভান্স):' : 'Amount Paid Already:'}</span>
                <span className="font-bold">৳{paidAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-red-800 bg-red-50 px-3 py-2 rounded text-xs sm:text-sm font-extrabold border border-red-100">
                <span>{receiptLang === 'bn' ? 'ডেলিভারিতে ক্যাশ সংগ্রহযোগ্য (বাকি):' : 'Collect on Delivery Due:'}</span>
                <span className="text-red-700 bg-white px-2 py-0.5 rounded border border-red-200">৳{dueAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Critical Warnings / Policies "Notes" section matching image and including required information */}
          <div className="space-y-3 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-1 font-sans">
              {receiptLang === 'bn' ? 'বিশেষ নোটিশ ও সতর্কতাবালী (গুরুত্বপূর্ণ তথ্য) :' : 'Notes & Important Terms:'}
            </h3>
            
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 text-[11px] sm:text-xs text-gray-700 font-bangla space-y-2.5 leading-relaxed">
              <p className="font-bold text-[#b25e1a] text-xs sm:text-sm flex items-center gap-1.5">
                <span>📢</span>
                {receiptLang === 'bn' ? 'প্রিয় গ্রাহক, পণ্য গ্রহণের আগে নিচের বিষয়গুলো মনোযোগ সহকারে পড়ুন:' : 'Dear customer, please read the rules below carefully before receiving goods:'}
              </p>
              
              <ul className="list-decimal pl-4.5 space-y-1.5 text-gray-600">
                <li>
                  <strong className="text-red-700 font-extrabold">
                    {receiptLang === 'bn' ? 'আম পচা পলিসি:' : 'Mango Damage policy:'}
                  </strong>{' '}
                  {receiptLang === 'bn' 
                    ? '৪ থেকে ৫ টা আম পচা থাকলে সেটা রিটার্নযোগ্য নহে।' 
                    : 'If only 4 to 5 mangoes are found damaged, it is not eligible for return.'}
                </li>
                <li>
                  {receiptLang === 'bn' 
                    ? 'কুরিয়ার থেকে আম বুঝে নেওয়ার সময় অবশ্যই সবার আগে কুরিয়ারম্যানের সামনে আমের ক্যারেট বা বক্স খুলে সম্পূর্ণ চেক ও গণনা করে নিবেন। পরবর্তীতে কোনো অভিযোগ গ্রহণ করা হবে না।' 
                    : 'Ensure opening and validating the contents of the cargo crate directly in front of the courier executive. Claims after confirmation will not be accepted.'}
                </li>
                <li>
                  <span className="font-semibold text-gray-800">
                    {receiptLang === 'bn' ? 'অফিসিয়াল লেনদেন নম্বরসমূহ:' : 'Official Personal payment channels:'}
                  </span>{' '}
                  {receiptLang === 'bn' 
                    ? 'বিকাশ পার্সোনাল নাম্বার : 01303456220 , নগদ পার্সোনাল নাম্বার : 01957821195।' 
                    : 'bKash Personal: 01303456220, Nagad Personal: 01957821195.'}
                </li>
                <li>
                  {receiptLang === 'bn' 
                    ? 'অর্ডার ট্র্যাকিং অথবা ডেলিভারি সংক্রান্ত যেকোনো জটিলতায় বা সহায়তায় সরাসরি মোবাইল কল দিন: 01919-270836 অথবা হোয়াটসঅ্যাপ করুন: +880 13 0345 6220।' 
                    : 'For immediately shipping assistance or inquiries, please feel free to call us at 01919-270836 or chat with WhatsApp: +880 13 0345 6220.'}
                </li>
                <li>
                  {receiptLang === 'bn' 
                    ? 'আমাদের ঐতিহ্যবাহী আম বাগান থেকে বাছাইকৃত তাজা আম আপনার পরিবারের মিষ্টতা হয়ে পৌঁছাক। শুভকামনা আম বাহার!' 
                    : 'Thank you for your business! We hope our handpicked fresh orchard mangoes bring sweet joy to your family. am-bahar.com'}
                </li>
              </ul>
            </div>
          </div>

          {/* Footer of the printed page */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-sans">
            <span className="font-semibold">Powered by am-bahar.com</span>
            <span>{receiptLang === 'bn' ? 'ডিজিটাল ই-ইনভয়েস কপি' : 'Digital Invoice Copy'}</span>
          </div>

        </div>
        {/* PRINT TARGET AREA END */}

        {/* User Interaction Controls on UI */}
        <div className="bg-gray-50 px-6 py-5 border-t border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-bold text-gray-700 font-bangla">
              {receiptLang === 'bn' 
                ? 'রিসিপ্ট ডাউনলোড ও অফলাইন প্রিন্ট :' 
                : 'Receipt Download & Offline Print:'}
            </p>
            <p className="text-[11px] text-gray-500 font-bangla mt-0.5">
              {receiptLang === 'bn' 
                ? 'নিচের বোতামগুলো ব্যবহার করে চালানের পিডিএফ সংরক্ষণ করুন অথবা সরাসরি প্রিন্ট করুন।' 
                : 'Save structural invoice PDF or direct-launch paper printing options.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <button 
              onClick={handlePrintReceipt}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 px-4.5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Printer size={15} className="text-gray-600" />
              <span>{receiptLang === 'bn' ? 'রশিদ প্রিন্ট করুন' : 'Print Receipt'}</span>
            </button>
            
            <button 
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto bg-[#00453e] hover:bg-[#003630] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
            >
              <Download size={15} />
              <span>{receiptLang === 'bn' ? 'পিডিএফ ডাউনলোড' : 'Download PDF Receipt'}</span>
            </button>
          </div>
        </div>


      </div>

      {/* Floating Action Navigation to Return Home */}
      <div className="w-full max-w-2xl mb-8">
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary text-white text-base font-bold rounded-xl shadow-lg hover:bg-[#006b5e] hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <ShoppingBag size={18} />
          <span>{lang === 'bn' ? 'মূল পাতায় ফিরে যান (হোম)' : 'Return to Home Shop'}</span>
        </Link>
      </div>

      {/* Customer Review Section */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 text-gray-800 text-center">
          {lang === 'bn' ? 'আমাদের পরিষেবা সম্পর্কে আপনার মূল্যবান মতামতটি লিখুন' : 'Share Your Purchase Experience'}
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6 font-bangla">
          {lang === 'bn' 
            ? 'আপনার মতামত আমাদের আরও ভালো মানের রাজশাহীর আম সরবরাহ করতে উৎসাহিত করবে।' 
            : 'Your feedback inspires us to supply better quality premium mangoes.'}
        </p>
        
        {isReviewSubmitted ? (
          <div className="text-center py-6 text-green-600 bg-green-50 rounded-xl border border-green-100">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="font-bold">{lang === 'bn' ? 'রিভিউ প্রদানের জন্য আপনাকে ধন্যবাদ!' : 'Thank you for your valuable review!'}</p>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-colors hover:scale-110 ${star <= rating ? 'text-[#f5a623]' : 'text-gray-300'}`}
                >
                  <Star fill={star <= rating ? 'currentColor' : 'none'} size={28} />
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider font-bangla">
                {lang === 'bn' ? 'মতামত লিখুন' : 'Write your review text'}
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder={lang === 'bn' ? 'আমের গুণমান অথবা আমাদের গ্রাহক সার্ভিস সম্পর্কে আপনার কেমন লাগলো?' : 'How was the mango freshness or website design experience?'}
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-[#006b5e] transition-colors shadow-sm"
            >
              {lang === 'bn' ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
