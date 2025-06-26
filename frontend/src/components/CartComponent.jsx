import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import { getAuthToken, checkAuthLoader, removeToken } from "../../util/auth.js"
import SingleCartItem from "../ui/SingleCartItem.jsx";
import CrititcalErrorWindow from "../ui/CrititcalErrorWindow.jsx";
import LoadingAnimation from "./LoadingAnimation.jsx";
import UsersCartItems from "./UsersCartItems.jsx";

function CartComponent(){
    const [usersGoods, setUsersGoods] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const sum = usersGoods.reduce((acc, item) => {
        const price = parseFloat(item.goods.price) || 0;
        return acc + price * item.quantity;
    }, 0);
    setTotalSum(sum);
    }, [usersGoods]);

    useEffect(()=>{
    async function getUsersGoods() {
        setIsLoading(true);
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
        setIsLoading(false);
    }
    getUsersGoods();
    },[])

    return <div className={`flex flex-col w-full items-center justify-center shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>
        
        <UsersCartItems extIsLoading={isLoading}/>

        {isLoading || <div>
        {usersGoods.length !== 0 ? 
           <div className="flex flex-col items-center">
            <Link 
                to="/check-out" 
                className="flex items-center justify-center rounded-3xl gradient-btn-green my-8 w-[250px] h-[50px]">
                Proceed to checkout
            </Link>
            </div> :
            <Link 
                to="/" 
                className="flex items-center justify-center rounded-3xl gradient-btn-green my-8 mx-40 w-[250px] h-[50px]">
                Let`s go shopping
            </Link>
            }
            </div>}
    </div>
}

export default CartComponent;