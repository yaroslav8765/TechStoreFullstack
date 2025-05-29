import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Tab from "../components/DropDownMenu";
import IconButton from "../components/ui/Icon-Buttoon";
import CategoryButton from "../components/ui/Category-Button";
import SingleSearchBarResult from "../components/ui/SingleSearchBarResult";
import listOfLinks from "../links";
import { Link, useRouteLoaderData } from "react-router-dom";

function NavBar() {

    const token = useRouteLoaderData('root');

    const [usersPrompt, setUsersPrompt] = useState("");
    const [isRequestActive, setIsRequestActive] = useState(false);
    const [resData, setResData] = useState([]);    

    async function handleClickOnSearch() {
      setIsRequestActive(true);
      const response = await fetch(`http://127.0.0.1:8000/goods/bestsellers`);
      const data = await response.json();
      setResData(data);
    }

    async function handleChange(event) {
      setUsersPrompt(event.target.value);
      const response = await fetch(`${listOfLinks.search}?request=${event.target.value}`);
      const data = await response.json();
        setResData(data);
    }

    return (
    <div className="relative">
        {isRequestActive && (
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsRequestActive(false)}
          ></div>
        )}
      <div className=" px-6 py-4 bg-white shadow-md">
        <div className=" flex items-center justify-between max-w-[1200px] mx-auto">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-800" ><Link to={listOfLinks.main}>TechStore</Link></h1>
          <div className="flex flex-col justify-center items-center  z-50">

            {/* Search bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 h-[45px] w-[400px] z-50 shadow-md">
              <input
                className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none"
                name="title"
                placeholder="Search products..."
                onChange={handleChange}
                value={usersPrompt}
                onClick={handleClickOnSearch}
              />
              <SearchIcon sx={{ fontSize: '30px' }} className="text-gray-700 w-[40px] h-[40px]  rounded-md hover:text-black transition-bg duration-200"/>
            </div>

            {isRequestActive && <div className=" absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[400px] max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-lg z-50  space-y-4 scrollbar-hide scroll-smooth">
              {Array.isArray(resData) ? (
                resData.length > 0 ? (
                  resData.map((item) => (
                    <SingleSearchBarResult
                      key={item.id}
                      img={item.image_url}
                      title={item.name}
                      price={item.price}
                      old_price={item.old_price}
                      category={item.category}
                      id={item.id}
                      description={item.description}
                    />
                  ))
                ) : (
                  <p className="text-gray-700 text-center py-4">No results</p>
                )
              ) : (
                <p className="text-red-500">Error</p>
              )}
          </div>}

          </div>
            {/* Icons */}
            <div className="flex items-center space-x-8">
              <Link to={token ? listOfLinks.profile : listOfLinks.auth}><IconButton  icon={PersonIcon}/></Link>
              <Link to="/card"><IconButton icon={ShoppingCartIcon}/></Link>
            </div>

        </div >

        <div className=" w-full flex items-center justify-between  py-4 text-gray-700 text-xl font-bold max-w-[1200px] mx-auto ">

          <div className=" ">
            <Tab/>
          </div>

          <div className=" flex gap-8">
            <CategoryButton title="Smartphones" icon={SmartphoneIcon} categoty_link={"/Smartphones"}/>
            <CategoryButton title="Laptops" icon={LaptopChromebookIcon} categoty_link={"/Laptops"}/>
            <CategoryButton title="Headphones" icon={HeadsetMicIcon} categoty_link={"/Headphones"}/>
            <CategoryButton title="Mouses" icon={MouseIcon} categoty_link={"/Mouses"}/>
            <CategoryButton title="Keyboards" icon={KeyboardIcon} categoty_link={"/Keyboards"}/>
          </div>

        </div>

      </div>
    </div>
    );
}

export default NavBar;