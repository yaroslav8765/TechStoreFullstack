import Modal from "../components/Modal";
import { Link, Form, redirect } from 'react-router-dom';
import { useState } from "react";
import listOfLinks from "../links";

function Login(){
    const [usersPrompt, setUsersPrompt] = useState("");
    
    async function handleChange(event) {
      setUsersPrompt(event.target.value)
    }



    return(
    <Modal>
      <Form method='get' className="flex flex-col w-[380px] h-[600px] bg-white" >
        <h2 className="text-2xl font-bold text-center py-4 text-gray-600">Sign in</h2>
        <hr/>
        <div className="flex flex-col mx-6 mt-8">
             <p className="text-lg ">Email or mobile phone number</p>
            <input
                className="bg-gray-50 h-[35px] rounded-md border-1 border-gray-500 pl-2"
                name="title"
                placeholder="Search products..."
                onChange={handleChange}
                value={usersPrompt}
            />
        </div>
        <div className="flex flex-col mx-6 mt-4">
             <p className="text-lg ">Password</p>
            <input
                className="bg-gray-50 h-[35px] rounded-md border-1 border-gray-500 pl-2"
                name="title"
                placeholder="Search products..."
                onChange={handleChange}
                value={usersPrompt}
            />
        </div>

        <div className="flex justify-between m-6">
            <button 
                className="bg-red-300 px-8 py-2 rounded-4xl shadow-md text-white font-medium transition-colors text-lg 
                bg-[linear-gradient(300deg,_#481fff,_#ff2ba0,_#fa4141)] bg-[length:180%_180%] 
                animate-gradient hover:bg-[linear-gradient(300deg,_#5a33ff,_#ff4bb5,_#ff5a5a)] 
                transition-all duration-300"> 
                Cancel
            </button>

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

        <button className="border-1 border-gray-300 shadow-md mx-16 py-3 mt-8 transition-bg duration-200 hover:bg-gray-200">
            Continue with Google
        </button>

        <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="mx-4 text-center text-gray-600">Need to TechStore?</p>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>


        <button className=" border-1 border-gray-400 mx-10 my-2 py-2 rounded-4xl transition-bg duration-200 hover:bg-gray-200">
            Create new account
        </button>


      </Form>
    </Modal>
    )
}

export default Login;