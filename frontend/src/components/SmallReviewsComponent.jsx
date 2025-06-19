import { useEffect, useState } from 'react';
import SingleSmallReview from './SingleSmallReview';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './GoodsPicturesSlider.css';
import LoadingAnimation from './LoadingAnimation';

function SmallReviewsComponent({ id, goToReviewsSection }) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/goods/aboba/${id}/reviews?page=1&page_size=5`);
                if (response.ok) {
                    const resData = await response.json();
                    setReviews(resData);
                    console.log(resData);
                } else {
                    console.error('Failed to fetch reviews');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [id]);

    return (
        <div className="flex items-center justify-center  border-1 border-gray-100 min-h-[130px]  shadow-md rounded-2xl hover:shadow-lg w-[680px]">
            {isLoading?<LoadingAnimation />:
            <Swiper
                pagination={{ type: 'fraction' }}
                spaceBetween={32}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper rounded-xl"
            >
                {reviews.length > 0 ? (
                    <>
                    {reviews.slice(0, 5).map((review) => (
                        <SwiperSlide key={review.id}>
                            <SingleSmallReview review={review} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide >
                        <div onClick={goToReviewsSection} className='flex justify-center items-center '>
                            <p className="text-gray-900 hover:underline cursor-pointer hover:scale-102">See more...</p>
                        </div>
                    </SwiperSlide>
                    </>
                ) : (
                    <SwiperSlide >
                        <div className="flex items-center justify-center max-h-[130px]">
                            <p className="text-gray-600 text-xl font-medium">
                                There are no reviews yet.
                            </p>
                        </div>
                    </SwiperSlide >
                    )}
                    
            </Swiper>
            }
        </div>
    );
}

export default SmallReviewsComponent;
