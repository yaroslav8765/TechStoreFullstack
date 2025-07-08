import Modal from "../ui/Modal";
import { Link, Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import listOfLinks from "../links";
import AuthInput from "../ui/AuthInput";
import { useState } from "react";
import {GoogleOAuthProvider} from '@react-oauth/google'
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"
import { useAuth } from "../providers/AuthProvider";
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
  const [usersLogin, setUsersLogin] = useState("");
  const [usersPassword, setUsersPassword] = useState("");
  const actionData = useActionData();
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "username") setUsersLogin(value);
    if (name === "password") setUsersPassword(value);
  }

  async function loginWithGoogle(credantialResponse){
    const userInfo = jwtDecode(credantialResponse.credential)
    console.log(userInfo);
    const API_URL = import.meta.env.VITE_API_URL;
    const requestData = {
      sub: userInfo.sub,
      email: userInfo.email,
      email_verified: userInfo.email_verified,
      name: userInfo.name,
      picture: userInfo.picture,
      id_token: credantialResponse.credential,
    };

    const response = await fetch(`${API_URL}/auth/login-with-google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
    });

    const data = await response.json();
    if(!response.ok){
        return(data);
    }
    else if(data.token_type === "bearer"){
        saveToken(data.access_token);
        navigate("/")
    }

  }


  return (
    <Modal redirectLink=".." isAllowedNavigate={true}>
      <Form method="post" className="flex flex-col w-[380px] h-[600px] bg-white">
        <h2 className="text-2xl font-bold text-center py-4 border-b text-gray-600">Sign in</h2>

        <AuthInput
          label="Email or mobile phone number"
          placeholder="Enter email or phone"
          value={usersLogin}
          onChange={handleInputChange}
          name="username"
          errorMessage={actionData?.detail === "User not found" ? actionData.detail : null}
        />

        <AuthInput
          label="Password"
          placeholder="Enter your password"
          value={usersPassword}
          onChange={handleInputChange}
          name="password"
          errorMessage={actionData?.detail === "Wrong password" ? actionData.detail : null}
          isInputHidden="Yes"
        />

        <div className="flex justify-between m-6">
          <Link to=".." className="gradient-btn-red px-8 py-2 rounded-4xl">Cancel</Link>
          <button type="submit" className="gradient-btn-green px-10 py-2 rounded-4xl">Continue</button>
        </div>

        <div className="mx-6 text-sm">
          <p>
            By continuing, you agree to TechStore's
            <Link to="/terms-and-conditions" className="text-blue-400 mx-2 hover:text-blue-700">Conditions of Use</Link>
            and
            <Link to="/privacy-policy" className="text-blue-400 mx-2 hover:text-blue-700">Privacy Notice</Link>.
          </p>
        </div>

        <div className="flex w-full justify-center my-6">
          <GoogleLogin 
            onSuccess={loginWithGoogle}
            size="large"
            text="continue_with"
            width= "300"
          />
        </div>



        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="mx-4 text-center text-gray-600">New to TechStore?</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Link to={listOfLinks.register} className="border border-gray-400 mx-10 my-2 py-2 rounded-4xl text-center hover:bg-gray-200">
          Create new account
        </Link>
      </Form>
    </Modal>
  );
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
    if(data.detail){
        return(data)
    }
    else if(data.token_type === "bearer"){
        saveToken(data.access_token);
        return redirect("/")
    }
}