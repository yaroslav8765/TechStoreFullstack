import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { getAuthToken, checkAuthLoader } from "../../util/auth.js"

function CartComponent(){
    const token = useRouteLoaderData('root');

    const [usersGoods, setUsersGoods] = useState([]);

    useEffect(()=>{
    async function getUsersGoods() {
        const API_URL = import.meta.env.VITE_API_URL;
        const authResult = checkAuthLoader();
        if (authResult) return authResult;
        const token = getAuthToken();
    
        const response = await fetch(API_URL + "/user/show-basket", {
            method: "GET",
            headers: {
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`
            }
        });
    
        const resData = await response.json();
        setUsersGoods(resData);
        console.log(resData);
    }
    getUsersGoods();
    },[])

    return <>
        <div className=" w-full h-[600px] shadow-md">
              <h2 className="text-gray-800 text-3xl font-semibold text-center">Your Cart</h2>
              {usersGoods.length === 0 ? <p className="text-gray-800 text-3xl font-semibold text-center">Your cart is empty</p> 
              : 
              <p className="text-gray-800 text-3xl font-semibold text-center">Here is your goods</p>
              }
        </div>
    </>
}

export default CartComponent;