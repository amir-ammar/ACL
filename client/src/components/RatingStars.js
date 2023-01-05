import React from 'react';
import { FaStar } from 'react-icons/fa';

function RatingStars({ rate, style }) {
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        return (
          <FaStar
            key={i}
            style={{ color: i < rate ? '#ffc107' : 'grey', ...style }}
          />
        );
      })}
    </div>
  );
}

export default RatingStars;
