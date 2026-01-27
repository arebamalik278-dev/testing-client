import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api/api';
import { Smartphone, Shirt, Home, Sparkles, Dumbbell, Gamepad2, Book, Car } from 'lucide-react';
import './CatagoryMenu.css';

// Map category names to icons for display
const categoryIconMap = {
  'Electronics': Smartphone,
  'Fashion': Shirt,
  'Home & Kitchen': Home,
  'Beauty': Sparkles,
  'Sports': Dumbbell,
  'Toys & Games': Gamepad2,
  'Books': Book,
  'Automotive': Car
};

// Default colors for category icons
const colors = ['#feda6a', '#f0c852', '#feda6a', '#f0c852', '#feda6a', '#f0c852', '#feda6a', '#f0c852'];

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="category-menu">
        <h2 className="category-menu-title">Shop by Category</h2>
        <div className="category-grid">
          {/* Loading skeletons */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="category-item skeleton">
              <div className="category-icon-wrapper">
                <div className="category-icon"></div>
              </div>
              <span className="category-name"></span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-menu">
        <h2 className="category-menu-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-item error">
            <span>Failed to load categories</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-menu">
      <h2 className="category-menu-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category, index) => {
          const Icon = categoryIconMap[category.name] || Smartphone; // Default to Smartphone if category not found
          const color = colors[index % colors.length]; // Cycle through colors
          const path = `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`;
          
          return (
            <Link key={category._id} to={path} className="category-item">
              <div className="category-icon-wrapper" style={{ backgroundColor: category.color || color }}>
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
