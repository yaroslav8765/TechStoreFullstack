import SingleOrder from "../ui/SingleOrder";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import LoadingAnimation from "./LoadingAnimation";

function UserInfo(){
    const [isLoading, setIsLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState([]);

    useEffect(()=>{
        async function getUserData() {
            setIsLoading(true);
            const API_URL = import.meta.env.VITE_API_URL;
            const authResult = checkAuthLoader();
            if (authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(API_URL + "/user/user-info",{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            
            if(response.ok){
                const resData = await response.json();
                console.log(resData);
                setUserInfo(resData);
            }else{

            }
            getUserData(false);
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