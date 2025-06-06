import SingleOrder from "../ui/SingleOrder";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import LoadingAnimation from "./LoadingAnimation";
import AuthInput from "../ui/AuthInput"
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";

function UserInfo(){
    const submitResponse = useActionData(true);
    const [isSavedSuccesfully, setIsSavedSuccesfully] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [email, setEmail] = useState();

    
    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === "first_name") setFirstName(value);
        if (name === "last_name") setLastName(value);
        if (name === "shipping_address") setShippingAddress(value);
        if (name === "phone_number") setPhoneNumber(value);
        if (name === "email") setEmail(value);
    }

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
                setFirstName(resData.first_name|| '');
                setLastName(resData.last_name|| '');
                setShippingAddress(resData.shipping_address|| '');
                setPhoneNumber(resData.phone_number|| '');
                setEmail(resData.email|| '');
                setIsSavedSuccesfully(submitResponse);
            }else{

            }
            setIsLoading(false);
        }
        getUserData();
    },[submitResponse])

    return <div className={`flex flex-col w-full items-center ${isLoading?"justify-center":null} shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>

            {isLoading ? <LoadingAnimation className="flex justify-center items-start"/> :
                <Form method="PUT" action="users-info" className="flex flex-col w-full items-center gap-8">
                    <div className="flex justify-start items-start">
                    <div className="flex flex-col w-[300px]">
                        <AuthInput
                        label="First name"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={handleInputChange}
                        name="first_name"
                        />
                        <AuthInput
                        label="Last name"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={handleInputChange}
                        name="last_name"
                        />
                        <AuthInput
                        label="Shipping address"
                        placeholder="Enter your shipping address"
                        value={shippingAddress}
                        onChange={handleInputChange}
                        name="shipping_address"
                        />
                    </div>
                    <div className="flex flex-col w-[300px]">
                        <AuthInput
                        label="Phone number"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        name="phone_number"
                        />
                        <AuthInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleInputChange}
                        name="email"
                        />
                        
                    </div>
                    </div>
                    {isSavedSuccesfully && <p className="text-green-400 text-xl">Changes saved successfully!</p>}
                    <button className="gradient-btn-green rounded-4xl min-w-[200px] min-h-[40px]">Save changes</button>
                </Form>}
    </div>
}

export default UserInfo;

export async function action({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    console.log(JSON.stringify(postData));
    const API_URL = import.meta.env.VITE_API_URL;
    const authResult = checkAuthLoader();
    if (authResult) return authResult;
    const token = getAuthToken();
    const response = await fetch(API_URL + "/user/edit-user-info",{
        method:"PUT",
        headers:{
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(postData)
    })
    
    if(response.ok){
        return true;
    }else{
        return false;
    }

}
