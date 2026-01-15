import { Users, Award, Target, MapPin, Phone, Mail, Clock } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="about-hero-title">About AF Mart</h1>
          <p className="about-hero-subtitle">
            Your trusted destination for quality products and exceptional service
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="about-section">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon-wrapper">
                <Target className="about-icon" />
              </div>
              <h2 className="about-card-title">Our Mission</h2>
              <p className="about-card-text">
                To provide customers with a seamless online shopping experience, offering a wide range of quality products at competitive prices while delivering exceptional customer service.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon-wrapper">
                <Award className="about-icon" />
              </div>
              <h2 className="about-card-title">Our Vision</h2>
              <p className="about-card-text">
                To become Pakistan's leading e-commerce platform, recognized for reliability, innovation, and commitment to customer satisfaction across all regions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="about-story">
          <h2 className="about-section-title">Our Story</h2>
          <div className="about-story-content">
            <p className="about-story-text">
              Founded with a vision to revolutionize online shopping in Pakistan, AF Mart has grown from a small startup to a trusted name in e-commerce. We understand the needs of Pakistani consumers and strive to meet them with carefully curated products and reliable delivery services.
            </p>
            <p className="about-story-text">
              Our journey began with a simple idea: make quality products accessible to everyone, anywhere in Pakistan. Today, we serve thousands of customers across the country, offering everything from electronics and fashion to home essentials and more.
            </p>
            <p className="about-story-text">
              At AF Mart, we believe in building lasting relationships with our customers through transparency, quality, and unwavering commitment to their satisfaction.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-features">
          <h2 className="about-section-title">Why Choose AF Mart?</h2>
          <div className="about-features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Users className="feature-icon" />
              </div>
              <h3 className="feature-title">Customer First</h3>
              <p className="feature-text">Your satisfaction is our top priority</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Award className="feature-icon" />
              </div>
              <h3 className="feature-title">Quality Products</h3>
              <p className="feature-text">Only authentic and verified products</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <MapPin className="feature-icon" />
              </div>
              <h3 className="feature-title">Nationwide Delivery</h3>
              <p className="feature-text">Serving all cities across Pakistan</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon" />
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-text">Always here to help you</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Cities Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Customer Rating</span>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="about-contact">
          <h2 className="about-section-title">Get In Touch</h2>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <MapPin className="contact-info-icon" />
              <div>
                <h3>Address</h3>
                <p>123 Commerce Street, Lahore, Punjab, Pakistan</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Phone className="contact-info-icon" />
              <div>
                <h3>Phone</h3>
                <p>+92 300 1234567</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Mail className="contact-info-icon" />
              <div>
                <h3>Email</h3>
                <p>info@afmart.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Clock className="contact-info-icon" />
              <div>
                <h3>Working Hours</h3>
                <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

