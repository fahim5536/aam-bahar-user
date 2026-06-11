import React from 'react';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore(state => state.addToCart);
  const lang = useStore(state => state.lang);
  const navigate = useNavigate();
  
  const [packageType, setPackageType] = React.useState<'12KG' | '24KG'>('12KG');
  
  const isOutOfStock = product.stock === 'out_of_stock';
  const isPreOrder = product.stock === 'pre_order';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, packageType, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, packageType, 1);
    navigate('/checkout');
  };

  // Fake original price for design
  const currentPrice = product.price * (packageType === '12KG' ? 12 : 24);
  const originalPrice = Math.floor(currentPrice * 1.15); 
  const discountPercent = Math.round(( (originalPrice - currentPrice) / originalPrice ) * 100);

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col h-full relative">
      
      {/* Badges Overlay */}
      <div className="absolute top-0 right-0 z-10 flex flex-col items-end gap-1 p-2">
        {isPreOrder && (
          <span className="bg-[#f58220] text-white px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide">
            {lang === 'bn' ? 'প্রি-অর্ডার' : 'Pre Order'}
          </span>
        )}
        {!isOutOfStock && discountPercent > 0 && (
          <span className="bg-[#219653] text-white px-2 py-0.5 rounded text-xs font-medium tracking-wide">
            {lang === 'bn' ? `সেভ ${discountPercent}%` : `Save ${discountPercent}%`}
          </span>
        )}
      </div>

      {/* Image container */}
      <div 
        className="h-[220px] bg-slate-50 flex items-center justify-center relative overflow-hidden"
      >
        {/* We use an emoji instead of real image */}
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500"
          style={{ background: product.gradient }}
        >
          <span className="text-6xl select-none">{product.emoji}</span>
        </div>
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] z-10">
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
              {lang === 'bn' ? 'স্টক আউট' : 'Stock Out'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-5 flex flex-col flex-1 bg-white">
        <h3 className="text-[16px] md:text-[18px] font-medium text-gray-800 line-clamp-2 min-h-[46px] mb-2 leading-relaxed">
          {lang === 'bn' ? product.name : product.nameEn}
        </h3>
        
        <div className="flex flex-col gap-2 mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <p className="text-[18px] md:text-[20px] font-bold text-[#f58220]">
              ৳{currentPrice}
            </p>
            {!isOutOfStock && (
               <p className="text-[15px] font-medium text-gray-400 line-through">
                  ৳{originalPrice}
               </p>
            )}
          </div>
          
          <div className="bg-gray-50 rounded p-1 border border-gray-100 flex items-center justify-between mt-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setPackageType('12KG'); }}
              className={`flex-1 py-1 text-sm rounded transition-colors ${packageType === '12KG' ? 'bg-[#033621] text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {lang === 'bn' ? '১২ কেজি' : '12 KG'}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setPackageType('24KG'); }}
              className={`flex-1 py-1 text-sm rounded transition-colors ${packageType === '24KG' ? 'bg-[#033621] text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {lang === 'bn' ? '২৪ কেজি' : '24 KG'}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-2 w-full select-none">
          {isOutOfStock ? (
             <button 
               disabled
               className="xs:col-span-2 w-full py-2.5 rounded-lg text-sm font-bold text-red-500 border border-red-200 bg-red-50/55 opacity-60 cursor-not-allowed"
             >
               {lang === 'bn' ? 'স্টক শেষ' : 'Stock Out'}
             </button>
          ) : (
            <>
              <button 
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs md:text-sm font-semibold border border-[#f58220] text-[#f58220] hover:bg-orange-50 active:scale-95 transition-all"
                title={lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add To Cart'}
              >
                <ShoppingCart size={16} className="shrink-0" />
                <span>{lang === 'bn' ? 'কার্টে যোগ' : 'Add To Cart'}</span>
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs md:text-sm font-bold bg-[#f58220] text-white hover:bg-[#e0751a] hover:shadow-xs active:scale-95 transition-all"
              >
                <ShoppingBag size={16} className="shrink-0" />
                <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Buy Now'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
