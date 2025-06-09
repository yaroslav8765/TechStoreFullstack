import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import listOfLinks from "../links";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthLoader, getAuthToken } from "../../util/auth";


function GoodsCard(props) {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    async function clickHandler(e){
        e.preventDefault();
        const authResult = checkAuthLoader();
        if(authResult) return authResult;
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/user/add-to-basket`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                goods_id: props.id,
                quantity: 1,
             }),
        });
        if(response.ok){
            navigate('/cart');
        }
    };

    return (
        <div className="m-1">
            <Link to={`/${props.category}/${props.product_link}`}> 
                <form className="flex flex-col items-center bg-gray-100 w-[240px] h-[400px] rounded-2xl shadow-lg p-4 hover:bg-gray-200 transition-bg duration-200" >
                    {/* Picture */}
                    <img 
                    src={props.img}
                    alt={props.producName}
                    className="w-[180px] h-[180px] object-contain gap-y-2 mt-2 rounded-xl"
                    />

                    {/* Name */}
                    <p className="text-black text-xl text-left font-semibold mt-3 min-h-[55px] line-clamp-2 ">{props.producName}</p>
                    {/* Price */}
                    
                    <div className="flex flex-row w-full justify-center ">
                        
                        <p className={`ml-8 text-xl ${props.old_price ? 'text-red-500' : 'text-gray-600' } `}>{props.price} ₴ </p>

                    {props.old_price && (
                        <p className="ml-2 text-gray-600 text-sm line-through">{props.old_price}₴</p>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                        <Rating 
                        name="half-rating-read" 
                        value={props.rating} 
                        precision={0.5} 
                        readOnly 
                        icon={<StarIcon style={{ color: '#f59e0b' }} />} 
                        emptyIcon={<StarIcon style={{ color: '#6f7787' }} />} 
                        />

                        <p className="text-black ml-1 text-lg">({props.voted})</p>
                    </div>

                    {/* Button */}
                    <div className="relative w-full mt-2">
                        <button 
                            className={`relative z-30  py-2 px-5 rounded-lg  w-full text-lg gradient-btn-red`}
                            onClick={clickHandler}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Link>
        </div>
    );
}

export default GoodsCard;
