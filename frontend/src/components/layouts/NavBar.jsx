import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Tab from "../DropDownMenu";
import IconButton from "../../ui/Icon-Buttoon";
import CategoryButton from "../../ui/Category-Button";
import listOfLinks from "../../links";
import { Link, useRouteLoaderData } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import LogoLink from "../../ui/LogoLink";
import CartComponentOverlay from "../CartComponentOverlay";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "../../providers/AuthProvider";


function NavBar() {
  const { token } = useAuth();
  const [isCartOpened, setIsCartOpened] = useState(false);

  function closeCartComponent(){
      setIsCartOpened(false);
  }
  function openCartComponent(){
    setIsCartOpened(true);
  }

  return (
    <div className="relative">
      {isCartOpened && <CartComponentOverlay className="z-60" clickHandler={closeCartComponent} navigateTo="." />}
      <div className="px-6 py-4 bg-white shadow-md">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto">
          <LogoLink />
          <SearchBar />
          <div className="flex items-center space-x-8">
            <div className="block md:hidden">
              <IconButton icon={SearchIcon}/>
            </div>
            <Link to={token ? `${listOfLinks.profile}/users-info` : listOfLinks.auth}>
              <IconButton icon={PersonIcon} />
            </Link>
            <div onClick={openCartComponent}>
              <IconButton icon={ShoppingCartIcon} />
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between py-4 text-gray-700 text-xl font-bold max-w-[1200px] mx-auto gap-8">
          <div className="max-w-[150px]">
            <Tab />
          </div>
          <div className="flex gap-8 flex-wrap w-full justify-around">
            <div className="hidden sm:block">
            <CategoryButton title="Smartphones" icon={SmartphoneIcon} categoty_link={"/Smartphones"} />
            </div>
            <div className="hidden sm:block">
            <CategoryButton title="Laptops" icon={LaptopChromebookIcon} categoty_link={"/Laptops"}/>
            </div>
            <div className="hidden md:block">
              <CategoryButton title="Headphones" icon={HeadsetMicIcon} categoty_link={"/Headphones"}/>
            </div>
            <div className="hidden lg:block">
              <CategoryButton title="Mice" icon={MouseIcon} categoty_link={"/Mouses"}/>
            </div>
            <div className="hidden xl:block">
              <CategoryButton title="Keyboards" icon={KeyboardIcon} categoty_link={"/Keyboards"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

