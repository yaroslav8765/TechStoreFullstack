import { useEffect, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import SingleBigReview from "./SingleBigReview"
import PagginationButton from "../ui/PagginationButton";


function BigReviewsComponent({ id, voted }) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(voted/pageSize));


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/goods/aboba/${id}/reviews?page=${page}&page_size=${pageSize}`);
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
    }, [page]);

    function changePageHandler(e){
        const value = Number(e.target.value);
        console.log(value);
        if(value){
         value>=totalPages ? setPage(totalPages):setPage(value);
        }
    }


    return<div className="flex justify-center w-full">
        <div className="flex flex-col w-full min-h-[130px] border-1 border-gray-200 p-4 rounded-2xl">
            <h2 className="text-gray-800 text-2xl font-bold border-black mb-4 border-b pb-2">Customers reviews</h2>
            <div className="flex flex-col items-center">
                {isLoading ? (
                <LoadingAnimation className="flex justify-center items-center w-full h-full" />
                ) : (
                    <div className="flex flex-col gap-4 w-full ">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <SingleBigReview key={review.id} review={review}/>
                            ))
                        ) : (
                            <p className="text-gray-500 text-xl text-center m-6 mt-8">No reviews available.</p>
                        )}
                    </div>
                )}
                <div className="flex gap-2 mt-2">
                    <PagginationButton 
                    mode="left" 
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    />

                    <input 
                    className="border-1 border-gray-500  mt-2 rounded-md w-[60px] h-[40px]
                    focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-center
                    "
                    value={page}
                    onChange={changePageHandler}
                    />

                    <PagginationButton 
                    mode="right" 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default BigReviewsComponent;