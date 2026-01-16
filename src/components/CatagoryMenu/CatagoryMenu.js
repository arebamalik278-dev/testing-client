import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Home, Sparkles, Dumbbell, Gamepad2, Book, Car } from 'lucide-react';
import './CatagoryMenu.css';

const CategoryMenu = () => {
  const categories = [
    { id: 1, name: 'Electronics', icon: Smartphone, color: '#feda6a', path: '/category/electronics' },
    { id: 2, name: 'Fashion', icon: Shirt, color: '#f0c852', path: '/category/fashion' },
    { id: 3, name: 'Home & Kitchen', icon: Home, color: '#feda6a', path: '/category/home' },
    { id: 4, name: 'Beauty', icon: Sparkles, color: '#f0c852', path: '/category/beauty' },
    { id: 5, name: 'Sports', icon: Dumbbell, color: '#feda6a', path: '/category/sports' },
    { id: 6, name: 'Toys & Games', icon: Gamepad2, color: '#f0c852', path: '/category/toys' },
    { id: 7, name: 'Books', icon: Book, color: '#feda6a', path: '/category/books' },
    { id: 8, name: 'Automotive', icon: Car, color: '#f0c852', path: '/category/automotive' }
  ];

  return (
    <div className="category-menu">
      <h2 className="category-menu-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.id} to={category.path} className="category-item">
              <div className="category-icon-wrapper" style={{ backgroundColor: category.color }}>
                <Icon className="category-icon" />
              </div>
              <span className="category-name">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
