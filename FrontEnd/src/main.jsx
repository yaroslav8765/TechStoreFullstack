import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './routers/MainPage.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './routers/RootLayot.jsx';
import Login from './routers/Login.jsx';
const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>, 
        children: [{
            path:'/', 
            element: <MainPage/>,
            children: [
                {path:'profile', element: <Login/>}
            ]
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
