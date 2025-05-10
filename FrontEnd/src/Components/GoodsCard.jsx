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
        <div className="m-1">
            <form className="flex flex-col items-center bg-gray-100 w-[240px] h-[400px] rounded-2xl shadow-lg p-4 hover:bg-gray-200 transition-bg duration-200">
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
                        className={`relative z-10 text-white font-medium py-2 px-5 rounded-lg transition-colors w-full text-lg bg-[linear-gradient(300deg,_#481fff,_#ff2ba0,_#fa4141)] bg-[length:180%_180%] animate-gradient hover:bg-[linear-gradient(300deg,_#5a33ff,_#ff4bb5,_#ff5a5a)] transition-all duration-300">`}
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
