import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";




function AvailabilityIcon({state}){
    return<>
    {state===true? 
        <div className="flex justify-center items-center min-w-[110px] min-h-[30px] bg-green-100 rounded-xl gap-1">
            <IoIosCheckmarkCircle className="text-green-400 text-2xl" />
            <p className="text-green-400">Available</p>
        </div>
        :
        <div className="flex justify-center items-center min-w-[110px] min-h-[30px] bg-red-100 rounded-xl gap-1">
            <FaCircleXmark className="text-red-400 text-xl"/>
            <p className="text-red-400">Sold out</p>
        </div>}
    </>
}

export default AvailabilityIcon;