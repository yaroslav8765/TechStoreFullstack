import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './routers/MainPage.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './routers/RootLayot.jsx';
import Login from './routers/Login.jsx';
import {action as loginAction} from "./routers/Login.jsx"
import {tokenLoader} from "../util/auth.js"
import Profile from './routers/Profile.jsx';
import CartComponentOverlay from './components/CartComponentOverlay.jsx';
import CartComponent from './components/CartComponent.jsx';
import UserInfo from './components/UsersInfo.jsx';
import OrdersHistory from './components/OrdersHistory.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import {action as changeUserInfoAction} from "./components/UsersInfo.jsx"
import GoodsInfo from './routers/GoodsInfo.jsx';
import Category from './routers/Category.jsx';
import Checkout from './routers/Checkout.jsx';

const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>,
        loader: tokenLoader,
        id:'root', 
        children: [{
            path:'/', 
            element: <MainPage/>,
            children: [
                {path:'auth', element: <Login/>, action: loginAction},
                {path:'cart', element: <CartComponentOverlay navigateTo=".." isAllowedNavigate={true}/>}
            ]
            },
            {
                path:'profile', 
                element:<Profile/>,
                action: changeUserInfoAction,
                children: [
                    {path: 'cart', element :<CartComponent/>},
                    {path: 'users-info', element :<UserInfo/>},
                    {path: 'change-password', element :<ChangePassword/>},
                    {path: 'orders-history', element :<OrdersHistory/>},
                ]
            },
            {
                path:'/:category',
                element:<Category/>
            },
            {
                path:'/:category/:id',
                element:<GoodsInfo/>
            },
        ]
    },
    {
        path:'/check-out', 
        element:<Checkout/>
    }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
