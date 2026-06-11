import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, products as initialProducts } from '../data/products';

export interface CartItem {
  product: Product;
  packageType: '12KG' | '24KG';
  quantity: number;
}

export interface TrackedOrderItem {
  product: Product;
  packageType: '12KG' | '24KG';
  quantity: number;
  itemOrderId: string; // The unique tracking order number for this specific item/product
  status: 'pending' | 'processing' | 'harvesting' | 'shipped' | 'delivered';
  currentLocationBn: string;
  currentLocationEn: string;
  deliveryDateBn?: string;
  deliveryDateEn?: string;
}

export interface TrackedOrder {
  orderId: string; // The primary tracking order ID
  receiptNo?: string; // The separate memo receipt number matching requested format
  customerName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  paymentMethod: string;
  paymentAmount: string;
  cartItems: TrackedOrderItem[];
  cartTotal: number;
  deliveryFee: number;
  grandTotal: number;
  amountToPay: number;
  date: string;
  time?: string; // The specific time when the order was placed
}

interface AppState {
  // Cart State
  cartItems: CartItem[];
  addToCart: (product: Product, packageType: '12KG' | '24KG', quantity?: number) => void;
  removeFromCart: (productId: number, packageType: '12KG' | '24KG') => void;
  updateQuantity: (productId: number, packageType: '12KG' | '24KG', newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // UI State
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;

  // Search & Wishlist State
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlistOpen: boolean;
  setWishlistOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  
  // Language State
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  
  // Auth state
  isAdminAuth: boolean;
  setAdminAuth: (isAuth: boolean) => void;

  // Tracked Orders State
  orders: TrackedOrder[];
  addOrder: (order: TrackedOrder) => void;
  updateOrderStatus: (
    orderId: string, 
    itemOrderId: string, 
    status: 'pending' | 'processing' | 'harvesting' | 'shipped' | 'delivered',
    currentLocationBn: string,
    currentLocationEn: string,
    deliveryDateBn?: string,
    deliveryDateEn?: string
  ) => void;
  deleteOrder: (orderId: string) => void;

  // Dynamic Products State
  products: Product[];
  updateProduct: (id: number, updatedFields: Partial<Product>) => void;
  resetProducts: () => void;
  
  // Security Panel State
  adminPasscode: string;
  setAdminPasscode: (passcode: string) => void;
  securityAttemptCount: number;
  setSecurityAttemptCount: (count: number) => void;
  securityLockoutTime: number;
  setSecurityLockoutTime: (time: number) => void;
  securityLogs: Array<{ id: string; time: string; action: string; ip: string; status: 'AUTHORIZED' | 'BLOCKED' | 'SYSTEM' }>;
  addSecurityLog: (action: string, status: 'AUTHORIZED' | 'BLOCKED' | 'SYSTEM') => void;

  // Testimonials State
  testimonials: Array<{
    id?: string;
    initial: string;
    initialEn?: string;
    bg: string;
    name: string;
    nameEn?: string;
    location: string;
    locationEn?: string;
    text: string;
    textEn?: string;
    rating?: number;
    date?: string;
  }>;
  addTestimonial: (testimonial: any) => void;
  deleteTestimonial: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (product, packageType, quantity = 1) => set((state) => {
        const existing = state.cartItems.find(item => item.product.id === product.id && item.packageType === packageType);
        if (existing) {
          return {
            cartItems: state.cartItems.map(item => 
              (item.product.id === product.id && item.packageType === packageType) ? { ...item, quantity: item.quantity + quantity } : item
            )
          };
        }
        return { cartItems: [...state.cartItems, { product, packageType, quantity }] };
      }),
      
      removeFromCart: (productId, packageType) => set((state) => ({
        cartItems: state.cartItems.filter(item => !(item.product.id === productId && item.packageType === packageType))
      })),
      
      updateQuantity: (productId, packageType, newQuantity) => set((state) => ({
        cartItems: state.cartItems.map(item => 
          (item.product.id === productId && item.packageType === packageType) ? { ...item, quantity: Math.max(1, newQuantity) } : item
        )
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
            const kgAmount = item.packageType === '12KG' ? 12 : 24;
            return total + (item.product.price * kgAmount * item.quantity);
        }, 0);
      },
      
      getCartCount: () => get().cartItems.length,
      
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      wishlistItems: [],
      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlistItems.find(p => p.id === product.id);
        if (exists) {
          return { wishlistItems: state.wishlistItems.filter(p => p.id !== product.id) };
        }
        return { wishlistItems: [...state.wishlistItems, product] };
      }),
      isWishlistOpen: false,
      setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),
      
      isSearchOpen: false,
      setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      
      lang: 'bn',
      setLang: (lang) => set({ lang }),
      
      isAdminAuth: false,
      setAdminAuth: (isAdminAuth) => set({ isAdminAuth }),
      
      updateOrderStatus: (orderId, itemOrderId, status, currentLocationBn, currentLocationEn, deliveryDateBn, deliveryDateEn) => set((state) => ({
        orders: state.orders.map(order => {
          if (order.orderId === orderId) {
            return {
              ...order,
              cartItems: order.cartItems.map(item => {
                if (item.itemOrderId === itemOrderId) {
                  return {
                    ...item,
                    status,
                    currentLocationBn,
                    currentLocationEn,
                    deliveryDateBn,
                    deliveryDateEn
                  };
                }
                return item;
              })
            };
          }
          return order;
        })
      })),
      
      deleteOrder: (orderId) => set((state) => ({
        orders: state.orders.filter(order => order.orderId !== orderId)
      })),

      products: initialProducts,
      updateProduct: (id, updatedFields) => set((state) => ({
        products: state.products.map(product => 
          product.id === id ? { ...product, ...updatedFields } : product
        )
      })),
      resetProducts: () => set({ products: initialProducts }),

      adminPasscode: '7004',
      setAdminPasscode: (adminPasscode) => set({ adminPasscode }),
      
      securityAttemptCount: 0,
      setSecurityAttemptCount: (securityAttemptCount) => set({ securityAttemptCount }),
      
      securityLockoutTime: 0,
      setSecurityLockoutTime: (securityLockoutTime) => set({ securityLockoutTime }),
      
      securityLogs: [
        {
          id: 'log-sys-1',
          time: new Date().toISOString(),
          action: 'Intrusion Detection System activated. Shields armed.',
          ip: '127.0.0.1',
          status: 'SYSTEM'
        }
      ],
      addSecurityLog: (action, status) => set((state) => ({
        securityLogs: [
          {
            id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            time: new Date().toISOString(),
            action,
            ip: `103.112.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`,
            status
          },
          ...state.securityLogs
        ].slice(0, 50) // keep max 50 logs
      })),
      
      orders: [
        {
          orderId: 'AMB-918273',
          receiptNo: 'MEMO-2026-9042',
          customerName: 'নাবিল সায়মন',
          phone: '01712345678',
          email: 'nabil@example.com',
          division: 'Rajshahi',
          district: 'Chapainawabganj',
          upazila: 'Sadar',
          address: 'আম বাগান লেন, শিবগঞ্জ',
          paymentMethod: 'cod',
          paymentAmount: 'full',
          cartItems: [
            {
              product: {
                id: 1,
                name: 'হিমসাগর আম',
                nameEn: 'Himsagar Mango',
                category: 'himsagar',
                type: 'মৌসুমি আম',
                price: 130,
                unit: 'কেজি',
                minKg: 12,
                stock: 'available',
                emoji: '🥭',
                gradient: 'linear-gradient(135deg, #2d6a4f, #52b788)'
              },
              packageType: '12KG',
              quantity: 2,
              itemOrderId: 'AMB-918273-P1',
              status: 'harvesting',
              currentLocationBn: 'রাজশাহী শিবগঞ্জ আম বাগান (আম পাড়া শেষ হয়েছে, প্যাক করা হচ্ছে)',
              currentLocationEn: 'Rajshahi Shibganj Orchard (Harvesting completed, packing in progress)',
              deliveryDateBn: '২৪ মে, ২০২৬',
              deliveryDateEn: 'May 24, 2026'
            }
          ],
          cartTotal: 1560,
          deliveryFee: 100,
          grandTotal: 1660,
          amountToPay: 1660,
          date: 'মে ২০, ২০২৬',
          time: '০২:৩০ PM'
        },
        {
          orderId: 'AMB-384912',
          receiptNo: 'MEMO-2026-1184',
          customerName: 'তানজিনা আক্তার',
          phone: '01999999999',
          email: 'tanjina@example.com',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Mirpur',
          address: 'মিরপুর-২, ঢাকা',
          paymentMethod: 'mobile',
          paymentAmount: 'full',
          cartItems: [
            {
              product: {
                id: 2,
                name: 'আম্রপালি আম',
                nameEn: 'Amrapali Mango',
                category: 'amrapali',
                type: 'মৌসুমি আম',
                price: 110,
                unit: 'কেজি',
                minKg: 24,
                stock: 'available',
                emoji: '🥭',
                gradient: 'linear-gradient(135deg, #40916c, #74c69d)'
              },
              packageType: '24KG',
              quantity: 1,
              itemOrderId: 'AMB-384912-P1',
              status: 'shipped',
              currentLocationBn: 'ঢাকা সেন্ট্রাল হাব (কুরিয়ারে ডেলিভারির জন্য ডেলিভারিম্যানকে বুঝিয়ে দেওয়া হয়েছে)',
              currentLocationEn: 'Dhaka Central Hub (Handed over to delivery agent for home delivery)',
              deliveryDateBn: '২২ মে, ২০২৬',
              deliveryDateEn: 'May 22, 2026'
            }
          ],
          cartTotal: 2640,
          deliveryFee: 160,
          grandTotal: 2800,
          amountToPay: 2800,
          date: 'মে ২১, ২০২৬',
          time: '১১:১৫ AM'
        }
      ],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      
      testimonials: [
        {
          id: '1',
          initial: 'র',
          initialEn: 'R',
          bg: 'bg-[#00453e]',
          name: 'রহিমা বেগম',
          nameEn: 'Rahima Begum',
          location: 'ঢাকা',
          locationEn: 'Dhaka',
          text: 'সত্যিই অসাধারণ আম! কোনো কেমিক্যাল নেই, সারাজীবন এখান থেকেই কিনব।',
          textEn: 'Truly amazing mangoes! No chemicals, I will buy from here for the rest of my life.',
          rating: 5,
        },
        {
          id: '2',
          initial: 'ক',
          initialEn: 'K',
          bg: 'bg-[#FF6B35]',
          name: 'করিম সাহেব',
          nameEn: 'Karim Saheb',
          location: 'চট্টগ্রাম',
          locationEn: 'Chattogram',
          text: 'প্যাকেজিং চমৎকার, একটা আমও নষ্ট হয়নি। দ্রুত ডেলিভারি পেয়েছি।',
          textEn: 'Excellent packaging, not a single mango was damaged. Got fast delivery.',
          rating: 5,
        },
        {
          id: '3',
          initial: 'ত',
          initialEn: 'T',
          bg: 'bg-[#40916c]',
          name: 'তানভীর আহমেদ',
          nameEn: 'Tanvir Ahmed',
          location: 'সিলেট',
          locationEn: 'Sylhet',
          text: 'কর্পোরেট গিফট দিয়েছিলাম, সবাই অনেক প্রশংসা করেছে।',
          textEn: 'Gave as corporate gifts, everyone praised it a lot.',
          rating: 5,
        },
        {
          id: '4',
          initial: 'ম',
          initialEn: 'M',
          bg: 'bg-[#e63946]',
          name: 'মাহমুদ হাসান',
          nameEn: 'Mahmud Hasan',
          location: 'খুলনা',
          locationEn: 'Khulna',
          text: 'সেরা স্বাদের আম। আমার পরিবারের সবাই খুব পছন্দ করেছে।',
          textEn: 'Best tasting mangoes. My whole family liked it very much.',
          rating: 5,
        }
      ],
      addTestimonial: (t) => set((state) => ({ testimonials: [t, ...state.testimonials] })),
      deleteTestimonial: (id) => set((state) => ({ testimonials: state.testimonials.filter(t => t.id !== id) })),
    }),
    {
      name: 'aambahar-storage',
      // We only persist specific fields
      partialize: (state) => ({ 
        cartItems: state.cartItems, 
        wishlistItems: state.wishlistItems,
        lang: state.lang, 
        isAdminAuth: state.isAdminAuth,
        testimonials: state.testimonials,
        orders: state.orders,
        products: state.products,
        adminPasscode: state.adminPasscode,
        securityAttemptCount: state.securityAttemptCount,
        securityLockoutTime: state.securityLockoutTime,
        securityLogs: state.securityLogs,
      }),
    }
  )
);

