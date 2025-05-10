import React from "react";

function IconButton({ icon: Icon }) {
    return(
        <button className="text-gray-700 hover:text-black transition-bg duration-200">
            <Icon />
        </button>
    )
}

export default IconButton;