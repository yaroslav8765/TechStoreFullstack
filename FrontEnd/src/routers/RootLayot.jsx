import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

function RootLayout(){
    return(
        <div>
            <nav>
            <NavBar/>
            </nav>
            <main>
            <Outlet/>
            </main>
            <footer>
            <Footer/>
            </footer>
        </div>
    )
}

export default RootLayout;