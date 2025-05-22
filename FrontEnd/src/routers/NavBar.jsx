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


function NavBar() {
    const [usersPrompt, setUsersPrompt] = useState("");
    const [isRequestActive, setIsRequestActive] = useState(false);
    const [resData, setResData] = useState([]);    
    async function handleChange(event) {
      setUsersPrompt(event.target.value);
      const response = await fetch(`${listOfLinks.search}?request=${event.target.value}`);
      const data = await response.json();
      setResData(data);
      console.log(resData);
      console.log(`Users prompt:"${event.target.value}`);
      if (event.target.value != "") {
        setIsRequestActive(true);
      } else {
        setIsRequestActive(false)
      }
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
          <h1 className="text-2xl font-bold text-gray-800" ><a href={listOfLinks.main}>TechStore</a></h1>
          <div className="flex flex-col justify-center items-center  z-50">

            {/* Search bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[400px] z-50">
              <input
                className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none"
                name="title"
                placeholder="Search products..."
                onChange={handleChange}
                value={usersPrompt}
                onClick={() => setIsRequestActive(true)}
              />
              <IconButton icon={SearchIcon}/>
            </div>

            {isRequestActive && <div className="ml-4 absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[400px] max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-lg z-50 p-4 space-y-4 scrollbar-hide scroll-smooth">
              {Array.isArray(resData) && resData.map((item, index) => (
                <SingleSearchBarResult
                  key={item.id}
                  img="https://pm1.aminoapps.com/7954/ed76c65c9eadc327e24b378f3b65aa4fa4fc2749r1-479-512v2_00.jpg"
                  title={item.name}
                  price={item.price}
                  old_price={item.old_price}
                  category={item.category}
                  id={item.id}
                  description={item.description}
                />
              ))}
          </div>}

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
    </div>
    );
}

export default NavBar;