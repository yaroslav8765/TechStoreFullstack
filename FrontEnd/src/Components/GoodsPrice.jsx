import AddToCartButton from "../ui/AddToCartButton";


function GoodsPrice({oldPrice, newPrice, categoty, id}){

    return<div className="flex gap-8 items-center w-full shadow-md">
        <div className="m-4">
            {oldPrice && (
                <div className="flex gap-2 items-center">
                    <p className="ml-2 text-gray-600 text-xl line-through">{oldPrice}₴</p>
                    <div className="flex items-center bg-red-500 rounded-4xl h-[18px] text-sm">-{Math.floor(((oldPrice-newPrice)/oldPrice)*100)}%</div>
                </div>
            )}
            <p className={`ml-2 text-4xl ${oldPrice ? 'text-red-500' : 'text-gray-600' } `}>{newPrice} ₴ </p>
        </div>
        <AddToCartButton id={id} maxW={200}/>
    </div>
}

export default GoodsPrice;