import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link} from "react-router-dom";
import CartComponentOverlay from "./CartComponentOverlay";
import AddToCartButton from "../ui/AddToCartButton";

function GoodsCard(props) {

    const [isCartOpened, setIsCartOpened] = useState(false);

    function closeCartComponent(){
        setIsCartOpened(false);
    }

    return (
        <div className="m-1">
            {isCartOpened && <CartComponentOverlay clickHandler={closeCartComponent} navigateTo="."/>}
                <div className="flex flex-col items-center bg-gray-100 w-[240px] h-[400px] rounded-2xl shadow-lg p-4 hover:bg-gray-200 transition-bg duration-200" >
                    <Link to={`/${props.category}/${props.product_link}`}> 
                    {/* Picture */}
                    <div className="flex items-center justify-center w-full">
                        <img 
                            src={props.img}
                            alt={props.producName}
                            className="w-[180px] h-[180px] object-contain gap-y-2 mt-2 rounded-xl"
                        />
                    </div>

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
                    </Link>


                    <AddToCartButton id={props.id} category={props.category}/>
                </div>
        </div>
    );
}

export default GoodsCard;
