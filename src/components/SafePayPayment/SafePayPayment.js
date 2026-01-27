import { useState, useEffect } from 'react';
import { Shield, Lock, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import backendApi from '../../services/api/backendApi';
import './SafePayPayment.css';

// SafePay Public Key - Use in production environment
const SAFEPAY_PUBLIC_KEY = 'sec_3bc65324-428b-4dbe-b53b-09c01fd4ff31';

const SafePayPayment = ({ amount, currency = 'PKR', orderId, customerEmail, customerName, onPaymentSuccess, onPaymentError }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19)); // Max 16 digits + 3 spaces
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted.substring(0, 5));
  };

  const handleCvvChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/gi, '');
    setCvv(v.substring(0, 4));
  };

  const validateForm = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMessage('Please enter a valid card number');
      return false;
    }
    if (!cardName || cardName.trim().length < 3) {
      setErrorMessage('Please enter the cardholder name');
      return false;
    }
    if (!expiryDate || expiryDate.length < 5) {
      setErrorMessage('Please enter a valid expiry date');
      return false;
    }
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (expiry < new Date()) {
      setErrorMessage('Card has expired');
      return false;
    }
    if (!cvv || cvv.length < 3) {
      setErrorMessage('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Initialize payment with backend
      const paymentResponse = await backendApi.post('/payments/safepay/initialize', {
        amount: amount,
        currency: currency,
        orderId: orderId,
        customerEmail: customerEmail,
        customerName: customerName
      });

      const { trackingId, checkoutUrl } = paymentResponse.data.data;

      // Simulate payment processing (in production, this would redirect to SafePay checkout)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Verify payment
      const verifyResponse = await backendApi.post('/payments/safepay/verify', {
        trackingId: trackingId,
        paymentToken: `tok_${Date.now()}`
      });

      if (verifyResponse.data.success) {
        setPaymentStatus('success');
        if (onPaymentSuccess) {
          onPaymentSuccess({
            trackingId: trackingId,
            transactionId: verifyResponse.data.data.transactionId,
            amount: amount,
            currency: currency
          });
        }
      }
    } catch (error) {
      setPaymentStatus('error');
      const errorMsg = error.response?.data?.message || 'Payment failed. Please try again.';
      setErrorMessage(errorMsg);
      if (onPaymentError) {
        onPaymentError(errorMsg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="safepay-container">
        <div className="safepay-success">
          <div className="success-icon">
            <CheckCircle size={64} color="#22c55e" />
          </div>
          <h2>Payment Successful!</h2>
          <p>Your payment of <strong>{currency === 'PKR' ? 'Rs ' : ''}{amount.toFixed(2)} {currency}</strong> has been processed.</p>
          <p className="success-note">A confirmation email has been sent to {customerEmail}</p>
          <div className="security-badge">
            <Shield size={16} />
            <span>Secured by SafePay</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="safepay-container">
      <div className="safepay-header">
        <div className="safepay-logo">
          <Shield size={24} className="logo-icon" />
          <span className="logo-text">SafePay</span>
        </div>
        <div className="safepay-amount">
          <span className="amount-label">Amount to Pay</span>
          <span className="amount-value">{currency === 'PKR' ? 'Rs ' : ''}{amount.toFixed(2)} {currency}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="safepay-form">
        <div className="card-preview">
          <div className="card-front">
            <div className="card-chip"></div>
            <div className="card-number-display">
              {cardNumber || '#### #### #### ####'}
            </div>
            <div className="card-details-row">
              <div className="card-holder-display">
                <span className="label">Card Holder</span>
                <span className="value">{cardName || 'FULL NAME'}</span>
              </div>
              <div className="card-expiry-display">
                <span className="label">Expires</span>
                <span className="value">{expiryDate || 'MM/YY'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Card Number</label>
          <div className="input-wrapper">
            <CreditCard size={18} className="input-icon" />
            <input
              type="text"
              className="form-input with-icon"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              autoComplete="cc-number"
            />
            <div className="card-brands">
              <span className="brand visa">VISA</span>
              <span className="brand mastercard">MC</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Cardholder Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoComplete="cc-name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Expiry Date</label>
            <input
              type="text"
              className="form-input"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength={5}
              autoComplete="cc-exp"
            />
          </div>
          <div className="form-group">
            <label className="form-label">CVV</label>
            <div className="input-wrapper">
              <input
                type="password"
                className="form-input with-icon"
                placeholder="123"
                value={cvv}
                onChange={handleCvvChange}
                maxLength={4}
                autoComplete="cc-csc"
              />
              <Lock size={16} className="cvv-icon" />
            </div>
          </div>
        </div>

        <div className="save-card-option">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span>Save card for future purchases</span>
          </label>
        </div>

        {errorMessage && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          className={`pay-button ${isProcessing ? 'processing' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 size={20} className="spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Lock size={18} />
              <span>Pay {currency === 'PKR' ? 'Rs ' : ''}{amount.toFixed(2)}</span>
            </>
          )}
        </button>
      </form>

      <div className="safepay-footer">
        <div className="security-notice">
          <Shield size={14} />
          <span>256-bit SSL Encrypted</span>
        </div>
        <div className="guarantee-notice">
          <span>Money Back Guarantee</span>
        </div>
      </div>

      <div className="accepted-cards">
        <span className="accepted-label">We Accept:</span>
        <div className="card-icons">
          <span className="card-icon visa">Visa</span>
          <span className="card-icon mastercard">Mastercard</span>
          <span className="card-icon unionpay">UnionPay</span>
        </div>
      </div>
    </div>
  );
};

export default SafePayPayment;
