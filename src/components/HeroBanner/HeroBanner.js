import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-banner">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button className="hero-cta">{slide.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-nav-button hero-prev" onClick={prevSlide}>
        <ChevronLeft className="nav-icon" />
      </button>
      <button className="hero-nav-button hero-next" onClick={nextSlide}>
        <ChevronRight className="nav-icon" />
      </button>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

