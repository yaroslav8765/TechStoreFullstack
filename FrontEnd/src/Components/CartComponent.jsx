import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { getAuthToken, checkAuthLoader } from "../../util/auth.js"
import SingleCartItem from "../ui/SingleCartItem.jsx";

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
                {usersGoods.length === 0 ? (
                <p className="text-gray-800 text-3xl font-semibold text-center">Your cart is empty</p>
                ) : (
                <div className=" max-h-[60vh] overflow-y-auto rounded-xl shadow-lg z-50 space-y-4  scroll-smooth">
                    <div className="flex flex-col w-full">
                    {usersGoods.map((item, index) => (
                        <SingleCartItem
                        key={index}
                        image_url={item.goods.image_url}
                        name={item.goods.name}
                        price={item.goods.price}
                        old_price={item.goods.old_price}
                        category={item.goods.category}
                        id={item.goods.id}
                        description={item.goods.description}
                        />

                    ))}
                    </div>
                </div>
                )}
        </div>
    </>
}

export default CartComponent;