import React, { useState } from "react";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import MenuIcon from '@mui/icons-material/Menu';
import { SettingOutlined } from '@ant-design/icons';
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
      key: 'sub3',
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
        <div className="relative w-full flex items-center py-4 text-gray-700 text-xl font-bold"> 
            <Dropdown menu={{ items, onClick }} trigger={['hover']} placement="bottomLeft"> 
                <button 
                    type="text" 
                    className="hover:bg-gray-300 bg-gray-100 p-2 pl-4 pr-4 rounded-lg transition-bg duration-200" >                 
                    <MenuIcon fontSize="large"/>
                    Catalog
                </button>
            </Dropdown>
      </div>
    );
  };

export default Tab;