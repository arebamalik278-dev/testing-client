import { Star } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ rating = 0, maxRating = 5, showRating = true }) => {
  // Debug log to track problematic values
  if (!Number.isFinite(rating) || !Number.isFinite(maxRating)) {
    console.error('StarRating received invalid values:', {
      rating,
      ratingType: typeof rating,
      maxRating,
      maxRatingType: typeof maxRating
    });
  }
  
  // Ensure maxRating is a valid positive number
  const validMaxRating = Number.isFinite(maxRating) && maxRating > 0 ? Math.floor(maxRating) : 5;
  
  // Ensure rating is a valid number within bounds
  const validRating = Number.isFinite(rating) ? Math.max(0, Math.min(rating, validMaxRating)) : 0;
  
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = validMaxRating - Math.ceil(validRating);
  
  // Final safety checks to ensure array lengths are always valid
  const safeFullStars = Number.isFinite(fullStars) && fullStars >= 0 ? fullStars : 0;
  const safeEmptyStars = Number.isFinite(emptyStars) && emptyStars >= 0 ? emptyStars : validMaxRating;

  return (
    <div className="star-rating">
      <div className="stars">
        {Array.from({ length: safeFullStars }).map((_, index) => (
          <Star key={`full-${index}`} className="star star-full" fill="#feda6a" />
        ))}
        {hasHalfStar && (
          <div className="star-half-wrapper">
            <Star className="star star-half" fill="#feda6a" />
            <Star className="star star-empty-overlay" />
          </div>
        )}
        {Array.from({ length: safeEmptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} className="star star-empty" />
        ))}
      </div>
      {showRating && (
        <span className="rating-value">{validRating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;