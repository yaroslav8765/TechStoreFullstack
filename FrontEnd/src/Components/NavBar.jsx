import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
    const [usersPrompt, setUsersPrompt] = useState("");

    function handleChange(event) {
        setUsersPrompt(event.target.value);
    }

    return (
        <div>
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-gray-800">TechStore</h1>

                {/* Search bar */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[400px]">
                    <input
                        className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none"
                        name="title"
                        placeholder="Search products..."
                        onChange={handleChange}
                        value={usersPrompt}
                    />
                    <button className="text-gray-600 hover:text-black">
                        <SearchIcon />
                    </button>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-8">
                    <button className="text-gray-700 hover:text-black">
                        <PersonIcon fontSize="medium" />
                    </button>
                    <button className="text-gray-700 hover:text-black">
                        <ShoppingCartIcon fontSize="medium" />
                    </button>
                </div>
                
            </div >

            <div className="relative w-full flex items-center px-4 py-4 text-gray-700 text-xl font-bold">

            <div className="absolute left-4">
                <button className="hover:bg-gray-300 bg-gray-100 p-2 pl-4 pr-4 rounded-lg">
                <MenuIcon fontSize="large" />
                Catalog
                </button>
            </div>

            <div className="mx-auto flex gap-4">
                <button className="hover:bg-gray-300 p-2 pl-4 pr-4 rounded-lg">
                Smartphones
                <SmartphoneIcon fontSize="large" />
                </button>

                <button className="hover:bg-gray-300 p-2 pl-4 pr-4 rounded-lg">
                Laptops
                <LaptopChromebookIcon fontSize="large" />
                </button>

                <button className="hover:bg-gray-300 p-2 pl-4 pr-4 rounded-lg">
                Headphones
                <HeadsetMicIcon fontSize="large" />
                </button>

                <button className="hover:bg-gray-300 p-2 pl-4 pr-4 rounded-lg">
                Mouses
                <MouseIcon fontSize="large" />
                </button>

                <button className="hover:bg-gray-300 p-2 pl-4 pr-4 rounded-lg">
                Keyboards
                <KeyboardIcon fontSize="large" />
                </button>
            </div>
            </div>

        </div>
    );
}

export default NavBar;