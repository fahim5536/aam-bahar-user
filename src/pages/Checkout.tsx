import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from '../components/PaymentGateway';
import { divisionsAndDistricts } from '../data/districts';
import { saveOrderToFirestore } from '../lib/firebase';

export default function Checkout() {
  const cartItems = useStore(state => state.cartItems);
  const getCartTotal = useStore(state => state.getCartTotal);
  const lang = useStore(state => state.lang);
  const clearCart = useStore(state => state.clearCart);
  const addOrder = useStore(state => state.addOrder);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    payment: 'cod',
    paymentAmount: 'full', // 'full' | 'half'
  });

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const cartTotal = getCartTotal();
  const deliveryFee = cartItems.reduce((total, item) => {
    return total + (item.packageType === '12KG' ? 100 : 160) * item.quantity;
  }, 0);
  const grandTotal = cartTotal + deliveryFee;
  const halfPayment = Math.ceil(grandTotal / 2);

  const amountToPay = formData.paymentAmount === 'half' ? halfPayment : grandTotal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'division') {
      setFormData(prev => ({ ...prev, division: value, district: '', upazila: '' }));
    } else if (name === 'district') {
      setFormData(prev => ({ ...prev, district: value, upazila: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOrderSuccess = (orderId: string, receiptNo: string) => {
    // Generate separate, uniquely trackable items
    const trackedItems = cartItems.map((item, index) => {
      // 4 days from now dates
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);
      const deliveryDateBn = deliveryDate.toLocaleDateString('bn-BD', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      const deliveryDateEn = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      return {
        product: item.product,
        packageType: item.packageType,
        quantity: item.quantity,
        itemOrderId: `${orderId}-P${index + 1}`, // Clean separate tracking number for each product
        status: 'pending' as const,
        currentLocationBn: 'রাজশাহী প্রধান সংগ্রহশালা (প্যাকিং ও কুরিয়ার কনফার্মেশন চলছে)',
        currentLocationEn: 'Rajshahi Warehouse (Packing & courier confirmation in progress)',
        deliveryDateBn,
        deliveryDateEn
      };
    });

    const orderDetails = {
      orderId,
      receiptNo,
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      division: formData.division,
      district: formData.district,
      upazila: formData.upazila,
      address: formData.address,
      paymentMethod: formData.payment, // 'cod' | 'mobile'
      paymentAmount: formData.paymentAmount, // 'full' | 'half'
      cartItems: trackedItems,
      cartTotal,
      deliveryFee,
      grandTotal,
      amountToPay,
      date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date().toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    // Save synchronously to local state store for immediate UI transition
    addOrder(orderDetails);
    
    // Save asynchronously to shared Firestore backend in background
    saveOrderToFirestore(orderDetails).catch(err => {
      console.error("Firestore order upload failed:", err);
    });

    clearCart();
    navigate('/order-success', { state: { orderId, orderDetails } });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.division || !formData.district || !formData.upazila || !formData.address) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে সব তথ্য পূরণ করুন' : 'Please fill all required fields');
      return;
    }
    
    if (formData.payment === 'mobile') {
      setShowPaymentGateway(true);
    } else {
      // Generates two separate IDs as required: Order tracking ID and Memo receipt ID
      const orderId = 'AMB-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
      const receiptNo = 'MEMO-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      handleOrderSuccess(orderId, receiptNo);
    }
  };

  const onPaymentSuccess = () => {
    setShowPaymentGateway(false);
    const orderId = 'AMB-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
    const receiptNo = 'MEMO-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    handleOrderSuccess(orderId, receiptNo);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="text-6xl mb-6 opacity-30">🛒</div>
        <h2 className="text-2xl font-bold mb-4">
          {lang === 'bn' ? 'আপনার কার্ট খালি!' : 'Your cart is empty!'}
        </h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-[#006b5e] transition-colors"
        >
          {lang === 'bn' ? 'আম কেনাকাটা করুন' : 'Shop Mangoes'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative">
      {showPaymentGateway && (
        <PaymentGateway 
          amount={amountToPay} 
          onSuccess={onPaymentSuccess} 
          onClose={() => setShowPaymentGateway(false)} 
        />
      )}

      <h1 className="text-3xl font-serif font-bold text-center mb-10 text-text-main">
        {lang === 'bn' ? 'চেকআউট' : 'Checkout'}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Form */}
        <div className="w-full lg:w-[60%] bg-white p-6 md:p-8 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-bold border-b pb-4 mb-6">
            {lang === 'bn' ? 'ডেলিভারি তথ্য' : 'Delivery Information'}
          </h2>
          
          <form className="space-y-5" onSubmit={handleOrderSubmit} id="checkoutForm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                </label>
                <input required type="text" name="name" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'bn' ? 'মোবাইল নাম্বার *' : 'Phone Number *'}
                </label>
                <input required type="tel" name="phone" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
              </label>
              <input type="email" name="email" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'bn' ? 'বিভাগ সিলেক্ট করুন *' : 'Division *'}
                </label>
                <select 
                  required 
                  name="division" 
                  value={formData.division} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary bg-white focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="">{lang === 'bn' ? 'বিভাগ সিলেক্ট করুন' : 'Select Division'}</option>
                  {divisionsAndDistricts.map(division => (
                    <option key={division.name} value={division.name}>
                      {lang === 'bn' ? division.nameBn : division.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'bn' ? 'জেলা সিলেক্ট করুন *' : 'District *'}
                </label>
                <select 
                  required 
                  name="district" 
                  value={formData.district} 
                  onChange={handleChange} 
                  disabled={!formData.division}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary bg-white focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:bg-gray-100"
                >
                  <option value="">{lang === 'bn' ? 'জেলা সিলেক্ট করুন' : 'Select District'}</option>
                  {divisionsAndDistricts.find(div => div.name === formData.division)?.districts.map(district => (
                    <option key={district.name} value={district.name}>
                      {lang === 'bn' ? district.nameBn : district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'bn' ? 'থানা সিলেক্ট করুন *' : 'Thana/Upazila *'}
                </label>
                <select 
                  required 
                  name="upazila" 
                  value={formData.upazila} 
                  onChange={handleChange} 
                  disabled={!formData.district}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary bg-white focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:bg-gray-100"
                >
                  <option value="">{lang === 'bn' ? 'থানা সিলেক্ট করুন' : 'Select Thana'}</option>
                  {divisionsAndDistricts
                    .find(div => div.name === formData.division)
                    ?.districts.find(dist => dist.name === formData.district)
                    ?.upazilas.map(upazila => (
                      <option key={upazila.name} value={upazila.name}>
                        {lang === 'bn' ? upazila.nameBn : upazila.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'bn' ? 'সম্পূর্ণ ঠিকানা * (বাড়ি নং, রাস্তা, এলাকা)' : 'Full Address *'}
              </label>
              <textarea required rows={3} name="address" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
            </div>

            <h3 className="text-lg font-bold mt-8 border-b pb-3 mb-4">
              {lang === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}
            </h3>
            <div className="space-y-4">
              <label className={`flex flex-col gap-2 p-4 border rounded-xl cursor-pointer transition-all ${formData.payment === 'cod' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={handleChange} className="w-5 h-5 text-primary focus:ring-primary" />
                  <span className="font-bold text-gray-800">{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}</span>
                </div>
              </label>
              
              <label className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.payment === 'mobile' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <input type="radio" name="payment" value="mobile" checked={formData.payment === 'mobile'} onChange={handleChange} className="w-5 h-5 text-primary focus:ring-primary" />
                  <div className="flex items-center gap-3">
                    <img
                      src="/bkash.png"
                      alt="bKash" 
                      className="h-8 md:h-9 object-contain" 
                    />
                    <span className="text-gray-300 font-bold">/</span>
                    <img 
                      src="/nogod.png" 
                      alt="Nagad" 
                      className="h-10 md:h-11 object-contain" 
                    />
                  </div>
                </div>
                
                {formData.payment === 'mobile' && (
                  <div className="ml-8 mt-2 space-y-3 p-4 bg-white border border-primary/20 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      {lang === 'bn' ? 'পেমেন্টের পরিমাণ নির্বাচন করুন:' : 'Select Payment Amount:'}
                    </p>
                    <label className="flex items-center justify-between p-3 border rounded border-gray-200 hover:border-primary cursor-pointer w-full">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="paymentAmount" value="full" checked={formData.paymentAmount === 'full'} onChange={handleChange} className="text-primary" />
                        <span className="text-sm font-bold text-gray-800">{lang === 'bn' ? 'সম্পূর্ণ পেমেন্ট' : 'Full Payment'}</span>
                      </div>
                      <span className="font-bold text-primary">৳{grandTotal}</span>
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded border-gray-200 hover:border-primary cursor-pointer w-full">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="paymentAmount" value="half" checked={formData.paymentAmount === 'half'} onChange={handleChange} className="text-primary" />
                        <span className="text-sm font-bold text-gray-800">{lang === 'bn' ? '৫০% অগ্রিম' : '50% Advance'}</span>
                      </div>
                      <span className="font-bold text-primary">৳{halfPayment}</span>
                    </label>
                    
                    <div className="mt-3 text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-100 flex items-start gap-2">
                      <span className="text-yellow-600 text-sm">ℹ️</span>
                      {lang === 'bn' 
                        ? 'এটি একটি লাইভ পেমেন্ট গেটওয়ে সিমুলেশন হবে। আপনি অর্ডার নিশ্চিত করলে বিকাশ বা নগদের পেইজ আসবে।'
                        : 'This will load the live mobile payment gateway.'}
                    </div>
                  </div>
                )}
              </label>
            </div>
          </form>
        </div>

        {/* Right Summary */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-[#f9fafb] p-6 rounded-2xl border border-gray-100 flex flex-col gap-6 sticky top-28">
            <h2 className="text-xl font-bold">
              {lang === 'bn' ? 'অর্ডার সামারি' : 'Order Summary'}
            </h2>
            
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.packageType}`} className="flex gap-3 justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex gap-3 items-center">
                    <span className="text-2xl">{item.product.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{lang === 'bn' ? item.product.name : item.product.nameEn}</h4>
                      <p className="text-xs text-gray-500">
                        {item.packageType === '12KG' ? '12 KG' : '24 KG'} × {item.quantity} {lang === 'bn' ? 'প্যাকেজ' : 'Pack'}
                      </p>
                    </div>
                  </div>
                  <div className="font-bold text-primary">৳{item.product.price * (item.packageType === '12KG' ? 12 : 24) * item.quantity}</div>
                </div>
              ))}
            </div>

            {/* Special Notice / Return Limitation Warning */}
            <div className="border-t border-gray-200 pt-3">
              <div className="bg-red-50/90 border border-red-100 rounded-xl p-3.5 text-xs text-gray-700 font-bangla flex gap-2.5">
                <span className="text-red-500 text-sm leading-none shrink-0">⚠️</span>
                <div className="flex-1">
                  <p className="font-bold text-red-700 mb-0.5">
                    {lang === 'bn' ? 'রিটার্ন পলিসি বিশেষ দ্রষ্টব্য:' : 'Return Policy Note:'}
                  </p>
                  <p className="leading-relaxed">
                    {lang === 'bn' 
                      ? '৪ থেকে ৫ টা আম পচা থাকলে সেটা রিটার্নযোগ্য নহে।' 
                      : 'If only 4 to 5 mangoes are rotten, it is not eligible for return.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm font-medium text-gray-600">
              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'সর্বমোট মূল্য' : 'Subtotal'}</span>
                <span>৳{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
                <span>৳{deliveryFee}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xl font-bold text-primary">
              <span>{lang === 'bn' ? 'মোট খরচ' : 'Total'}</span>
              <span>৳{grandTotal}</span>
            </div>
            
            {formData.payment === 'mobile' && formData.paymentAmount === 'half' && (
              <div className="flex justify-between items-center text-base font-bold text-[#e2136e] mt-2 bg-pink-50 p-2 rounded">
                <span>{lang === 'bn' ? 'পেমেন্ট করতে হবে' : 'Amount to Pay'}</span>
                <span>৳{halfPayment}</span>
              </div>
            )}

            <button 
              type="submit" 
              form="checkoutForm"
              className="w-full bg-primary text-white py-4 mt-2 rounded-xl text-lg font-bold hover:bg-[#006b5e] transition-colors shadow-lg shadow-primary/20 flex flex-col items-center justify-center gap-1"
            >
              <span>{lang === 'bn' ? 'অর্ডার নিশ্চিত করুন' : 'Confirm Order'}</span>
              {formData.payment === 'mobile' && (
                <span className="text-xs font-normal opacity-80">
                  {lang === 'bn' ? `(৳${amountToPay} অনলাইনে পেমেন্ট করুন)` : `(Pay ৳${amountToPay} online)`}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
