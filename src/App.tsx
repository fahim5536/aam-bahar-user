import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartSidebar from './components/CartSidebar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import FloatingCartToggle from './components/FloatingCartToggle';

import WelcomeSplash from './components/WelcomeSplash';

import Checkout from './pages/Checkout';
import SearchModal from './components/SearchModal';
import WishlistSidebar from './components/WishlistSidebar';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import Contact from './pages/Contact';

import OrderSuccess from './pages/OrderSuccess';
import ContentPage from './pages/ContentPage';
import MobileBottomNav from './components/MobileBottomNav';
import { useStore } from './store/useStore';
import { subscribeToOrdersFirestore } from './lib/firebase';

export default function App() {
  // Real-time Firestore synchronization active across entire browser session
  useEffect(() => {
    const unsubscribe = subscribeToOrdersFirestore((firebaseOrders) => {
      // Direct global state injector so customer order tracking stays 100% updated
      if (firebaseOrders && firebaseOrders.length > 0) {
        useStore.setState({ orders: firebaseOrders });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <WelcomeSplash />
      <div className="flex flex-col min-h-screen bg-bg-site pb-[50px] lg:pb-0">
        <AnnouncementBar />
        <Navbar />
        
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/products" element={<ProductsPage type="all" />} />
            <Route path="/special" element={<ProductsPage type="special" />} />
            <Route path="/corporate" element={<ProductsPage type="corporate" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/info/:pageId" element={<ContentPage />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center p-20 text-center">
                <h1 className="text-6xl text-primary font-serif font-bold mb-4">৪০৪</h1>
                <p className="text-xl">এই পেজটি পাওয়া যাচ্ছে না</p>
              </div>
            } />
          </Routes>
        </main>

        <CartSidebar />
        <WishlistSidebar />
        <SearchModal />
        <MobileBottomNav />
        <FloatingCartToggle />
        <WhatsAppFloat />
        
        <Footer />
      </div>
    </Router>
  );
}
