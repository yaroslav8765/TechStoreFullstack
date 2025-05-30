import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './routers/MainPage.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './routers/RootLayot.jsx';
import Login from './routers/Login.jsx';
import {action as loginAction} from "./routers/Login.jsx"
import {tokenLoader} from "../util/auth.js"
import Profile from './routers/Profile.jsx';
import {loader as profileLoader} from "./routers/Profile.jsx"
import CartComponentOverlay from './components/CartComponentOverlay.jsx';
import CartComponent from './components/CartComponent.jsx';

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
                {path:'cart', element: <CartComponentOverlay/>}
            ]
            },
            {
                path:'profile', 
                element:<Profile/>,
                loader: profileLoader,
                children: [
                    
                ]
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
