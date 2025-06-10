
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";

function AddToCartButton({id, maxW, maxH}){
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

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
            navigate('/cart');
        }
    };

    return<>
        <div className={`relative w-full mt-2 max-w-[${maxW}px] max-h-[${maxH}px]`}>
            <button 
            className={`relative z-30  py-2 px-5 rounded-lg  w-full text-lg gradient-btn-red`}
            onClick={clickHandler}
            >
            Add
            </button>
        </div>
    </>
}

export default AddToCartButton;