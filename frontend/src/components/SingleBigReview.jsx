import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function SingleBigReview({ review }) {
  return (
    <div className="p-4 bg-white shadow-md hover:shadow-lg rounded-2xl space-y-2">


    <div className='flex justify-between items-center'>
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
      <div className='flex gap-2'>
        <p className='text-gray-800 font-bold'>Date: </p>
        <p className='text-gray-700'>18.08.2003</p>

      </div>
    </div>

      <div className="text-gray-700 whitespace-pre-line">
        {review.comment}
      </div>
     
    </div>
  );
}

export default SingleBigReview;
