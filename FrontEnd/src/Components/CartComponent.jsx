import { useEffect, useState } from "react";
import { useRouteLoaderData, useNavigate  } from "react-router-dom";
import { getAuthToken, checkAuthLoader, removeToken } from "../../util/auth.js"
import SingleCartItem from "../ui/SingleCartItem.jsx";
import CrititcalErrorWindow from "../ui/CrititcalErrorWindow.jsx";

function CartComponent(){
    const token = useRouteLoaderData('root');
    const navigator = useNavigate();
    const [usersGoods, setUsersGoods] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
        if (Array.isArray(resData)) {
        setUsersGoods(resData);
        } else {
        setUsersGoods([]);
        setErrorMessage((resData.detail || JSON.stringify(resData)) + ". Please, try to re-login");
        console.error("CART ERROR:", resData.message || resData);
        setIsError(true);
        removeToken();
        }
    }
    getUsersGoods();
    },[])

    return <>
        {isError && <CrititcalErrorWindow message={errorMessage}/>}
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