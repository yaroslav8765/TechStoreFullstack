import { redirect, useLoaderData } from "react-router-dom";
import { useNavigate,useRevalidator  } from "react-router-dom";
import listOfLinks from "../links";
import { getAuthToken, checkAuthLoader,removeToken } from "../../util/auth.js"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import ProfileMenu from "../ui/ProfileMenu.jsx";
import CartComponent from "../components/CartComponent.jsx";
import UserInfo from "../components/UsersInfo.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import OrdersHistory from "../components/OrdersHistory.jsx";
import CrititcalErrorWindow from "../ui/CrititcalErrorWindow.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";

function Profile(){
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    //const userInfo = useLoaderData();
    const [userInfo, setUserInfo] = useState([]);
    const [currentMode, setCurretMode ]= useState("Profile");
    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadUserData() {
            setIsLoading(true)
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
            if(response.ok){
                setIsLoading(false);
                return resData;

            } else {
                setErrorMessage((resData.detail || JSON.stringify(resData)) + ". Please, try to re-login");
                console.error("PROFILE ERROR:", resData.message || resData);
                setIsError(true);
                removeToken();
                revalidator.revalidate();
            }
            setIsLoading(false);
        }

        loadUserData().then((data) => {
        setUserInfo(data);
        });
    },[])

    function setModeToCart(){
        setCurretMode("Cart")
        navigate('cart');
    }

    function setModeToEditProfile(){
        setCurretMode("Profile")
        navigate('users-info');
    }

    function setModeToChangePassword(){
        setCurretMode("Password")
        navigate('change-password');
    }

    function setModeToMyOrders(){
        setCurretMode("Orders")
        navigate('orders-history');
    }

    function logoutHandler(){
        removeToken();
        revalidator.revalidate();
        navigate('/');
    }



    return<>
        <div className={`flex justify-center items-center max-w-[1200px] mx-auto w-full ${isLoading ? 'h-[70vh]' : ''} `}>
        {isError && <CrititcalErrorWindow message={errorMessage}/>}
        {isLoading ? <LoadingAnimation className="flex justify-center items-center"/> :
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
                {currentMode === "Cart" ? <CartComponent/>: 
                currentMode === "Profile" ? <UserInfo/>:
                currentMode === "Password" ? <ChangePassword/>:
                currentMode === "Orders" ? <OrdersHistory/>:
                currentMode === "Cart" ? <CartComponent/>:
                null}
            </div>}
        </div>
    </>
}

export default Profile;

//Need to add JWT ERROR
export async function loader() {
    // const API_URL = import.meta.env.VITE_API_URL;
    // const authResult = checkAuthLoader();
    // if (authResult) return authResult;
    // const token = getAuthToken();

    // const response = await fetch(API_URL + "/user/user-info", {
    //     method: "GET",
    //     headers: {
    //     "Content-type":"application/json",
    //     "Authorization": `Bearer ${token}`
    //     }
    // });

    // const resData = await response.json();
    // return resData;
}