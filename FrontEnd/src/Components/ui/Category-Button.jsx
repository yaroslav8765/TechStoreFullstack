import React from "react";

function CategoryButton({ title, icon: Icon }) {
    return(
        <button className="hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 px-4 py-2 transition-bg duration-200">
            {title} 
            <Icon fontSize="large" />
        </button>
    )
}

export default CategoryButton;