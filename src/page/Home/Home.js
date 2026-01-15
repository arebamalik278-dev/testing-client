import { useState, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CategoryMenu from '../../components/CatagoryMenu/CatagoryMenu';
import ProductCard from '../../components/ProductCard/ProductCard';
import backendApi from '../../services/api/backendApi';
import { getLimitedProducts } from '../../services/api/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try to fetch from real backend first
        try {
          const backendData = await backendApi.getAllProducts();
          if (backendData && backendData.length > 0) {
            setProducts(backendData.slice(0, 12));
            setLoading(false);
            return;
          }
        } catch (backendErr) {
          console.warn('Backend not available, falling back to mock API');
        }
        
        // Fallback to mock API if backend fails
        const mockData = await getLimitedProducts(12);
        setProducts(mockData);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <HeroBanner />
        <CategoryMenu />
        <div className="products-loading">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <HeroBanner />
        <CategoryMenu />
        <div className="products-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <HeroBanner />
      
      <CategoryMenu />
      
      <section className="deals-section">
        <div className="section-header">
          <h2 className="section-title">Flash Deals</h2>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        <div className="products-grid">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Trending Products</h2>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
