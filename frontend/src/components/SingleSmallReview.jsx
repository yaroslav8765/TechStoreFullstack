import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function SingleSmallReview({ review }) {
    return (
        <div className="flex flex-col gap-2 bg-white shadow-md rounded-2xl p-4 w-full max-w-md transition hover:shadow-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-800">
                    {review.author_name}
                </p>
                <span className="text-yellow-500 font-medium">
                    {review.rating}/5
                </span>
            </div>
            <Rating
                className="self-start"
                name="half-rating-read"
                value={review.rating}
                precision={0.5}
                readOnly
                icon={<StarIcon style={{ color: '#f59e0b' }} />}
                emptyIcon={<StarIcon style={{ color: '#d1d5db' }} />} // Tailwind's gray-300
            />
            <p className="text-gray-700 text-sm">{review.comment}</p>
        </div>
    );
}

export default SingleSmallReview;