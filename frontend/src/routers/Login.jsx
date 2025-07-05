import Modal from "../ui/Modal";
import { Link, Form, redirect, useActionData } from 'react-router-dom';
import { useState } from "react";
import listOfLinks from "../links";
import AuthInput from "../ui/AuthInput";

function Login() {
  const [usersLogin, setUsersLogin] = useState("");
  const [usersPassword, setUsersPassword] = useState("");
  const actionData = useActionData();

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "username") setUsersLogin(value);
    if (name === "password") setUsersPassword(value);
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

        <Link to="123" className="google-auth-btn mx-16 mt-8">
          <div className="flex justify-around items-center">
            <p>Continue with Google</p>
            <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw" className="h-[30px]" />
          </div>
        </Link>

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
        localStorage.setItem("access_token", data.access_token);
        return redirect("/")
    }
}