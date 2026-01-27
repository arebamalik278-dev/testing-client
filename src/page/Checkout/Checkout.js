import { CreditCard, Lock, Smartphone, Building2, Wallet, HandCoins, CreditCard as CardIcon, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { useUser } from '../../context/UserContext/UserContext';
import backendApi from '../../services/api/backendApi';
import { createOrder as createMockOrder, PAYMENT_METHODS } from '../../services/api/api';
import SafePayPayment from '../../components/SafePayPayment/SafePayPayment';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Pakistan',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [walletData, setWalletData] = useState({
    mobileNumber: '',
    transactionId: ''
  });
  const [bankData, setBankData] = useState({
    bankName: '',
    accountNumber: '',
    transferDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [safepayComplete, setSafepayComplete] = useState(false);
  const [safepayData, setSafepayData] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handleWalletChange = (e) => {
    setWalletData({
      ...walletData,
      [e.target.name]: e.target.value
    });
  };

  const handleBankChange = (e) => {
    setBankData({
      ...bankData,
      [e.target.name]: e.target.value
    });
  };

  const getPaymentIcon = (methodId) => {
    const icons = {
      safepay: <ShieldCheck className="text-green-500" />,
      card: <CreditCard />,
      jazzcash: <Smartphone />,
      easypaisa: <Smartphone />,
      cod: <Wallet />,
      bank_transfer: <Building2 />,
      khatain: <HandCoins />,
      nayapay: <Smartphone />,
      sadapay: <Smartphone />,
      paypro: <CreditCard />,
      mobilepos: <CardIcon />
    };
    return icons[methodId] || <CreditCard />;
  };

  const getPaymentInstructions = () => {
    const instructions = {
      safepay: 'Secure online payment with SSL encryption. Supports all major credit and debit cards.',
      card: 'Enter your card details above. We accept Visa, Mastercard, and UnionPay.',
      jazzcash: 'Send payment to: 0321-1234567 (JazzCash Account). Enter the transaction ID below.',
      easypaisa: 'Send payment to: 0301-1234567 (EasyPaisa Account). Enter the transaction ID below.',
      cod: 'Pay with cash when your order is delivered to your doorstep.',
      bank_transfer: 'Transfer the amount to our bank account and enter the details below.\nBank: HBL\nAccount: 123456789012\nIBAN: PK92HABB000123456789012',
      khatain: 'Buy now and pay later in easy installments. No upfront payment required.',
      nayapay: 'Send payment to your NayaPay wallet. Enter transaction ID below.',
      sadapay: 'Send payment to your Sadapay wallet. Enter transaction ID below.',
      paypro: 'Use PayPro payment gateway. You will be redirected to complete payment.',
      mobilepos: 'Our delivery person will bring a mobile POS machine to swipe your card.'
    };
    return instructions[paymentMethod] || '';
  };

  const validatePayment = () => {
    if (paymentMethod === 'safepay' && !safepayComplete) {
      setError('Please complete the SafePay payment first');
      return false;
    }
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        setError('Please fill in all card details');
        return false;
      }
    } else if (['jazzcash', 'easypaisa', 'nayapay', 'sadapay'].includes(paymentMethod)) {
      if (!walletData.mobileNumber || !walletData.transactionId) {
        setError('Please provide mobile number and transaction ID');
        return false;
      }
    } else if (paymentMethod === 'bank_transfer') {
      if (!bankData.bankName || !bankData.accountNumber || !bankData.transferDate) {
        setError('Please provide all bank transfer details');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isAuthenticated) {
      setError('Please login to place an order');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!validatePayment()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        orderItems: cartItems.map(item => ({
          productId: item.productId || item.id,
          name: item.name || item.title,
          qty: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zip,
          country: formData.country
        },
        paymentMethod: paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
        isPaid: paymentMethod === 'cod' ? false : true,
        paidAt: paymentMethod === 'cod' ? null : new Date().toISOString(),
        ...(paymentMethod === 'safepay' && safepayData ? {
          paymentDetails: {
            trackingId: safepayData.trackingId,
            transactionId: safepayData.transactionId,
            amount: safepayData.amount,
            currency: safepayData.currency
          }
        } : {})
      };

      // Try to create order with real backend first
      let orderResult;
      try {
        orderResult = await backendApi.createOrder(orderData);
      } catch (backendErr) {
        console.warn('Backend not available, using mock order creation');
        // Fallback to mock order creation
        orderResult = await createMockOrder({
          ...orderData,
          userId: user._id || user.id
        });
      }

      // Clear cart and redirect to success page
      clearCart();
      navigate('/orders', { state: { order: orderResult } });
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-cart-message">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart before checking out.</p>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-main">
          <h1 className="checkout-heading">Checkout</h1>
          
          {!isAuthenticated && (
            <div className="login-notice">
              <p>Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>login</a> to complete your order</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Shipping Information */}
            <div className="checkout-section">
              <h2 className="section-heading">Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className="form-input" 
                    placeholder="John" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="form-input" 
                    placeholder="Doe" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="john.doe@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="+92 300 1234567" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input 
                  type="text" 
                  name="address"
                  className="form-input" 
                  placeholder="123 Main Street" 
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    name="city"
                    className="form-input" 
                    placeholder="Karachi" 
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State/Province</label>
                  <input 
                    type="text" 
                    name="state"
                    className="form-input" 
                    placeholder="Sindh" 
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">ZIP/Postal Code</label>
                  <input 
                    type="text" 
                    name="zip"
                    className="form-input" 
                    placeholder="12345" 
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select 
                    name="country"
                    className="form-select"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2 className="section-heading">Payment Method</h2>
              
              <div className="payment-methods-grid">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-method-card ${paymentMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span className="payment-method-icon">{method.icon}</span>
                    <span className="payment-method-name">{method.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="selected-payment-info">
                <div className="payment-header">
                  {getPaymentIcon(paymentMethod)}
                  <span>{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}</span>
                </div>
                <p className="payment-description">
                  {getPaymentInstructions()}
                </p>
              </div>

              {/* Card Details (only show for card payment) */}
              {paymentMethod === 'card' && (
                <div className="card-details-section">
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      className="form-input" 
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardName"
                      className="form-input" 
                      placeholder="John Doe" 
                      value={cardData.cardName}
                      onChange={handleCardChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiryDate"
                        className="form-input" 
                        placeholder="MM/YY" 
                        maxLength="5"
                        value={cardData.expiryDate}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        className="form-input" 
                        placeholder="123" 
                        maxLength="3"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet Details */}
              {['jazzcash', 'easypaisa', 'nayapay', 'sadapay'].includes(paymentMethod) && (
                <div className="wallet-details-section">
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="mobileNumber"
                      className="form-input" 
                      placeholder="0300 1234567"
                      value={walletData.mobileNumber}
                      onChange={handleWalletChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Transaction ID</label>
                    <input 
                      type="text" 
                      name="transactionId"
                      className="form-input" 
                      placeholder="Enter your transaction ID"
                      value={walletData.transactionId}
                      onChange={handleWalletChange}
                    />
                  </div>
                </div>
              )}

              {/* SafePay Payment Component */}
              {paymentMethod === 'safepay' && !safepayComplete && (
                <div className="safepay-section">
                  <SafePayPayment
                    amount={total}
                    currency="PKR"
                    orderId={`ORD-${Date.now()}`}
                    customerEmail={formData.email}
                    customerName={`${formData.firstName} ${formData.lastName}`}
                    onPaymentSuccess={(data) => {
                      setSafepayComplete(true);
                      setSafepayData(data);
                    }}
                    onPaymentError={(error) => {
                      setError(error);
                    }}
                  />
                </div>
              )}

              {safepayComplete && paymentMethod === 'safepay' && (
                <div className="safepay-complete-notice">
                  <Lock size={18} />
                  <span>Payment completed successfully! You can now place your order.</span>
                </div>
              )}

              <div className="security-notice">
                <Lock className="security-icon" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button type="submit" className="place-order-button" disabled={loading}>
              {loading ? 'Processing...' : `Place Order - Rs ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <h3 className="summary-heading">Order Summary</h3>
          
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.title || item.name} className="order-item-image" />
                <div className="order-item-details">
                  <p className="order-item-title">{item.title || item.name}</p>
                  <p className="order-item-quantity">Qty: {item.quantity}</p>
                </div>
                <p className="order-item-price">Rs {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-calculations">
            <div className="calc-row">
              <span>Subtotal:</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="calc-row">
              <span>Shipping:</span>
              <span>Rs {shipping.toFixed(2)}</span>
            </div>
            <div className="calc-row">
              <span>Tax:</span>
              <span>Rs {tax.toFixed(2)}</span>
            </div>
            <div className="calc-divider"></div>
            <div className="calc-row calc-total">
              <span>Total:</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="delivery-estimate">
            <p className="delivery-estimate-title">📦 Estimated Delivery</p>
            <p className="delivery-estimate-text">4-7 business days</p>
            <p className="delivery-estimate-note">Your order will be processed within 24-48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

