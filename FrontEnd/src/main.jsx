import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './routers/MainPage.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './routers/RootLayot.jsx';
import Login from './routers/Login.jsx';
import {action as loginAction} from "./routers/Login.jsx"
import {tokenLoader} from "../util/auth.js"
import listOfLinks from "./links";
import Profile from './routers/Profile.jsx';
import {loader as profileLoader} from "./routers/Profile.jsx"
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
            ]
            },
            {
                path:listOfLinks.profile, 
                element:<Profile/>,
                loader: profileLoader
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
