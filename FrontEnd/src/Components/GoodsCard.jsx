import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import listOfLinks from "../links";

function GoodsCard(props) {

    const clickHandler = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch(listOfLinks.add_to_the_basket, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                goods_id: props.id,
                quantity: 1,
             }),
        });

        const result = await response.json();
        console.log('Server response:', result);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className="m-1">
            <a href={props.product_link}> 
                <form className="flex flex-col items-center bg-gray-100 w-[240px] h-[400px] rounded-2xl shadow-lg p-4 hover:bg-gray-200 transition-bg duration-200" >
                    {/* Picture */}
                    <img 
                    src={props.img}
                    alt={props.producName}
                    className="w-[180px] h-[200px] object-cover gap-y-2 mt-2 rounded-xl"
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
                            className={`relative z-10 text-white font-medium py-2 px-5 rounded-lg transition-colors w-full text-lg 
                            bg-[linear-gradient(300deg,_#481fff,_#ff2ba0,_#fa4141)] bg-[length:180%_180%] 
                            animate-gradient hover:bg-[linear-gradient(300deg,_#5a33ff,_#ff4bb5,_#ff5a5a)] 
                            transition-all duration-300">`}
                            onClick={clickHandler}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </a>
        </div>
    );
}

export default GoodsCard;
