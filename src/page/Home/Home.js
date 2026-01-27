import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CategoryMenu from '../../components/CatagoryMenu/CatagoryMenu';
import ProductCard from '../../components/ProductCard/ProductCard';
import backendApi from '../../services/api/backendApi';
import socketService from '../../services/socketService';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const backendData = await backendApi.getAllProducts();
        setProducts(backendData.slice(0, 12));
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Socket.io real-time updates
  useEffect(() => {
    // Connect to socket
    const connectSocket = async () => {
      try {
        await socketService.connect();
        
        // Listen for product updates
        socketService.on('PRODUCT_CREATED', (newProduct) => {
          setProducts(prevProducts => {
            if (prevProducts.length < 12) {
              return [...prevProducts, newProduct].slice(0, 12);
            }
            return prevProducts;
          });
        });

        socketService.on('PRODUCT_UPDATED', (updatedProduct) => {
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product._id === updatedProduct._id ? updatedProduct : product
            )
          );
        });

        socketService.on('PRODUCT_DELETED', (deletedProduct) => {
          setProducts(prevProducts =>
            prevProducts.filter(product => product._id !== deletedProduct._id)
          );
        });
      } catch (error) {
        console.error('Failed to connect to socket:', error);
      }
    };

    connectSocket();

    // Cleanup
    return () => {
      socketService.disconnect();
    };
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
          <Link to="/flash-deals" className="view-all-link">View All →</Link>
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
          <Link to="/trending" className="view-all-link">View All →</Link>
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
