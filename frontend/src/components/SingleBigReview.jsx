import { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function SingleBigReview({ review }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(prev => !prev);

  const maxLength = 40;
  const isLong = review.comment.length > maxLength;

  const displayedText = expanded
    ? review.comment
    : review.comment.slice(0, maxLength) + (isLong ? '...' : '');

  return (
    <div className="p-4 bg-white shadow-md hover:shadow-lg rounded-2xl space-y-2 w-full min-h-[124px] max-w-[558px]">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 items-center text-lg font-semibold text-gray-800">
          <Rating
            className="self-start"
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
            icon={<StarIcon style={{ color: '#f59e0b' }} />}
            emptyIcon={<StarIcon style={{ color: '#d1d5db' }} />}
          />
          Author: <span className="text-gray-600">{review.author_name}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <p className="text-gray-800 font-bold">Date:</p>
          <p className="text-gray-700">18.08.2003</p>
        </div>
      </div>

      <div className="text-gray-700 whitespace-pre-line break-words w-full">
        {displayedText}
      </div>

      {isLong && (
        <button
          onClick={toggleExpanded}
          className="text-blue-600 hover:underline text-sm"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default SingleBigReview;
