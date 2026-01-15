import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Call login from UserContext (now uses real backend)
      await login({ email, password });
      
      // Redirect to home on successful login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" />
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="auth-input" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
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
            <p>Don't have an account? <Link to="/Signup" className="auth-link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
