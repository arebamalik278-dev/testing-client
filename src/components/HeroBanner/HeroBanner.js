import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import backendApi from '../../services/api/backendApi';
import './HeroBanner.css';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default slides for when no banners are in database
  const defaultSlides = [
    {
      id: 1,
      title: "Summer Collection 2026",
      subtitle: "Up to 50% Off on Fashion",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Latest Electronics",
      subtitle: "Best Deals on Tech Gadgets",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
      cta: "Explore"
    },
    {
      id: 3,
      title: "Home & Kitchen",
      subtitle: "Transform Your Living Space",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
      cta: "Discover"
    }
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await backendApi.getActiveBanners();
        if (data && data.length > 0) {
          setBanners(data);
        } else {
          setBanners(defaultSlides);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to load banners');
        setBanners(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleSlideClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  if (loading) {
    return (
      <div className="hero-banner">
        <div className="hero-loading">Loading...</div>
      </div>
    );
  }

  if (error && banners.length === 0) {
    return null;
  }

  return (
    <div className="hero-banner">
      <div className="hero-slider">
        {banners.map((slide, index) => (
          <div
            key={slide._id || slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            onClick={() => handleSlideClick(slide.link)}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button className="hero-cta">{slide.cta || 'Shop Now'}</button>
            </div>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button className="hero-nav-button hero-prev" onClick={prevSlide}>
            <ChevronLeft className="nav-icon" />
          </button>
          <button className="hero-nav-button hero-next" onClick={nextSlide}>
            <ChevronRight className="nav-icon" />
          </button>

          <div className="hero-indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBanner;
