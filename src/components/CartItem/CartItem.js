import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">Rs {item.price}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button 
            className="quantity-button" 
            onClick={handleDecrease}
            disabled={item.quantity === 1}
          >
            <Minus className="quantity-icon" />
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button className="quantity-button" onClick={handleIncrease}>
            <Plus className="quantity-icon" />
          </button>
        </div>

        <div className="cart-item-footer">
          <p className="cart-item-total">Total: Rs {totalPrice}</p>
          <button className="remove-button" onClick={handleRemove}>
            <Trash2 className="remove-icon" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

