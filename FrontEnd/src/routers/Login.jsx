import Modal from "../components/Modal";
import { Link, Form, redirect, useActionData } from 'react-router-dom';
import { useState } from "react";
import listOfLinks from "../links";
import AuthInput from "../components/AuthInput";

function Login(){
    const [usersLogin, setUsersLogin] = useState("");
    const [usersPassword, setUsersPassword] = useState("");

    const actionData = useActionData();

    async function handleLoginChange(event) {
      setUsersLogin(event.target.value)
    }

    async function handlePasswordChange(event) {
      setUsersPassword(event.target.value)
    }


    return(
    <Modal>
      <Form method='post' className="flex flex-col w-[380px] h-[600px] bg-white" >
        <h2 className="text-2xl font-bold text-center py-4 border-b-1 border-gray-300 text-gray-600">Sign in</h2>

        <AuthInput
        label="Email or mobile phone number"
        placeholder="Search products..."
        value={usersLogin}
        onChange={handleLoginChange}
        name="username"
        errorMessage={actionData && actionData.detail === "User not found"? actionData.detail : null}
        />

        <AuthInput
        label="Password"
        placeholder="Search products..."
        value={usersPassword}
        onChange={handlePasswordChange}
        name="password"
        errorMessage={actionData && actionData.detail === "Wrong password"? actionData.detail : null}
        isInputHidden="Yes"
        />

        <div className="flex justify-between m-6">
            <Link 
                to=".."
                className="bg-red-300 px-8 py-2 rounded-4xl shadow-md text-white font-medium  text-lg 
                bg-[linear-gradient(300deg,_#481fff,_#ff2ba0,_#fa4141)] bg-[length:180%_180%] 
                animate-gradient hover:bg-[linear-gradient(300deg,_#5a33ff,_#ff4bb5,_#ff5a5a)] 
                transition-all duration-300"> 
                Cancel
            </Link>

            <button 
                className="bg-green-300 px-10 py-2 rounded-4xl shadow-md text-white font-bold  text-lg bg-[linear-gradient(300deg,_#0f52ba,_#00c2c2,_#2fe0a2)] 
                bg-[length:180%_180%] animate-gradient 
                hover:bg-[linear-gradient(300deg,_#1a75ff,_#00d4b4,_#4fffcf)] 
                transition-all duration-300">
                Continue
            </button>
        </div>
        <div className="mx-6 text-sm">
         <p>By continuing, you agree to TechStore's 
            <Link to={listOfLinks.terms_and_conditions} 
                className="text-blue-400 mx-2 hover:text-blue-700">
                Conditions of Use
            </Link> 
            and  
            <Link to={listOfLinks.privacy_polycy} 
                className="text-blue-400 mx-2 hover:text-blue-700">
                Privacy Notice
            </Link>
            .
        </p>
        </div>

        <Link 
        to={"123"} 
        className="border-1 border-gray-300 shadow-md mx-16 py-3 mt-8 transition-bg duration-200 hover:bg-gray-200">
            <div className="flex justify-around items-center">
                <p>Continue with Google</p>
                <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw" className="h-[30px]"/>
            </div>
        </Link>

        <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="mx-4 text-center text-gray-600">Need to TechStore?</p>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>


        <Link to={listOfLinks.register} className=" border-1 border-gray-400 mx-10 my-2 py-2 rounded-4xl transition-bg duration-200 text-center hover:bg-gray-200">
            Create new account
        </Link>


      </Form>
    </Modal>
    )
}

export default Login;

export async function action({request}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    const requestData = `username=${postData.username}&password=${postData.password}`
    const response = await fetch(`${API_URL}/${listOfLinks.login_for_access_token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestData.toString(),
    });

    const data = await response.json();
    console.log(data);
    if(data.detail){
        return(data)
    }
    else if(data.token_type === "bearer"){
        localStorage.setItem("access_token", data.access_token);
        return redirect("/")
    }
}