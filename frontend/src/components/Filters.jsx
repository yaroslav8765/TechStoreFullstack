import { FaAngleDown } from "react-icons/fa6";


function Filters({expandHandler}){

    return<div className="flex items-end justify-between text-gray-600 border border-gray-100 shadow-md rounded-2xl hover:shadow-lg hover:bg-gray-100 duration-200 transition-all">
        <h2 className=" m-2 text-xl font-semibold">Filter by: </h2>
        <FaAngleDown className="mb-2 mx-2 text-2xl hover:text-gray-800 transition-all duration-200"/>
    </div>
}

export default Filters;