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
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

const items = [
    {
      key: 'sub1',
      icon: <SmartphoneIcon fontSize="medium" />,
      label: 'Smartphones',
      children: [
        {
          key: '1-1',
          label: 'By brand',
          type: 'group',
          children: [
            { key: '1', label: 'Apple' },
            { key: '2', label: 'Samsung' },
            { key: '3', label: 'Xiaomi' },
            { key: '4', label: 'Motorola' },
            { key: '5', label: 'Poco' },
          ],
        },
        {
          key: '1-2',
          label: 'New',
          type: 'group',
          children: [
            { key: '6', label: 'Apple iPhone 16 Pro Max' },
            { key: '7', label: 'Samsung Galaxy S24 Ultra' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: <LaptopChromebookIcon />,
      label: 'Laptops',
      children: [
        { key: '8', label: 'Option 5' },
        { key: '9', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '10', label: 'Option 7' },
            { key: '11', label: 'Option 8' },
          ],
        },
      ],
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '12', label: 'Option 9' },
        { key: '13', label: 'Option 10' },
        { key: '14', label: 'Option 11' },
        { key: '15', label: 'Option 12' },
      ],
    },
  ];
  
  const onClick = (e) => {
    console.log('click', e);
  };
  
  const Tab = () => {
    const menu = <Menu onClick={onClick} mode="vertical" items={items} style={{ width: 256 }} />;
  
    return (
        <div className="relative w-full flex items-center px-4 py-4 text-gray-700 text-xl font-bold"> 
            <Dropdown menu={{ items, onClick }} trigger={['hover']} placement="rightTop"> 
                <button 
                    type="text" 
                    className="hover:bg-gray-300 bg-gray-100 p-2 pl-4 pr-4 ml-2 rounded-2xl " >                 
                    <MenuIcon fontSize="large"/>
                    Catalog
                </button>
            </Dropdown>
      </div>
    );
  };




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
                
            <div className="absolute left-4 ">
                <Tab/>
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