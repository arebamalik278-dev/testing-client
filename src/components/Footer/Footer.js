import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/settings/payment-methods`);
        const data = await response.json();
        if (data.success) {
          setPaymentMethods(data.data.filter(method => method.enabled));
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">ShopHub</h3>
            <p className="footer-text">Your one-stop destination for quality products and exceptional service in Pakistan.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="footer-section">
            <h4 className="footer-heading">Payment Methods</h4>
            <ul className="footer-links payment-methods-list">
              {paymentMethods.map(method => (
                <li key={method.id} className="payment-method-item">
                  {method.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">Subscribe for updates and exclusive offers.</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Join
              </button>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">TW</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">IG</a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>&copy; 2026 ShopHub Pakistan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
