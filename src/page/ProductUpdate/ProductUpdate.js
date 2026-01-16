import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Package, Save, ArrowLeft } from 'lucide-react';
import './ProductUpdate.css';

// Configuration - 4 passwords, each 12 digits
const VALID_PASSWORDS = ['123456789012', '234567890123', '345678901234', '456789012345'];

const ProductUpdate = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwords, setPasswords] = useState(['', '', '', '']);
  const [showPasswords, setShowPasswords] = useState([false, false, false, false]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Product form state
  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (index, value) => {
    // Only allow digits and limit to 12 characters
    const digitValue = value.replace(/\D/g, '').slice(0, 12);
    const newPasswords = [...passwords];
    newPasswords[index] = digitValue;
    setPasswords(newPasswords);
    setError('');
  };

  const handleShowPasswordToggle = (index) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if all password fields are filled
    if (passwords.some(p => p.length !== 12)) {
      setError('Please enter all 12 digits for each password field');
      setLoading(false);
      return;
    }

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify all 4 passwords
    const isValid = passwords.every((password, index) => password === VALID_PASSWORDS[index]);

    if (isValid) {
      setAuthenticated(true);
    } else {
      setError('Invalid passwords. Access denied.');
      setPasswords(['', '', '', '']);
    }

    setLoading(false);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/\D/g, '') : value
    }));
    setSuccess('');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would call an API to update the product
      console.log('Product update payload:', {
        ...product,
        price: parseFloat(product.price) || 0,
        id: product.id || Date.now().toString()
      });

      setSuccess('Product updated successfully!');
      setProduct({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
    } catch (err) {
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password Entry Form
  if (!authenticated) {
    return (
      <div className="product-update-page">
        <div className="product-update-container">
          <div className="auth-card">
            <div className="auth-header">
              <Package className="auth-icon" />
              <h1 className="auth-title">Product Update</h1>
              <p className="auth-subtitle">Enter the 4 passwords to access</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="password-form" onSubmit={handlePasswordSubmit}>
              <div className="passwords-container">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="password-field-group">
                    <label className="auth-label">
                      Password {index + 1}
                      <span className="password-hint"> (12 digits)</span>
                    </label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" />
                      <input
                        type={showPasswords[index] ? "text" : "password"}
                        className="auth-input password-input"
                        placeholder="Enter 12 digits"
                        value={passwords[index]}
                        onChange={(e) => handlePasswordChange(index, e.target.value)}
                        maxLength={12}
                        inputMode="numeric"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => handleShowPasswordToggle(index)}
                      >
                        {showPasswords[index] ? (
                          <EyeOff className="toggle-icon" />
                        ) : (
                          <Eye className="toggle-icon" />
                        )}
                      </button>
                    </div>
                    <div className="password-strength">
                      <span className={`strength-bar ${passwords[index].length > 0 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 4 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 8 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 12 ? 'active' : ''}`}></span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading || passwords.some(p => p.length !== 12)}
              >
                {loading ? 'Verifying...' : 'Access Product Update'}
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/" className="auth-link">
                <ArrowLeft className="link-icon" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product Update Form
  return (
    <div className="product-update-page">
      <div className="product-update-container">
        <div className="update-card">
          <div className="update-header">
            <Package className="update-icon" />
            <h1 className="update-title">Update Product</h1>
            <p className="update-subtitle">Modify product details below</p>
          </div>

          {success && <div className="auth-success">{success}</div>}
          {error && <div className="auth-error">{error}</div>}

          <form className="update-form" onSubmit={handleProductSubmit}>
            <div className="form-row">
              <div className="auth-form-group">
                <label className="auth-label">Product ID</label>
                <input
                  type="text"
                  name="id"
                  className="auth-input"
                  placeholder="Enter product ID"
                  value={product.id}
                  onChange={handleProductChange}
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label">Category</label>
                <select
                  name="category"
                  className="auth-input"
                  value={product.category}
                  onChange={handleProductChange}
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="beauty">Beauty & Health</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="toys">Toys & Games</option>
                  <option value="books">Books</option>
                  <option value="automotive">Automotive</option>
                </select>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Product Title</label>
              <input
                type="text"
                name="title"
                className="auth-input"
                placeholder="Enter product title"
                value={product.title}
                onChange={handleProductChange}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Price (Rs)</label>
              <input
                type="text"
                name="price"
                className="auth-input"
                placeholder="Enter price"
                value={product.price}
                onChange={handleProductChange}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Image URL</label>
              <input
                type="url"
                name="image"
                className="auth-input"
                placeholder="https://example.com/image.jpg"
                value={product.image}
                onChange={handleProductChange}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Description</label>
              <textarea
                name="description"
                className="auth-input textarea"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleProductChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setAuthenticated(false);
                  setPasswords(['', '', '', '']);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn"
                disabled={loading || !product.title || !product.price}
              >
                {loading ? (
                  'Updating...'
                ) : (
                  <>
                    <Save className="btn-icon" />
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <Link to="/" className="auth-link">
              <ArrowLeft className="link-icon" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

