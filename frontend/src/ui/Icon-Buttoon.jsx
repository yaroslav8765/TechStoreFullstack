import React from "react";

function IconButton({ icon: Icon }) {
    return(
        <button className="text-gray-700 w-[40px] h-[40px] bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition-bg duration-200 ">
            <Icon sx={{ fontSize: '30px' }}/>
        </button>
    )
}

export default IconButton;