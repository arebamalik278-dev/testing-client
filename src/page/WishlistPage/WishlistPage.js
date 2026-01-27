import { useWishlist } from '../../context/WishlistContext/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <button className="clear-wishlist-btn" onClick={clearWishlist}>
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <h3>Your wishlist is empty</h3>
            <p>Start browsing products to add them to your wishlist</p>
            <Link to="/" className="browse-products">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
