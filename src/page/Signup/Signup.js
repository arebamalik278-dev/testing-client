import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import './Signup.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us today</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <div className="input-with-icon">
                <User className="input-icon" />
                <input 
                  type="text" 
                  name="name"
                  className="auth-input" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  className="auth-input" 
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="auth-input" 
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  className="auth-input" 
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            <label className="checkbox-label terms-checkbox">
              <input type="checkbox" className="checkbox-input" />
              <span>I agree to the <Link to="/terms-conditions" className="auth-link">Terms & Conditions</Link> and <Link to="/privacy-policy" className="auth-link">Privacy Policy</Link></span>
            </label>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-auth">
            <button className="social-btn">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="social-icon" />
              Continue with Google
            </button>
            <button className="social-btn">
              <img src="https://facebook.com/favicon.ico" alt="Facebook" className="social-icon" />
              Continue with Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
