import { useEffect, useState } from "react";
import AuthInput from "../ui/AuthInput";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LoadingAnimation from "./LoadingAnimation";

function CreateReview({goods_id}){
    const [username, setUsername]=  useState("");
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isCommentError, setIsCommentError] = useState(false);
    const [isRateError, setIsRateError] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    function handleInputChange(e){
    const { name, value } = e.target;
        if(name === "username"){
            setUsername(value);
        } else if(name === "comment"){
            setComment(value);
        }
    }

    function changeRating(e){
        setRate(e.target.value);
    }

    async function publish() {
        if(username==="" || comment==="" || rate<1){
            if(username === ""){
                setIsUsernameError(true);
            }else{
                setIsUsernameError(false);
            };
            if(comment === ""){
                setIsCommentError(true)
            }else{
                setIsCommentError(false)
            };
            if(rate < 1){
                setIsRateError(true)
            }else{
                setIsRateError(false)
            };
        } else {
            setIsUsernameError(false);
            setIsCommentError(false)
            setIsRateError(false)
            setIsPosting(true);
            const API_URL = import.meta.env.VITE_API_URL;
            const authResult = checkAuthLoader();
            if(authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/user/post-review`, {
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                }, 
                body: JSON.stringify({
                    good_id: goods_id,
                    rate: rate,
                    comment: comment
                })
            })
            if(response.ok){
                setIsPosted(true);
            }
            setIsPosting(false);
        }
    }

    useEffect(()=>{
        async function getUserInfo() {
            const API_URL = import.meta.env.VITE_API_URL;

            const authResult = checkAuthLoader();
            if(authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/user/user-info`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            if(response.ok){
                const resData = await response.json();
                setUsername(resData.first_name);
            }
        }
        getUserInfo();
    },[])

    return  <div className="relative">
    {isPosting && (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70">
        <LoadingAnimation />
      </div>
    )}
    <div className="flex flex-col w-full max-w-2xl mx-auto shadow-md hover:shadow-lg border border-gray-200 rounded-2xl p-6 bg-white space-y-6">
    <h2 className="text-gray-800 text-2xl font-bold border-b border-gray-300 pb-2">
        Write a customer review
    </h2>
    <div className="flex flex-col sm:flex-row sm:items-end gap-6 ">
        <div className={`flex-1 ${isRateError?"mb-6":""}`}>
        <AuthInput
            label="Your name*"
            placeholder="Enter your name"
            value={username}
            onChange={handleInputChange}
            name="username"
            errorMessage={isUsernameError?"Please, enter username":""}
        />
        </div>

        <div className={`flex flex-col justify-end ${isUsernameError?"mb-6":""} w-full`}>
        <label className="text-gray-700 font-medium mb-1">Rate the good*</label>
        <Rating
            name="half-rating-read"
            value={rate}
            precision={0.1}
            icon={<StarIcon style={{ color: '#f59e0b', fontSize: '36px' }} />}
            emptyIcon={<StarIcon style={{ color: '#6f7787', fontSize: '36px' }} />}
            onChange={changeRating}
            className={``}
        />
        {isRateError?<p className="text-md text-red-600">Please, select at least one star</p> : null}
        </div>
    </div>

    <div>
        <AuthInput
        label="Comment*"
        placeholder="Enter your review"
        value={comment}
        onChange={handleInputChange}
        name="comment"
        isBig={true}
        errorMessage={isCommentError?"Please, write comment":""}
        />
    </div>
    {isPosted? <p className="text-md text-center text-xl font-bold text-green-600">Your review been succsesfully posted</p>:null}
    <div className="flex justify-center pt-2">
        <button onClick={publish} className="gradient-btn-green w-[160px] h-[48px] rounded-xl text-white font-semibold text-lg hover:opacity-90 transition">
        Publish
        </button>
    </div>
    </div>
</div>
}

export default CreateReview;
