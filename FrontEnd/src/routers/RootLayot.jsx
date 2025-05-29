import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import { Outlet } from 'react-router-dom';

function RootLayout(){
    return(
        <div className="min-h-screen flex flex-col">
            <nav>
            <NavBar/>
            </nav>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <footer>
            <Footer/>
            </footer>
        </div>
    )
}

export default RootLayout;