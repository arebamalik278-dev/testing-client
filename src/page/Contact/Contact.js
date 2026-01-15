import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Mail as MailIcon, Phone as PhoneIcon } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="contact-info-section">
          <div className="contact-info-grid">
            <div className="contact-card">
              <div className="contact-card-icon">
                <MapPin className="contact-icon" />
              </div>
              <h3 className="contact-card-title">Visit Us</h3>
              <p className="contact-card-text">
                123 Commerce Street<br />
                Lahore, Punjab<br />
                Pakistan
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone className="contact-icon" />
              </div>
              <h3 className="contact-card-title">Call Us</h3>
              <p className="contact-card-text">
                Customer Support:<br />
                <strong>+92 300 1234567</strong><br />
                Mon - Sat: 9AM - 9PM
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Mail className="contact-icon" />
              </div>
              <h3 className="contact-card-title">Email Us</h3>
              <p className="contact-card-text">
                General Inquiries:<br />
                <strong>info@afmart.com</strong><br />
                Support: support@afmart.com
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Clock className="contact-icon" />
              </div>
              <h3 className="contact-card-title">Working Hours</h3>
              <p className="contact-card-text">
                Monday - Saturday<br />
                <strong>9:00 AM - 9:00 PM</strong><br />
                Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <MessageSquare className="form-header-icon" />
              <h2 className="contact-form-title">Send us a Message</h2>
              <p className="contact-form-subtitle">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {success && (
              <div className="contact-success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <User className="label-icon" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <MailIcon className="label-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <PhoneIcon className="label-icon" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    name="subject"
                    className="form-input form-select"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="product">Product Question</option>
                    <option value="payment">Payment Issue</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare className="label-icon" />
                  Your Message
                </label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="contact-map-section">
          <h2 className="map-section-title">Find Us</h2>
          <div className="contact-map">
            <div className="map-placeholder">
              <MapPin className="map-marker-icon" />
              <p>AF Mart Headquarters</p>
              <span>123 Commerce Street, Lahore, Pakistan</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

