import LogoLink from "../ui/LogoLink";
import UsersCartItem from "../components/UsersCartItems";
import AuthInput from "../ui/AuthInput";
import NovaPostInput from "../ui/NovaPostInputCity";
import NovaPostSearch from "../components/NovaPostSearch";
import { useEffect, useState } from "react";
import { parsePhoneNumberFromString, PhoneNumber } from 'libphonenumber-js';
import { debounce } from "@mui/material";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import LoadingAnimation from "../components/LoadingAnimation";

function isValidPhoneNumber(input) {
  const phoneNumber = parsePhoneNumberFromString(input, 'UA');
  return phoneNumber && phoneNumber.isValid();
}


function Checkout(){
    const [cityName, setCityName] = useState("");
    const [cityFullName, setCityFullName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [isCityFound, setIsCityFound] = useState(false);
    const [isDepartmentFound, setIsDepartmentFound] = useState(false);
    const [departmentFullName, setDepartmentFullname] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberValidationError, setPhoneNumberValidationError] = useState(false);
    const [phoneNumberDebounce, setPhoneNubmerDebounce] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSubmitingError, setSubmitingError] = useState(false);
    const [submitErrorDetails, setSubmitErrorsDetails] = useState("");

    async function submitHandler() {
        setIsSubmiting(true);
        if(firstName.length < 2){
            setSubmitingError(true);
            setSubmitErrorsDetails("First name is too short")
        }
        if(lastName.length < 2){
            setSubmitingError(true);
            setSubmitErrorsDetails("Last name is too short")
        }
        if(!isValidPhoneNumber(phoneNumber)){
            setSubmitingError(true);
            setSubmitErrorsDetails("Invalid phone nubmer")
        }
        if(!isCityFound){
            setSubmitingError(true);
            setSubmitErrorsDetails("This city doesn't exist")
        }
        if(!isDepartmentFound){
            setSubmitingError(true);
            setSubmitErrorsDetails("Invalid department")
        }


        ////Here's sumbit fetch
        
        setIsSubmiting(false);
    }

    useEffect(()=>{
        async function getUsersData(){
            const authResult = checkAuthLoader();
            if(!authResult){
                const API_URL = import.meta.env.VITE_API_URL;
                const token = getAuthToken();
                const response = await fetch(`${API_URL}/user/user-info`,{
                    method:"GET",
                    headers:{
                        "Content-type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                })
                if(response.ok){
                    const resData = await response.json();
                    if(resData.first_name){
                        setFirstName(resData.first_name);
                    }
                    if(resData.last_name){
                        setLastName(resData.last_name);
                    }
                    if(resData.phone_number){
                        setPhoneNumber(resData.phone_number);
                    }
                    console.log(resData);
                }
            }
        }
        getUsersData();
    }, [])


    function handleInputChange(event){
        const { name, value } = event.target;
        if (name === 'first_name') {setFirstName(value)}
        if(name === 'last_name') {setLastName(value)}
        if(name === 'phone_number'){setPhoneNumber(value)}
    }

    useEffect(() => {
    const handler = setTimeout(() => {
        setPhoneNubmerDebounce(phoneNumber);
    }, 1500); 

    return () => {
        clearTimeout(handler); 
    };
    }, [phoneNumber]);
    
    useEffect(() => {
        function showPhoneNumberValidationError(){
            if(!isValidPhoneNumber(phoneNumber) && phoneNumber.length > 0){
                setPhoneNumberValidationError(true);
            }else{
                setPhoneNumberValidationError(false);
            };
        }
        showPhoneNumberValidationError();

    }, [phoneNumberDebounce])

    return <div className="flex flex-col max-w-[1200px] w-full mx-auto mt-4 shadow-md border border-gray-100 rounded-xl p-4">
        {isSubmiting && <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70">
        <LoadingAnimation />
        </div>}
        <LogoLink />
        <div className="flex justify-evenly">
            <div className="flex flex-col items-center mt-4 w-full ">
                <p className="text-gray-800 text-3xl font-semibold">Order confirmation</p>
                <p className="text-gray-500 mt-2">Please, make sure, that all data is correct</p>
                <div className="max-w-[300px]">
                <AuthInput
                    label="Your first name*"
                    placeholder="Enter your name"
                    value={firstName}
                    onChange={handleInputChange}
                    name="first_name"
                    errorMessage={""}
                />
                <AuthInput
                    label="Your last name*"
                    placeholder="Enter surname"
                    value={lastName}
                    onChange={handleInputChange}
                    name="last_name"
                    errorMessage={""}
                />
                <AuthInput
                    label="Phone number*"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    name="phone_number"
                    errorMessage={phoneNumberValidationError ?"Something wrong with number...":""}
                />    
                <NovaPostSearch 
                    cityName={cityName}
                    setCityName={setCityName}
                    departmentName={departmentName}
                    setDepartmentName={setDepartmentName}
                    departmentFullName={departmentFullName}
                    setDepartmentFullname={setDepartmentFullname}
                    isCityFound={isCityFound}
                    setIsCityFound={setIsCityFound}
                    isDepartmentFound={isDepartmentFound}
                    setIsDepartmentFound={setIsDepartmentFound}
                    cityFullName={cityFullName}
                    setCityFullName={setCityFullName}
                />         
                </div>
                
            </div>
            <div className="w-full max-w-[500px] pb-10">
            <UsersCartItem/>
            </div>
            
        </div>
        <div className="flex w-full justify-center pb-4">
            <button 
                className="gradient-btn-green w-[400px] h-[50px] rounded-3xl"
                onClick={submitHandler}
            >
                Confirm order
            </button>
        </div>
    </div>
}

export default Checkout;