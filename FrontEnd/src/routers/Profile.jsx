import { redirect, useLoaderData } from "react-router-dom";
import { useNavigate,useRevalidator  } from "react-router-dom";
import listOfLinks from "../links";
import { getAuthToken, checkAuthLoader } from "../../util/auth.js"
import { Link } from "react-router-dom";
import { useState } from "react"
import ProfileMenu from "../ui/ProfileMenu.jsx";
import CartComponent from "../components/CartComponent.jsx";

function Profile(){
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const userInfo = useLoaderData();
    const [currentMode, setCurretMode ]= useState("Cart");

    function setModeToCart(){
        setCurretMode("Cart")
    }

    function setModeToEditProfile(){
        setCurretMode("Profile")
    }

    function setModeToChangePassword(){
        setCurretMode("Password")
    }

    function setModeToMyOrders(){
        setCurretMode("Orders")
    }

    function logoutHandler(){
        localStorage.removeItem("access_token");
        revalidator.revalidate();
        navigate('/');
    }



    return(
      <div className='flex max-w-[1200px] w-full mx-auto mt-4 gap-6'>
        <div className="flex flex-col bg-white shadow-md rounded-lg w-[300px] h-[330px] gap-4 p-6">
        <h2 className="text-gray-800 text-3xl font-semibold text-center">
            Hello, {userInfo ? userInfo.first_name : null}
        </h2>
        <ProfileMenu
            onBasketClick={setModeToCart}
            onEditProfileClick={setModeToEditProfile}
            onChangePasswordClick={setModeToChangePassword}
            onMyOrdersClick={setModeToMyOrders}
            logoutHandler={logoutHandler}
        />
        </div>
        {currentMode === "Cart" ? <CartComponent/>: null}
      </div>
    );
}

export default Profile;

export async function loader() {
    const API_URL = import.meta.env.VITE_API_URL;
    const authResult = checkAuthLoader();
    if (authResult) return authResult;
    const token = getAuthToken();

    const response = await fetch(API_URL + "/user/user-info", {
        method: "GET",
        headers: {
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
        }
    });

    const resData = await response.json();
    return resData;
}