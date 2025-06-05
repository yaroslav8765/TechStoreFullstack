import SingleOrder from "../ui/SingleOrder";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import LoadingAnimation from "./LoadingAnimation";

function UserInfo(){
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        async function getOrderData() {
            setIsLoading(true);
            
            setIsLoading(false);
        }
        getOrderData();
    },[])

    return <div className={`flex flex-col w-full items-center ${isLoading?"justify-center":null} shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>

            {isLoading ? <LoadingAnimation className="flex justify-center items-center"/> :
                <div className="flex flex-col w-full  gap-1">
                    
                </div>}
    </div>
}

export default UserInfo;