import LogoLink from "../ui/LogoLink";
import UsersCartItem from "../components/UsersCartItems";
import AuthInput from "../ui/AuthInput";
import NovaPostInput from "../ui/NovaPostInputCity";
import NovaPostSearch from "../components/NovaPostSearch";
import { useState } from "react";

function Checkout(){
    function handleInputChange(event){
        const { name, value } = event.target;
        if (name === 'first_name') {setFirstName(value)}
        if(name === 'last_name') {setLastName(value)}
        if(name === 'phone_number'){setPhoneNumber(value)}
    }

    const [cityName, setCityName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentFullName, setDepartmentFullname] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");



    return <div className="flex flex-col max-w-[1200px] w-full mx-auto mt-4 shadow-md border border-gray-100 rounded-xl p-4">
        <LogoLink />
        <div className="flex justify-evenly">
            <div className="flex flex-col items-center mt-4 w-full max-w-[300px]">
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
                    errorMessage={""}
                />    

                <NovaPostSearch 
                    cityName={cityName}
                    setCityName={setCityName}
                    departmentName={departmentName}
                    setDepartmentName={setDepartmentName}
                    departmentFullName={departmentFullName}
                    setDepartmentFullname={setDepartmentFullname}
                />         
                </div>
                
            </div>
            <div className="max-w-[500px] pb-10">
            <UsersCartItem/>
            </div>
            
        </div>
        <div className="flex w-full justify-center pb-4">
            <button 
                className="gradient-btn-green w-[400px] h-[50px] rounded-3xl"
                onClick={console.log(`
                    FirtsName:${firstName}
                    Last name: ${lastName}
                    Phone number: ${phoneNumber}
                    City: ${cityName}
                    Department: ${departmentFullName}
                    `)}
            >
                Confirm order
            </button>
        </div>
    </div>
}

export default Checkout;