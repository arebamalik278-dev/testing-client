import { Star } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ rating = 0, maxRating = 5, showRating = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  return (
    <div className="star-rating">
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} className="star star-full" fill="#feda6a" />
        ))}
        {hasHalfStar && (
          <div className="star-half-wrapper">
            <Star className="star star-half" fill="#feda6a" />
            <Star className="star star-empty-overlay" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} className="star star-empty" />
        ))}
      </div>
      {showRating && (
        <span className="rating-value">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;