import { ShoppingCart, Heart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { useWishlist } from '../../context/WishlistContext/WishlistContext';
import StarRating from '../StarRating/StarRating';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  // Handle both _id (backend) and id (mock API)
  const productId = product._id || product.id;
  const productName = product.name || product.title;
  const inCart = isInCart(productId);
  const inWishlist = isInWishlist(productId);

  const handleWishlist = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...product,
      id: productId,
      productId: productId,
      title: productName,
      name: productName
    };
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productToAdd);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      ...product,
      id: productId,
      productId: productId,
      title: productName,
      name: productName
    });
  };

  return (
    <Link to={`/product/${productId}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.images?.[0]?.url || product.image} alt={productName} className="product-image" />
        {product.discount && (
          <span className="product-discount">-{product.discount}%</span>
        )}
        <button 
          className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`} 
          onClick={handleWishlist}
        >
          <Heart className="wishlist-icon" />
        </button>
      </div>
      
      <div className="product-details">
        <h3 className="product-title">{productName}</h3>
        
        <div className="product-rating">
          <StarRating rating={product.rating?.rate || product.rating || 0} />
          <span className="product-reviews">
            ({product.rating?.count || product.reviews || 0})
          </span>
        </div>
        
        <div className="product-pricing">
          <span className="product-price">Rs {product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">Rs {product.originalPrice}</span>
          )}
        </div>
        
        <button 
          className={`add-to-cart-button ${inCart ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
        >
          {inCart ? (
            <>
              <Check className="cart-button-icon" />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="cart-button-icon" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

