import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext/CartContext';
import { UserProvider } from './context/UserContext/UserContext';
import { WishlistProvider } from './context/WishlistContext/WishlistContext';
import MainLayout from './components/MainLayout/MainLayout';
import Home from './page/Home/Home';
import ProductPage from './page/ProductPage/ProductPage';
import CartPage from './page/CartPage/CartPage';
import Checkout from './page/Checkout/Checkout';
import Login from './page/Login/Login';
import Signup from './page/Signup/Signup';
import OrderHistory from './page/OrderHistoryPage/OrderHistory';
import ProductUpdate from './page/ProductUpdate/ProductUpdate';
import AboutUs from './page/AboutUs/AboutUs';
import Contact from './page/Contact/Contact';
import FAQ from './page/FAQ/FAQ';
import Careers from './page/Careers/Careers';
import PrivacyPolicy from './page/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './page/TermsConditions/TermsConditions';
import SearchPage from './page/SearchPage/SearchPage';
import WishlistPage from './page/WishlistPage/WishlistPage';
import './App.css';


function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <MainLayout>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/product-update" element={<ProductUpdate />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
          </MainLayout>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
