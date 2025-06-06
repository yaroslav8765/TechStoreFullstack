import SingleOrder from "../ui/SingleOrder";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import LoadingAnimation from "./LoadingAnimation";
import AuthInput from "../ui/AuthInput"
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";

function UserInfo(){
    const submitResponse = useActionData();
    const [isLoading, setIsLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState({});
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [bio, setBio] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [email, setEmail] = useState();

    
    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
        if (name === "bio") setBio(value);
        if (name === "shipping_address") setShippingAddress(value);
        if (name === "phoneNumber") setPhoneNumber(value);
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
                setBio(resData.bio|| '');
                setShippingAddress(resData.shipping_address|| '');
                setPhoneNumber(resData.phone_number|| '');
                setEmail(resData.email|| '');

            }else{

            }
            setIsLoading(false);
        }
        getUserData();
    },[])

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
                        name="firstName"
                        />
                        <AuthInput
                        label="Last name"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={handleInputChange}
                        name="lastName"
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
                        name="phoneNumber"
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
                    <button className="gradient-btn-green rounded-4xl min-w-[200px] min-h-[40px]">Save changes</button>
                </Form>}
    </div>
}

export default UserInfo;

export async function action({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    console.log(postData);
}