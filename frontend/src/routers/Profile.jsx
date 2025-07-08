import { useNavigate,useRevalidator  } from "react-router-dom";
import { getAuthToken, checkAuthLoader,removeToken } from "../../util/auth.js"
import { useEffect, useState } from "react"
import ProfileMenu from "../ui/ProfileMenu.jsx";
import CartComponent from "../components/CartComponent.jsx";
import UserInfo from "../components/UsersInfo.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import OrdersHistory from "../components/OrdersHistory.jsx";
import CrititcalErrorWindow from "../ui/CrititcalErrorWindow.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

function Profile(){
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([]);
  const [currentMode, setCurretMode ]= useState("users-info");
  const { token, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const path = location.pathname;

    if (path.includes('cart')) {
      setCurretMode("cart");
    } else if (path.includes('users-info')) {
      setCurretMode("users-info");
    } else if (path.includes('change-password')) {
      setCurretMode("change-password");
    } else if (path.includes('orders-history')) {
      setCurretMode("orders-history");
    } else {
      setCurretMode("users-info");
    }
  }, [location.pathname]);

  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;
      const authResult = checkAuthLoader();
      if (authResult) return authResult;

      const response = await fetch(API_URL + "/user/user-info", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const resData = await response.json();
      if (response.ok) {
        setUserInfo(resData);
      } else {
        setErrorMessage((resData.detail || JSON.stringify(resData)) + ". Please, try to re-login");
        setIsError(true);
        removeToken();
        revalidator.revalidate();
      }
      setIsLoading(false);
    }

    loadUserData();
  }, []);


  function setModeToCart(){
      setCurretMode("cart")
      navigate('cart');
  }

  function setModeToEditProfile(){
      setCurretMode("users-info")
      navigate('users-info');
  }

  function setModeToChangePassword(){
      setCurretMode("change-password")
      navigate('change-password');
  }

  function setModeToMyOrders(){
      setCurretMode("orders-history")
      navigate('orders-history');
  }

  function logoutHandler(){
      logout();
      navigate('/');
  }



  return<>
      <div className={`flex justify-center items-center max-w-[1200px] mx-auto w-full ${isLoading ? 'h-[70vh]' : ''} `}>
      {isError && <CrititcalErrorWindow message={errorMessage}/>}
      {isLoading ? <LoadingAnimation className="flex justify-center items-center"/> :
          <div className='flex max-w-[1200px] w-full mx-auto mt-4 gap-6'>
              <div className="flex flex-col bg-white shadow-md rounded-lg w-[300px] h-[330px] gap-4 p-6">
              <h2 className="text-gray-800 text-3xl font-semibold text-center">
                  Hello {userInfo ? userInfo.first_name : null}
              </h2>
              <ProfileMenu
                  onBasketClick={setModeToCart}
                  onEditProfileClick={setModeToEditProfile}
                  onChangePasswordClick={setModeToChangePassword}
                  onMyOrdersClick={setModeToMyOrders}
                  logoutHandler={logoutHandler}
              />
              </div>
              {currentMode === "cart" ? <CartComponent/>: 
              currentMode === "users-info" ? <UserInfo/>:
              currentMode === "change-password" ? <ChangePassword/>:
              currentMode === "orders-history" ? <OrdersHistory/>:
              currentMode === "cart" ? <CartComponent/>:
              null}
          </div>}
      </div>
  </>
}

export default Profile;
