import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Tab from "./DropDownMenu";
import IconButton from "./ui/Icon-Buttoon";
import CategoryButton from "./ui/Category-Button";

function NavBar() {
    const [usersPrompt, setUsersPrompt] = useState("");

    function handleChange(event) {
        setUsersPrompt(event.target.value);
    }

    return (
    <div className=" px-6 py-4 bg-white shadow-md">
      <div className=" flex items-center justify-between max-w-[1200px] mx-auto">
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
          <IconButton icon={SearchIcon}/>
        </div>

          {/* Icons */}
          <div className="flex items-center space-x-8">
            <IconButton icon={PersonIcon}/>
            <IconButton icon={ShoppingCartIcon}/>
          </div>

      </div >

      <div className=" w-full flex items-center justify-between  py-4 text-gray-700 text-xl font-bold max-w-[1200px] mx-auto ">

        <div className=" ">
          <Tab/>
        </div>

        <div className=" flex gap-8">
          <CategoryButton title="Smartphones" icon={SmartphoneIcon}/>
          <CategoryButton title="Laptops" icon={LaptopChromebookIcon}/>
          <CategoryButton title="Headphones" icon={HeadsetMicIcon}/>
          <CategoryButton title="Mouses" icon={MouseIcon}/>
          <CategoryButton title="Keyboards" icon={KeyboardIcon}/>
        </div>

      </div>

    </div>
    );
}

export default NavBar;