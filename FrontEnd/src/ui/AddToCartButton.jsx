
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import CartComponentOverlay from "../components/CartComponentOverlay";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

function AddToCartButton({id, maxW, maxH}){
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isCartOpened, setIsCartOpened] = useState(false);
    
    async function clickHandler(e){
        e.preventDefault();
        const authResult = checkAuthLoader();
        if(authResult) return authResult;
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/user/add-to-basket`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                goods_id: id,
                quantity: 1,
                }),
        });
        if(response.ok){
            //navigate('/cart');
            setIsCartOpened(true);
        }
    };

    function closeCartComponent(){
        setIsCartOpened(false);
    }


    return<>
        {isCartOpened && <CartComponentOverlay clickHandler={closeCartComponent} />}
        <div className={`flex items-center justify-center relative w-full h-full max-w-[${maxW}px] max-h-[${maxH}px]`}>
            <button 
            className={`flex justify-center items-center gap-2 relative z-30  py-2 px-5 rounded-lg  w-full text-lg gradient-btn-red`}
            onClick={clickHandler}
            >
            <FaShoppingCart/>
            Add
            </button>
        </div>
    </>
}

export default AddToCartButton;