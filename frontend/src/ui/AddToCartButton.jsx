
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import CartComponentOverlay from "../components/CartComponentOverlay";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

function AddToCartButton({id, maxW, maxH, category}){
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isCartOpened, setIsCartOpened] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

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
            setIsCartOpened(true);
        }
    };

    function closeCartComponent(){
        setIsCartOpened(false);
    }

    useEffect(()=>{
        async function checkIfGoodAvailible() {
            const response =  await fetch(`${API_URL}/goods/${category}/${id}`);
            if(response.ok){
                const resData = await response.json();
                if(resData[0].quantity<=0){
                    setIsDisable(true);
                }
            }
        }
        checkIfGoodAvailible();
    },[])



    return<>
        {isCartOpened && <CartComponentOverlay clickHandler={closeCartComponent} />}
        <div className={`flex items-center justify-center relative w-full h-full max-w-[${maxW}px] max-h-[${maxH}px]`}>
            <button 
            className={`flex justify-center items-center gap-2 relative z-30  py-2 px-5 rounded-lg  w-full text-lg ${isDisable?"bg-gray-300/50":"gradient-btn-red"}`}
            onClick={clickHandler}
            disabled={isDisable}
            >
            <FaShoppingCart/>
            {isDisable?"Sold out":`Add`}
            </button>
        </div>
    </>
}

export default AddToCartButton;