import Modal from "../ui/Modal";
import { Link, Form, redirect, useActionData } from 'react-router-dom';
import { useState, useEffect } from "react";
import listOfLinks from "../links";
import AuthInput from "../ui/AuthInput";
import LoadingAnimation from "../components/LoadingAnimation";

function Register() {
    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const actionData = useActionData();
    useEffect(() => {
      if (actionData) {
        setIsLoading(false);
      }
    }, [actionData]);

    var passwordMismatch = password && confirmPassword && password !== confirmPassword;

    function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'email_or_phone_number') setEmailOrPhoneNumber(value);
    if (name === 'first_name') setFirstName(value);
    if (name === 'last_name') setLastName(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirm_password') setConfirmPassword(value);
    }

    useEffect(() => {
      console.log(actionData);
    if (
        emailOrPhoneNumber.length > 5 &&
        firstName.length > 2 &&
        lastName.length > 2 &&
        password===confirmPassword &&
        password.length > 0
    ) {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true);
    }
    }, [emailOrPhoneNumber, firstName, lastName, password, confirmPassword, passwordMismatch]);

  return (
    <div className="max-w-[1200px] mx-auto mt-4 min-h-[70vh] flex flex-col justify-center items-center gap-6 px-4">
      {isLoading && <div className="w-[100vw] h-[100vh] z-50 fixed inset-0 flex items-center justify-center bg-gray-600/50"><LoadingAnimation/></div>}
      <Form method="post" className="flex flex-col w-[380px] min-h-[600px] bg-white">
        <h2 className="text-2xl font-bold text-center py-4 border-b text-gray-600">Create Account</h2>


        <AuthInput
          label="Email or mobile phone number"
          placeholder="Enter email or phone"
          name="email_or_phone_number"
          value={emailOrPhoneNumber}
          onChange={handleInputChange}
          required
          errorMessage={actionData ? actionData.detail : null}
        />

        <AuthInput
          label="First Name"
          placeholder="Enter your first name"
          name="first_name"
          value={firstName}
          onChange={handleInputChange}
          required
        />

        <AuthInput
          label="Last Name"
          placeholder="Enter your last name"
          name="last_name"
          value={lastName}
          onChange={handleInputChange}
          required
        />

        <AuthInput
          label="Password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handleInputChange}
          isInputHidden="Yes"
          isNewPassword="Yes"
          required
        />

        <AuthInput
          label="Confirm Password"
          placeholder="Re-enter password"
          name="confirm_password"
          value={confirmPassword}
          onChange={handleInputChange}
          isInputHidden="Yes"
          isNewPassword="Yes"
          required
          errorMessage={passwordMismatch ? "Passwords do not match" : null}
        />

        <div className="mx-6 text-sm text-gray-600 mt-2">
          <p>
            By continuing, you agree to TechStore's
            <Link to="/terms-and-conditions" className="text-blue-400 mx-2 hover:text-blue-700">Conditions of Use</Link>
            and
            <Link to="/privacy-policy" className="text-blue-400 mx-2 hover:text-blue-700">Privacy Notice</Link>.
          </p>
        </div>

        <div className="flex justify-between m-6">
          <Link to=".." className="gradient-btn-red px-8 py-2 rounded-4xl">Go back</Link>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="gradient-btn-green px-10 py-2 rounded-4xl disabled:opacity-50"
            onClick={()=>{setIsLoading(true);}}
          >
            Create
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="mx-4 text-center text-gray-600">Already have an account?</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Link to="/auth" className="border border-gray-400 mx-10 my-2 py-2 rounded-4xl text-gray-600 text-center hover:bg-gray-200">
          Sign in
        </Link>
      </Form>
      </div>
  );
}

export default Register;


export async function action({request}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    if (postData.password !== postData.confirm_password) {
    return { detail: "Passwords do not match" };
    }

    const body = {
        email_or_phone_number: postData.email_or_phone_number,
        first_name: postData.first_name,
        last_name: postData.last_name,
        password: postData.password,
    };
    console.log(body);
    const response = await fetch(`${API_URL}/auth/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    });

    const data = await response.json();
    if(data?.detail){
        return { detail: data.detail };
    }
    else{
        return redirect("/confirm-email")
    }
}