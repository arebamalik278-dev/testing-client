import { Search, ShoppingCart, Menu, X, User, Heart, MapPin, ChevronDown, Package } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { useUser } from '../../context/UserContext/UserContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const cartItemCount = getCartCount();
  const wishlistCount = 0;

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty & Health',
    'Sports & Outdoors',
    'Toys & Games',
    'Books',
    'Automotive'
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Top Bar */}
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-top-content">
            <div className="navbar-location">
              <MapPin className="location-icon" />
              <span className="location-text">Deliver to Dunyapur, Punjab</span>
            </div>
            <div className="navbar-top-links">
              <a href="#" className="top-link">Sell</a>
              <a href="#" className="top-link">Customer Service</a>
              <Link to="/orders" className="top-link">Track Order</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="navbar-container">
          <div className="navbar-main-content">
            {/* Logo */}
            <div className="navbar-logo">
              <Link to="../../../public/favicon.ico" className="logo-link">
                <div className="logo-icon">
                  <span className="logo-text">S</span>
                </div>
                <span className="logo-brand">AF Mart</span>
              </Link>
            </div>

            {/* Category Dropdown - Desktop */}
            <div className="category-dropdown-wrapper">
              <button 
                className="category-button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Menu className="category-icon" />
                <span>All Categories</span>
                <ChevronDown className="chevron-icon" />
              </button>
              {isCategoryOpen && (
                <div className="category-dropdown">
                  {categories.map((category, index) => (
                    <a key={index} href="#" className="category-item">
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="search-input"
                />
                <button className="search-button">
                  <Search className="search-icon" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="navbar-actions">
              {/* Account */}
              {isAuthenticated ? (
                <div className="account-dropdown">
                  <button className="action-link">
                    <User className="action-icon" />
                    <div className="action-text">
                      <span className="action-label">Hello, {user?.name?.split(' ')[0] || 'User'}</span>
                      <span className="action-title">Account</span>
                    </div>
                  </button>
                  <div className="account-menu">
                    <Link to="/profile" className="account-menu-item">My Profile</Link>
                    <Link to="/orders" className="account-menu-item">My Orders</Link>
                    <Link to="/wishlist" className="account-menu-item">Wishlist</Link>
                    <button onClick={handleLogout} className="account-menu-item logout">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="action-link">
                  <User className="action-icon" />
                  <div className="action-text">
                    <span className="action-label">Hello, Sign in</span>
                    <span className="action-title">Account</span>
                  </div>
                </Link>
              )}

              {/* Orders */}
              <Link to="/orders" className="action-link action-link-simple">
                <Package className="action-icon" />
                <div className="action-text">  
                  <span className="action-title">Orders</span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="action-link-icon">
                <div className="icon-wrapper">
                  <Heart className="action-icon" />
                  {wishlistCount > 0 && (
                    <span className="badge">{wishlistCount}</span>
                  )}
                </div>
                <span className="action-title-mobile">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="cart-link">
                <div className="cart-icon-wrapper">
                  <ShoppingCart className="cart-icon" />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </div>
                <span className="cart-text">Cart</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar - Desktop */}
      <div className="navbar-categories">
        <div className="navbar-container">
          <div className="categories-scroll">
            <a href="#" className="category-link">Today's Deals</a>
            <a href="#" className="category-link">Electronics</a>
            <a href="#" className="category-link">Fashion</a>
            <a href="#" className="category-link">Home & Kitchen</a>
            <a href="#" className="category-link">Beauty</a>
            <a href="#" className="category-link">Sports</a>
            <a href="#" className="category-link">Automotive</a>
            <a href="#" className="category-link">Gift Cards</a>
            <a href="#" className="category-link category-highlight">Flash Sale</a>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="search-mobile">
        <div className="navbar-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
            <button className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="navbar-container">
            <div className="mobile-menu-content">
              {/* Mobile User Section */}
              <div className="mobile-user-section">
                <User className="mobile-user-icon" />
                <div>
                  {isAuthenticated ? (
                    <>
                      <p className="mobile-user-greeting">Hello, {user?.name?.split(' ')[0] || 'User'}</p>
                      <p className="mobile-user-name">My Account</p>
                    </>
                  ) : (
                    <>
                      <p className="mobile-user-greeting">Hello, Sign in</p>
                      <Link to="/login" className="mobile-user-name" onClick={() => setIsMenuOpen(false)}>
                        My Account
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Shop by Category</h3>
                {categories.map((category, index) => (
                  <a key={index} href="#" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                    {category}
                  </a>
                ))}
              </div>

              {/* Mobile Quick Links */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Quick Links</h3>
                <a href="#" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Today's Deals</a>
                <a href="#" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Flash Sale</a>
                <Link to="/orders" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
                <a href="#" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Customer Service</a>
                {isAuthenticated && (
                  <>
                    <Link to="/profile" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                    <Link to="/wishlist" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                    <button onClick={handleLogout} className="mobile-menu-link logout-mobile">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;