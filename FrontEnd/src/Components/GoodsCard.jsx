import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function GoodsCard(props) {

    const [isMousedOver, setMouseOver] = useState(false);

    function onClickHandler() {

    }

    function mouseOverHandler() {
        setMouseOver(true);
    }

    function mouseOutHandler() {
        setMouseOver(false);
    }

    return (
        <div className="mt-1 ml-1 mr-1 mb-1">
            <form className="flex flex-col items-center bg-gray-100 w-[240px] h-[400px] rounded-2xl shadow-lg p-4 hover:bg-gray-300">
                {/* Picture */}
                <img 
                src={props.img}
                alt={props.producName}
                className="w-[180px] h-[200px] object-cover gap-y-2 mt-2 rounded-xl"
                />

                {/* Name */}
                <p className="text-black text-xl font-semibold mt-3 min-h-[55px] line-clamp-2 ">{props.producName}</p>

                {/* Price */}
                <p className="text-black text-lg font-bold  mt-">{props.price} ₴</p>

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
                <div 
                    className="relative w-full mt-2"
                    onMouseEnter={mouseOverHandler}
                    onMouseLeave={mouseOutHandler}
                    >
                    <button 
                        className={`relative z-10 text-white font-medium py-2 px-5 rounded-lg gradient-background transition-colors w-full text-lg ${isMousedOver ? 'filter grayscale' : ''}`}
                        onClick={onClickHandler}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GoodsCard;
