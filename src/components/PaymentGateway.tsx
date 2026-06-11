import { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';

interface PaymentGatewayProps {
  amount: number;
  onSuccess: (method: string) => void;
  onClose: () => void;
}

type PaymentStep = 'select' | 'transaction' | 'processing';

export default function PaymentGateway({ amount, onSuccess, onClose }: PaymentGatewayProps) {
  const [step, setStep] = useState<PaymentStep>('select');
  const [method, setMethod] = useState<'bkash' | 'nagad' | null>(null);
  const [trxId, setTrxId] = useState('');
  const lang = useStore(state => state.lang);

  const primaryColor = method === 'nagad' ? '#f58220' : '#d01861';
  const buttonColor = method === 'nagad' ? '#e67300' : '#c50c18';
  const shopNumber = method === 'nagad' ? '01957821195' : '01303456220';

  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => {
        onSuccess(method || 'mobile');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleVerify = () => {
    if (trxId.length > 5) {
      setStep('processing');
    } else {
      alert(lang === 'bn' ? 'অনুগ্রহ করে সঠিক ট্রানসজেকশন আইডি দিন।' : 'Please enter a valid Transaction ID.');
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(shopNumber);
    alert(lang === 'bn' ? 'নম্বর কপি করা হয়েছে!' : 'Number copied!');
  };

  const name = method === 'nagad' ? 'Nagad' : 'bKash';
  const ussd = method === 'nagad' ? '*167#' : '*247#';

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(242, 246, 252, 0.95)' }} onClick={onClose}>
      {/* Background pattern matching Robo Topup slightly */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="w-full max-w-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden animate-in zoom-in-95 duration-200 rounded-lg relative flex flex-col min-h-[500px]" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }} 
          className="absolute top-4 right-4 w-10 h-10 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-full flex items-center justify-center transition-all z-[9999] shadow-md border border-red-200 cursor-pointer font-sans text-xl font-bold"
          aria-label="Close"
          title="Close"
        >
          ✕
        </button>

        {step === 'select' && (
          <div className="p-6 md:p-10 flex flex-col items-center justify-center flex-1">
            <div className="flex items-center gap-6 mb-12">
              <img src="/logo.png" alt="Aam Bahar Logo" className="h-40 md:h-48 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'flex'; }} />
              <div className="hidden items-center gap-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center border shadow-sm p-2 flex-shrink-0 relative overflow-hidden bg-orange-50">
                  <span className="text-primary font-bold text-center leading-tight text-xl px-2">AB</span>
                  <div className="absolute inset-0 rounded-full border-primary border opacity-20"></div>
                </div>
                <h2 className="text-2xl font-bold text-slate-500 tracking-wide uppercase">{lang === 'bn' ? 'আম বাহার' : 'AAM BAHAR'}</h2>
              </div>
            </div>
            
            <div className="bg-[#0052cc] text-white py-3 px-4 rounded w-full max-w-lg text-center font-medium mb-8 shadow-sm">
              Mobile Banking
            </div>

            <div className="flex justify-center gap-6 mb-12">
              <button 
                onClick={() => { setMethod('bkash'); setStep('transaction'); }}
                className="w-[130px] h-16 border rounded-lg flex items-center justify-center hover:shadow-md transition-all cursor-pointer bg-white overflow-hidden p-2"
              >
                <img src="/bkash.png" alt="bKash" className="h-8 md:h-9 object-contain" />
              </button>
              <button 
                onClick={() => { setMethod('nagad'); setStep('transaction'); }}
                className="w-[130px] h-16 border rounded-lg flex items-center justify-center hover:shadow-md transition-all cursor-pointer bg-white overflow-hidden p-2"
              >
                <img src="/nogod.png" alt="Nagad" className="h-10 md:h-11 object-contain" />
              </button>
            </div>

            <div className="bg-[#eaf2ff] text-[#0052cc] font-semibold text-lg py-4 w-full max-w-lg text-center rounded shadow-sm">
              Pay {amount.toFixed(2)}
            </div>
          </div>
        )}

        {step === 'transaction' && method && (
          <div className="px-6 pb-12 flex flex-col items-center flex-1 justify-center animate-in slide-in-from-right-8 duration-300">
            <div className="w-full max-w-[600px] rounded shadow-md overflow-hidden" style={{ backgroundColor: primaryColor }}>
              
              <div className="py-4 text-center text-white text-[15px] font-medium border-b border-white/20 px-4">
                ট্রানসজেকশন আইডি দিন
              </div>

              <div className="p-6">
                <input 
                  type="text" 
                  autoFocus
                  value={trxId}
                  onChange={e => setTrxId(e.target.value)}
                  placeholder="ট্রানসজেকশন আইডি দিন"
                  className="w-full bg-white rounded py-3 px-4 text-gray-700 outline-none mb-6 shadow-inner text-sm"
                />

                <ul className="text-white text-[14px] space-y-3">
                  <li className="flex gap-3 items-start border-b border-white/20 pb-3">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">*{ussd} ডায়াল করে আপনার {name} মোবাইল মেনুতে যান অথবা {name} অ্যাপে যান।</span>
                  </li>
                  <li className="flex gap-3 items-start border-b border-white/20 pb-3">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug text-yellow-300 font-medium">"Send Money" <span className="text-white font-normal">-এ ক্লিক করুন।</span></span>
                  </li>
                  <li className="flex gap-3 items-center flex-wrap border-b border-white/20 pb-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন: <span className="font-bold text-yellow-300">{shopNumber}</span></span>
                    <button onClick={copyNumber} className="bg-black/20 hover:bg-black/30 px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ml-auto text-white">
                      <Copy size={12} /> Copy
                    </button>
                  </li>
                  <li className="flex gap-3 items-start border-b border-white/20 pb-3">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">টাকার পরিমাণ: <span className="font-bold text-yellow-300">{amount}</span></span>
                  </li>
                  <li className="flex gap-3 items-start border-b border-white/20 pb-3">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">নিশ্চিত করতে এখন আপনার {name} মোবাইল মেনু পিন লিখুন।</span>
                  </li>
                  <li className="flex gap-3 items-start border-b border-white/20 pb-3">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">সবকিছু ঠিক থাকলে, আপনি {name} থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></div>
                    <span className="leading-snug">এখন উপরের বক্সে আপনার <span className="text-yellow-300 font-bold">Transaction ID</span> দিন এবং নিচের <span className="text-yellow-300 font-bold">VERIFY</span> বাটনে ক্লিক করুন।</span>
                  </li>
                </ul>
              </div>

            </div>
            
            <button 
              onClick={handleVerify}
              className="w-full max-w-[600px] py-4 text-white font-bold text-lg rounded shadow-md mt-6 transition-colors hover:brightness-110"
              style={{ backgroundColor: buttonColor }}
            >
              VERIFY
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-current rounded-full animate-spin mb-6" style={{ color: primaryColor }}></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">পেমেন্ট যাচাই করা হচ্ছে...</h3>
            <p className="text-gray-500">দয়া করে অপেক্ষা করুন, পেজটি বন্ধ করবেন না।</p>
          </div>
        )}
      </div>
    </div>
  );
}
