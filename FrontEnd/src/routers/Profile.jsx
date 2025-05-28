import { redirect, useLoaderData } from "react-router-dom";
import { useNavigate,useRevalidator  } from "react-router-dom";
import listOfLinks from "../links";
import { getAuthToken, checkAuthLoader } from "../../util/auth.js"
import { Link } from "react-router-dom";
import { useState } from "react"
import ProfileMenu from "../components/ui/ProfileMenu";

function Profile(){
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const userInfo = useLoaderData();
    const [currentMode, setCurretMode ]= useState("Basket");

    function setModeToBasket(){
        setCurretMode("Basket")
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
      <div className='flex max-w-[1200px] w-full mx-auto mt-4'>
        <div className="flex flex-col bg-gray-100 rounded-xl w-[300px] gap-1">
        <h2 className="text-gray-700 text-4xl font-semibold text-center mt-2">Hello, {userInfo?userInfo.first_name:null} </h2>
        <ProfileMenu
            onBasketClick={setModeToBasket}
            onEditProfileClick={setModeToEditProfile}
            onChangePasswordClick={setModeToChangePassword}
            onMyOrdersClick={setModeToMyOrders}
            logoutHandler={logoutHandler}
        />
        </div>
      </div>
    );
}

export default Profile;

export async function loader() {
    const authResult = checkAuthLoader();
    if (authResult) return authResult;
    const token = getAuthToken();

    const response = await fetch(listOfLinks.main_api + listOfLinks.get_users_info, {
        method: "GET",
        headers: {
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
        }
    });

    const resData = await response.json();
    return resData;
}