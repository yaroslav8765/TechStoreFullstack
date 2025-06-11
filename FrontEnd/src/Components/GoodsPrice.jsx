import AddToCartButton from "../ui/AddToCartButton";
import { IoHeartCircleOutline } from "react-icons/io5";


function GoodsPrice({oldPrice, newPrice, categoty, id}){

    return<div className="flex gap-8 items-center justify-between w-full shadow-md h-[150px] rounded-xl">
        <div className="flex gap-8 items-center">
            <div className="m-4">
                {oldPrice && (
                    <div className="flex gap-2 items-center">
                        <p className="ml-2 text-gray-600 text-xl line-through">{oldPrice}₴</p>
                        <div className="flex items-center bg-red-500 rounded-4xl h-[18px] p-1 text-sm">-{Math.floor(((oldPrice-newPrice)/oldPrice)*100)}%</div>
                    </div>
                )}
                <p className={`ml-2 text-4xl ${oldPrice ? 'text-red-500' : 'text-gray-600' } `}>{newPrice} ₴ </p>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-[200px]">
                <AddToCartButton id={id} maxW={200} maxH={54}/>
            </div>
        </div>
        <div className="flex items-center justify-center  mr-4">
            <IoHeartCircleOutline className=" text-gray-400 text-5xl hover:text-red-400 transition-all duration-200"/>
        </div>
    </div>
}

export default GoodsPrice;