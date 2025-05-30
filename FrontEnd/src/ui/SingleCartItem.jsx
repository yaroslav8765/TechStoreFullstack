import SingleSearchBarResult from "./SingleSearchBarResult";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { checkAuthLoader, getAuthToken } from "../../util/auth";

function SingleCartItem(props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [quantity, setQuantity] = useState(props.quantity || 1);

  async function plusGoodHandled(){
    const authResult = checkAuthLoader();
    if(authResult) return authResult;
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/user/basket-edit`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
    body: JSON.stringify({
      goods_id: props.id,
      new_quantity: quantity + 1
    })
    });
    if(response.ok){
    props.onChange(props.id, quantity+1);
    setQuantity(quantity+1);
    }
  }

  async function minusGoodHandled(){
    const authResult = checkAuthLoader();
    if(authResult) return authResult;
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/user/basket-edit`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
    body: JSON.stringify({
      goods_id: props.id,
      new_quantity: quantity - 1
    })
    });
    if(response.ok){
      props.onChange(props.id, quantity-1);
      setQuantity(quantity-1);
    }
  }

async function changeGoodHandler(e) {
  const authResult = checkAuthLoader();
  if(authResult) return authResult;
  const token = getAuthToken();

  const newValue = Number(e.target.value);

  const response = await fetch(`${API_URL}/user/basket-edit`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      goods_id: props.id,
      new_quantity: newValue
    })
  });

  console.log("Response status:", response.status, response.statusText);

  if (response.ok) {
    props.onChange(props.id, newValue);
    setQuantity(newValue);
  } else {
    console.error("Error:", response.status);
    const errorData = await response.json();
    console.error("Details:", errorData);
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
