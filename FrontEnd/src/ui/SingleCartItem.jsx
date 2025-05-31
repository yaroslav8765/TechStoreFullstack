import SingleSearchBarResult from "./SingleSearchBarResult";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { checkAuthLoader, getAuthToken } from "../../util/auth";

function SingleCartItem(props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [quantity, setQuantity] = useState(props.quantity || 1);
  const [isMaxError, setIsMaxError] = useState(false);
  const [isMinError, setIsMinError] = useState(false);

  async function plusGoodHandled(){
    const prevValue = quantity;
    console.log(props.quantity);
    if(quantity+1>props.left_quantity){
      /* show error */
      setIsMaxError(true);
    } else {
      setIsMaxError(false);
      setIsMinError(false);
      setQuantity(quantity+1);
    //   const authResult = checkAuthLoader();
    //   if(authResult) return authResult;
    //   const token = getAuthToken();

    //   const response = await fetch(`${API_URL}/user/basket-edit`,{
    //     method:"PUT",
    //     headers:{
    //       "accept": "application/json",
    //       "Content-type":"application/json",
    //       "Authorization":`Bearer ${token}`
    //     },
    //   body: JSON.stringify({
    //     goods_id: props.id,
    //     new_quantity: prevValue + 1
    //   })
    //   });
    // if(response.ok){
    //   props.onChange(props.id, quantity + 1);
    // } else {
    //   const resData = await response.json();
    //   console.log(resData);
    //   const maxQuantity = resData.detail.max_quantity;
    //   setQuantity(maxQuantity || quantity);
    //   //alert(`Cannot increase quantity! Max: ${maxQuantity}`);
    // }
    }
   
  }

  async function minusGoodHandled(){
    const prevValue = quantity;
    if(quantity-1 < 1){
      /* show error */
      setIsMinError(true);
    } else {
      setIsMaxError(false);
      setIsMinError(false);
      setQuantity(quantity-1);
      // const authResult = checkAuthLoader();
      // if(authResult) return authResult;
      // const token = getAuthToken();

      
      // const response = await fetch(`${API_URL}/user/basket-edit`,{
      //   method:"PUT",
      //   headers:{
      //     "Content-type":"application/json",
      //     "Authorization":`Bearer ${token}`
      //   },
      // body: JSON.stringify({
      //   goods_id: props.id,
      //   new_quantity: prevValue - 1
      // })
      // });
      // if(response.ok){
      //   props.onChange(props.id, quantity-1);
      // } else {
      //   setQuantity(prevValue);
      //   //*** Show error ***/
      // }
    }
  }

async function changeGoodHandler(e) {
  const authResult = checkAuthLoader();
  if(authResult) return authResult;
  const token = getAuthToken();

  const newValue = Number(e.target.value);
  if(newValue > props.left_quantity || newValue < 1){
    if(newValue>props.left_quantity){
      setIsMaxError(true);
      setIsMinError(false);
      setQuantity(props.left_quantity);
    }
    if(newValue<1){
      setQuantity(1);
      setIsMaxError(false);
      setIsMinError(true);
    }
  } else {
    setIsMaxError(false);
    setIsMinError(false);
    setQuantity(newValue);
    // const response = await fetch(`${API_URL}/user/basket-edit`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //   },
    //   body: JSON.stringify({
    //     goods_id: props.id,
    //     new_quantity: newValue
    //   })
    // });

    // if (response.ok) {
    //   props.onChange(props.id, newValue);
    // } else {
    //   console.error("Error:", response.status);
    //   const errorData = await response.json();
    //   console.error("Details:", errorData);
    // }
  }
}
  



async function deleteGoodHandler() {
  const authResult = checkAuthLoader();
  if(authResult) return authResult;
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/user/basket-delete-good?goods_id=${props.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

    if (response.ok) {
      props.onDelete(props.id);
    } else {
      console.error("Delete error:", response.status);
    }
}

useEffect(() => {
  if(props.quantity > props.left_quantity){
      setQuantity(props.left_quantity);
  }
},[])

  return (
    <div className="flex justify-around px-6">
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
            onClick={minusGoodHandled}>
            -
            </button>
            <input 
            className="border-1 border-gray-500  mt-2 rounded-md w-[60px] h-[40px]
            focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-center
            "
            value={quantity}
            onChange={changeGoodHandler}
            ></input>
            <button 
            className="bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] gradient-btn-green"
            onClick={plusGoodHandled}>
            +
            </button>
          </div>
          <div>
            {isMaxError && <p className="text-md font-bold text-red-500">We have only {props.left_quantity}</p>}
            {isMinError && <p className="text-md font-bold text-red-500">Min. value: 1</p>}
          </div>
          <div className="flex gap-2">
            <p className="text-gray-600 text-xl">Total:</p>
            <p className="text-gray-900 text-xl font-bold">{quantity * props.price}</p>
          </div>
          <button 
            className="bg-gray-50 text-gray-600 rounded-md h-[30px] hover:bg-gray-300 transition-bg duration-200"
            onClick={deleteGoodHandler}>
              <DeleteOutlineIcon/> Delete 
          </button>
        </div>
    </div>
  );
}

export default SingleCartItem;
