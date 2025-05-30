import SingleSearchBarResult from "./SingleSearchBarResult";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function SingleCartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity || 1);

  function plusGoodHandled(){

  }

  function minusGoodHandled(){
    
  }
  
  return (
    <div className="flex">
        <div className="px-2 w-[600px] box-border">
        <SingleSearchBarResult
            img={props.image_url}
            title={props.name}
            price={props.price}
            old_price={props.old_price}
            category={props.category}
            id={props.id}
            description={props.description}
        />
        </div>
        <div className="flex flex-col justify-end pb-2">
          
          <div className="flex gap-2">
            <button 
            className="bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] gradient-btn-red" 
            onClick={plusGoodHandled}>
            -
            </button>
            <input 
            className="border-1 border-gray-500  mt-2 rounded-md w-[40px] h-[40px]
            focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-center
            "
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <button 
            className="bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] gradient-btn-green"
            onClick={minusGoodHandled}>
            +
            </button>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-600 text-xl">Total:</p>
            <p className="text-gray-900 text-xl font-bold">{quantity * props.price}</p>
          </div>
          <button className="bg-gray-50 text-gray-600 rounded-md h-[30px] hover:bg-gray-300 transition-bg duration-200"><DeleteOutlineIcon/> Delete </button>
        </div>
    </div>
  );
}

export default SingleCartItem;
