import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import { getAuthToken, checkAuthLoader, removeToken } from "../../util/auth.js"
import SingleCartItem from "../ui/SingleCartItem.jsx";
import CrititcalErrorWindow from "../ui/CrititcalErrorWindow.jsx";
import LoadingAnimation from "./LoadingAnimation.jsx";

function CartComponent(){
    const [usersGoods, setUsersGoods] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

    function handleDelete(deletedId) {
        setUsersGoods((prevGoods) => prevGoods.filter((item) => item.goods.id !== deletedId));
    }

    function changeHandler(id, newQuantity) {
    setUsersGoods((prevGoods) =>
        prevGoods.map((item) => {
        if (item.goods.id === id) {
            return {
            ...item,
            quantity: newQuantity,
            };
        }
        return item;
        })
    );
    }


    return <div className={`flex flex-col w-full items-center justify-center shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>
        {isError && <CrititcalErrorWindow message={errorMessage}/>}
        {isLoading ? <LoadingAnimation className="flex justify-center items-center"/> : <div>
        <div className=" w-full h-[520px] ">
              <h2 className="text-gray-800 text-3xl font-semibold text-center my-2">Your Cart</h2>
                {usersGoods.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-evenly">
                    <p className="text-gray-800 text-3xl font-semibold text-center">Your cart is empty</p>
                    <img 
                    className="w-[400px]"
                    src="https://i.giphy.com/WyZ1D8gXF7QQsRkXw5.webp"
                    />
                </div>
                ) : (
                <div className=" max-h-[450px] overflow-y-auto z-50 bg-white scroll-smooth">
                    <div className="flex flex-col w-full">
                    {usersGoods.slice().reverse().map((item, index) => (
                        <SingleCartItem
                        key={index}
                        image_url={item.goods.image_url}
                        name={item.goods.name}
                        price={item.goods.price}
                        old_price={item.goods.old_price}
                        category={item.goods.category}
                        id={item.goods.id}
                        description={item.goods.description}
                        quantity={item.quantity}
                        left_quantity={item.goods.quantity}
                        onDelete={handleDelete}
                        onChange={changeHandler}
                        />

                    ))}
                    </div>
                </div>
                
                )}
        </div>
        {usersGoods.length !== 0 ? 
           <div className="flex flex-col items-center">
            <div className="flex gap-4 items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <div className="flex gap-2 pb-2">
                <h2 className="text-2xl font-semibold text-gray-900">Total:</h2>
                <h2 className="text-2xl font-bold text-gray-900">{totalSum} ₴</h2>
                </div>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

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