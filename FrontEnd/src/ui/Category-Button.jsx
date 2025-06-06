import React from "react";
import { Link } from "react-router-dom";

function CategoryButton({ title, icon: Icon, categoty_link}) {
    return(
        <Link className="h-[50px]  hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 px-4 py-2 transition-bg duration-200" to={categoty_link}>
            {title} 
            <Icon fontSize="medium" />
        </Link>
    )
}

export default CategoryButton;