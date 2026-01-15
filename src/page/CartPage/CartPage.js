import CartItem from '../../components/CartItem/CartItem';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-section">
          <div className="cart-header">
            <h2 className="items-count">{cartItems.length} Items</h2>
          </div>
          
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Rs {shipping.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (8%):</span>
            <span>Rs {tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row summary-total">
            <span>Total:</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
            <ArrowRight className="checkout-icon" />
          </button>

          <div className="promo-code-section">
            <input 
              type="text" 
              placeholder="Enter promo code" 
              className="promo-input"
            />
            <button className="promo-button">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

