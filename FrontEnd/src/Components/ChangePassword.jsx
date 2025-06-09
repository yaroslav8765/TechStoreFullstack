import AuthInput from "../ui/AuthInput";
import { Form } from "react-router-dom";
import { useState } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import { green } from "@mui/material/colors";

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPasswordOne, setNewPasswordOne] = useState("");
    const [newPasswordTwo, setNewPasswordTwo] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    function handleInputChange(event) {
    const { name, value } = event.target;

    let updatedOld = oldPassword;
    let updatedOne = newPasswordOne;
    let updatedTwo = newPasswordTwo;

    if (name === "old_password") updatedOld = value;
    if (name === "new_password_one") updatedOne = value;
    if (name === "new_password_two") updatedTwo = value;

    if (name === "old_password") setOldPassword(value);
    if (name === "new_password_one") setNewPasswordOne(value);
    if (name === "new_password_two") setNewPasswordTwo(value);

    if (updatedOne !== updatedTwo) {
        setMessage("Passwords are not equal");
        setColor("text-red-400");
    } else {
        setMessage("");
    }
    }


    async function submitHandler() {
        if(newPasswordOne === newPasswordTwo){
            const postData = {
            old_password: oldPassword,
            new_password: newPasswordOne
        };
            const API_URL = import.meta.env.VITE_API_URL;
            const authResult = checkAuthLoader();
            if (authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(API_URL + "/user/change-password",{
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(postData)
            })
            const resData = await response.json();
            if(response.ok){
                setMessage(resData.detail);
                setColor("text-green-400");
            }else{
                setMessage(resData.detail);
                setColor("text-red-400");
            }
        } else {
            setMessage("Passwords are not equal");
            setColor("text-red-400");
        }
    }

    return <>
    <div className={`flex flex-col w-full items-center  shadow-md rounded-xl `}>
        <div  className="flex flex-col w-full items-center ">
            <div className="flex flex-col w-[300px]">
                <AuthInput
                label="Old password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={handleInputChange}
                name="old_password"
                />
                <AuthInput
                label="New password"
                placeholder="Enter your new password"
                value={newPasswordOne}
                onChange={handleInputChange}
                name="new_password_one"
                />
                <AuthInput
                label="Retype your new password"
                placeholder="Confirm your new password"
                value={newPasswordTwo}
                onChange={handleInputChange}
                name="new_password_two"
                />
            </div>
                <div className="h-6">
                {message && <p className={`${color} text-md`}>{message}</p>}
                </div>
                <button
                className="gradient-btn-green rounded-4xl min-w-[200px] min-h-[40px] mt-2"
                onClick={submitHandler}
                >
                Save changes
                </button>
        </div>
    </div>
    </>
}

export default ChangePassword;