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
import OrderCongratulations from './routers/OrderCongratulations.jsx';
import Catalog from './routers/Catalog.jsx';
import AboutUs from './routers/AboutUs.jsx';
import PrivacyPolicy from './routers/PrivacyPolicy.jsx';
import ReturnPolicyFAQs from './routers/ReturnPolicyFAQs.jsx';
import TermsAndConditions from './routers/TermsAndConditions.jsx';
import SearchResults from './routers/SearchResults.jsx';
import CreateUser from './routers/CreateUser.jsx';
import {action as registerAction} from "./routers/CreateUser.jsx"


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
                path:"/catalog",
                element: <Catalog/>
            },
            {
                path:"/about-us",
                element: <AboutUs/>
            },
            {
                path:"/privacy-policy",
                element: <PrivacyPolicy/>
            },
            {
                path:"/return-policy-faqs",
                element: <ReturnPolicyFAQs/>
            },
            {
                path:"/terms-and-conditions",
                element: <TermsAndConditions/>
            },
            {
                path:"/search/:result",
                element: <SearchResults/>
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
        element:<Checkout/>,
    },
    {
        path: '/check-out/congrats/:order_number',
        element: <OrderCongratulations/>
    },
    {
        path:"/register",
        element: <CreateUser/>,
        action: registerAction
    }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
