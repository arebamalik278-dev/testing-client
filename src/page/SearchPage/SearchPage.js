import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import backendApi from '../../services/api/backendApi';
import socketService from '../../services/socketService';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const backendData = await backendApi.getAllProducts();
        
        // Filter products based on search query
        const filteredProducts = backendData.filter(product => {
          const productName = (product.name || product.title || '').toLowerCase();
          const productDescription = (product.description || '').toLowerCase();
          const productCategory = (product.category || '').toLowerCase();
          const searchTerm = query.toLowerCase();
          
          return productName.includes(searchTerm) || 
                 productDescription.includes(searchTerm) || 
                 productCategory.includes(searchTerm);
        });

        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  // Socket.io real-time updates
  useEffect(() => {
    const connectSocket = async () => {
      try {
        await socketService.connect();
        
        // Listen for product updates
        socketService.on('PRODUCT_CREATED', (newProduct) => {
          const productName = (newProduct.name || newProduct.title || '').toLowerCase();
          const productDescription = (newProduct.description || '').toLowerCase();
          const productCategory = (newProduct.category || '').toLowerCase();
          const searchTerm = query.toLowerCase();
          
          if (productName.includes(searchTerm) || 
              productDescription.includes(searchTerm) || 
              productCategory.includes(searchTerm)) {
            setProducts(prevProducts => [...prevProducts, newProduct]);
          }
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
  }, [query]);

  if (loading) {
    return (
      <div className="search-page">
        <div className="search-container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page">
        <div className="search-container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-results-header">
          <h1>Search Results for "{query}"</h1>
          <p className="results-count">Found {products.length} products</p>
        </div>

        {products.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try searching with different keywords</p>
            <Link to="/" className="back-to-home">Back to Home</Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
