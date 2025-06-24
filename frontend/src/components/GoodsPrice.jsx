import AddToCartButton from "../ui/AddToCartButton";
import { IoHeartCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";

function GoodsPrice({oldPrice, newPrice, categoty, id}){

    const [isGoodSaved, setIsGoodsSaved] = useState(false);

    useEffect(()=>{
        async function isGoodSaved() {
            const API_URL = import.meta.env.VITE_API_URL;
            const authResult = checkAuthLoader();
            if(authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/user/show-saved-goods`, {
            method: "GET",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){
            const resData = await response.json();
            setIsGoodsSaved(resData.some(item => item.goods_id === id));
        }
        }
        isGoodSaved();
    },[isGoodSaved])

    async function addToSavedGoods(){
        const API_URL = import.meta.env.VITE_API_URL;
        const authResult = checkAuthLoader();
        if(authResult) return authResult;
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/user/add-to-saved-goods/${id}`, {
            method: "POST",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){
            setIsGoodsSaved(true);
        }
    }

    async function deleteFromSaved() {
        const API_URL = import.meta.env.VITE_API_URL;
        const authResult = checkAuthLoader();
        if(authResult) return authResult;
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/user/delete-from-saved-goods/${id}`, {
            method: "DELETE",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){
            setIsGoodsSaved(false);
        }
    }

    async function changeSaveState() {
        if(isGoodSaved){
            deleteFromSaved();
        } else {
            addToSavedGoods();
        }
    }

    return<div className="flex gap-8 items-center justify-between w-full shadow-md h-[150px] rounded-xl">
        <div className="flex gap-8 items-center">
            <div className="m-4">
                {oldPrice && (
                    <div className="flex gap-2 items-center">
                        <p className="ml-2 text-gray-600 text-xl line-through">{oldPrice}₴</p>
                        <div className="flex items-center bg-red-500 rounded-4xl h-[18px] p-1 text-sm">-{Math.floor(((oldPrice-newPrice)/oldPrice)*100)}%</div>
                    </div>
                )}
                <p className={`ml-2 text-4xl ${oldPrice ? 'text-red-500' : 'text-gray-600' } `}>{newPrice} ₴ </p>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-[200px]">
                <AddToCartButton id={id} maxW={200} maxH={54}/>
            </div>
        </div>
        <div className="flex items-center justify-center  mr-4">
            <IoHeartCircleOutline className= {`${isGoodSaved ? "text-red-400 hover:text-gray-400" : "text-gray-400 hover:text-red-400"} text-5xl  transition-all duration-200`} onClick={changeSaveState}/>
        </div>
    </div>
}

export default GoodsPrice;