import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Clock } from 'lucide-react';
import StarRating from '../../components/StarRating/StarRating';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext/CartContext';
import { useWishlist } from '../../context/WishlistContext/WishlistContext';
import backendApi from '../../services/api/backendApi';
import socketService from '../../services/socketService';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllQA, setShowAllQA] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await backendApi.getProductById(id);
        
        if (data) {
          // Transform backend data to match UI expectations
          setProduct({
            ...data,
            _id: data._id || data.id,
            title: data.name || data.title,
            description: data.description || 'Product description',
            images: [
              data.images?.[0]?.url || 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
              'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
              'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600'
            ],
            inStock: data.stock > 0,
            originalPrice: data.discountPrice ? data.price : data.price * 1.3,
            discount: data.discountPercentage || 23,
            reviewCount: Math.floor(Math.random() * 500) + 50,
            seller: {
              name: 'AF Mart Official Store',
              rating: 4.7,
              location: 'Karachi, Pakistan',
              positiveFeedback: 96
            },
            specifications: {
              'Brand': data.brand || 'AF Mart',
              'Model': 'AF-' + Math.floor(Math.random() * 1000),
              'Category': data.category || 'General',
              'Stock': data.stock || 10
            },
            reviews: [
              {
                id: 1,
                reviewer: 'John Doe',
                rating: 5,
                date: '2023-10-15',
                text: 'Great product! Exactly as described. Fast shipping and excellent quality.'
              },
              {
                id: 2,
                reviewer: 'Jane Smith',
                rating: 4,
                date: '2023-10-10',
                text: 'Good value for money. Works well, but packaging could be better.'
              },
              {
                id: 3,
                reviewer: 'Mike Johnson',
                rating: 5,
                date: '2023-10-05',
                text: 'Highly recommend! Will buy again. Customer service was helpful.'
              }
            ],
            qa: [
              {
                id: 1,
                question: 'Is this product waterproof?',
                answer: 'Yes, this product is waterproof and can be used in various weather conditions.',
                askedBy: 'Customer A',
                answeredBy: 'Seller'
              },
              {
                id: 2,
                question: 'What is the warranty period?',
                answer: 'This product comes with a 1-year manufacturer warranty.',
                askedBy: 'Customer B',
                answeredBy: 'Seller'
              }
            ],
            relatedProducts: [
              {
                id: Math.floor(Math.random() * 1000) + 100,
                title: 'Similar Product 1',
                price: Math.floor(Math.random() * 100) + 20,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
                rating: { rate: 4.2, count: 45 },
                discount: 15
              },
              {
                id: Math.floor(Math.random() * 1000) + 200,
                title: 'Similar Product 2',
                price: Math.floor(Math.random() * 100) + 30,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
                rating: { rate: 4.5, count: 67 },
                discount: 10
              },
              {
                id: Math.floor(Math.random() * 1000) + 300,
                title: 'Similar Product 3',
                price: Math.floor(Math.random() * 100) + 25,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
                rating: { rate: 4.0, count: 32 },
                discount: 20
              }
            ]
          });
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Socket.io real-time updates
  useEffect(() => {
    const connectSocket = async () => {
      try {
        await socketService.connect();
        
        // Listen for product updates
        socketService.on('PRODUCT_UPDATED', (updatedProduct) => {
          if (product && product._id === updatedProduct._id) {
            setProduct(prevProduct => ({
              ...prevProduct,
              ...updatedProduct
            }));
          }
        });

        socketService.on('PRODUCT_DELETED', (deletedProduct) => {
          if (product && product._id === deletedProduct._id) {
            navigate('/');
          }
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
  }, [product, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id || product.id,
        productId: product._id || product.id,
        title: product.title || product.name,
        name: product.title || product.name,
        price: product.price,
        image: product.images?.[0]
      });
      // Optionally show a success message or notification
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlist = () => {
    if (product) {
      const productToAdd = {
        id: product._id || product.id,
        productId: product._id || product.id,
        title: product.title || product.name,
        name: product.title || product.name,
        price: product.price,
        image: product.images?.[0]
      };
      if (isInWishlist(product._id || product.id)) {
        removeFromWishlist(product._id || product.id);
      } else {
        addToWishlist(productToAdd);
      }
    }
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-container">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="product-container">
          <p className="error-message">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Image Section */}
        <div className="product-images">
          <div className="main-image-wrapper">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="main-image"
            />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="product-details-section">
          <h1 className="product-page-title">{product.title}</h1>
          
          <div className="product-rating-section">
            <StarRating rating={product.rating?.rate || product.rating || 0} />
            <span className="reviews-count">({product.reviewCount} Reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">Rs {product.price.toFixed(2)}</span>
            <span className="original-price">Rs {product.originalPrice.toFixed(2)}</span>
            <span className="discount-badge">-{product.discount}% OFF</span>
          </div>

          <div className="stock-status">
            {product.inStock ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <label className="quantity-label">Quantity:</label>
            <div className="quantity-controls">
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart className="btn-icon" />
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button 
              className={`wishlist-btn ${isInWishlist(product._id || product.id) ? 'in-wishlist' : ''}`}
              onClick={handleWishlist}
            >
              <Heart className="btn-icon" />
            </button>
            <button className="share-btn">
              <Share2 className="btn-icon" />
            </button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <Truck className="feature-icon" />
              <div>
                <h4>Free Delivery</h4>
                <p>On orders over Rs 50</p>
              </div>
            </div>
            <div className="feature-item">
              <Clock className="feature-icon" />
              <div>
                <h4>Estimated Delivery</h4>
                <p>4-7 business days</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield className="feature-icon" />
              <div>
                <h4>1 Year Warranty</h4>
                <p>Full coverage included</p>
              </div>
            </div>
            <div className="feature-item">
              <RotateCcw className="feature-icon" />
              <div>
                <h4>30 Days Returns</h4>
                <p>Easy return policy</p>
              </div>
            </div>
          </div>

          <div className="seller-info">
            <h3 className="seller-title">Sold by</h3>
            <div className="seller-details">
              <p className="seller-name">{product.seller.name}</p>
              <div className="seller-rating">
                <StarRating rating={product.seller.rating} />
                <span className="seller-rating-text">{product.seller.rating} ({product.seller.positiveFeedback}% positive feedback)</span>
              </div>
              <p className="seller-location">{product.seller.location}</p>
            </div>
          </div>

          <div className="product-description">
            <h3 className="description-title">Description</h3>
            <p className="description-text">{product.description || product.title}</p>

            <h4 className="features-title">Category:</h4>
            <p className="category-text">{product.category?.name || product.category || 'General'}</p>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="product-specifications">
          <h3 className="section-title">Product Specifications</h3>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="spec-key">{key}</td>
                  <td className="spec-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Reviews */}
        <div className="customer-reviews">
          <h3 className="section-title">Customer Reviews</h3>
          <div className="reviews-summary">
            <StarRating rating={typeof product.rating === 'number' ? product.rating : (product.rating?.rate || 0)} />
            <span className="reviews-count">Based on {product.reviews.length} reviews</span>
          </div>
          <div className="reviews-list">
            {product.reviews.slice(0, showAllReviews ? product.reviews.length : 2).map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <StarRating rating={review.rating} />
                  <span className="reviewer-name">{review.reviewer}</span>
                  <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
          {product.reviews.length > 2 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? 'Show Less' : `Show All ${product.reviews.length} Reviews`}
            </button>
          )}
        </div>

        {/* Q&A Section */}
        <div className="qa-section">
          <h3 className="section-title">Questions & Answers</h3>
          <div className="qa-list">
            {product.qa.slice(0, showAllQA ? product.qa.length : 2).map((item) => (
              <div key={item.id} className="qa-item">
                <div className="question">
                  <strong>Q: {item.question}</strong>
                  <span className="asked-by">Asked by {item.askedBy}</span>
                </div>
                <div className="answer">
                  <strong>A: {item.answer}</strong>
                  <span className="answered-by">Answered by {item.answeredBy}</span>
                </div>
              </div>
            ))}
          </div>
          {product.qa.length > 2 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllQA(!showAllQA)}
            >
              {showAllQA ? 'Show Less' : `Show All ${product.qa.length} Q&A`}
            </button>
          )}
          <button className="ask-question-btn">Ask a Question</button>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h3 className="section-title">Related Products</h3>
          <div className="related-products-grid">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

