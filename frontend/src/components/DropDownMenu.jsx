import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import MenuIcon from '@mui/icons-material/Menu';
import { SettingOutlined , EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

function Tab() {

  const navigate = useNavigate();

  const onClick = (e) => {
     if (e.key === "Smartphones") {
      navigate("/Smartphones");
    } else if (e.key === "Laptops") {
      navigate("/Laptops");
    } else if (e.key === "All") {
      navigate("/Catalog");
    }
  };

  const items = [
    {
      key: 'Smartphones',
      icon: <SmartphoneIcon fontSize="medium" />,
      label: 'Smartphones',
    },
    {
      key: 'Laptops',
      icon: <LaptopChromebookIcon />,
      label: 'Laptops',
    },
    {
      key: 'All',
      label: 'See more',
      icon: <EllipsisOutlined />,
    },
  ];

  return (
    <div className="relative w-full flex items-center py-4 text-gray-700 text-xl font-bold">
      <Dropdown menu={{ items, onClick }} trigger={['hover']} placement="bottomLeft">
        <button
          type="button"
          className="h-[50px]  hover:bg-gray-300 bg-gray-100 p-2 pl-4 pr-4 rounded-lg transition-bg duration-200 flex items-center gap-2"
        >
          <MenuIcon fontSize="large" />
          Catalog
        </button>
      </Dropdown>
    </div>
  );
}

export default Tab;