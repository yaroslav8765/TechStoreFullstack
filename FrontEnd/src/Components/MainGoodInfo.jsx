import AvailabilityIcon from "../ui/AvailabilityIcon";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { MdOutlineComment } from "react-icons/md";

function MainGoodInfo({title, isAvailable, rating, voted, id }){
    return <div className="flex flex-col gap-4 w-full shadow-md rounded-xl px-6 py-8">
        <h2 className="text-gray-900 font-bold text-4xl mt-4">{title}</h2>
        <div className="flex ">
            <AvailabilityIcon state={isAvailable}/>
            <div className="flex justify-evenly w-full">
                <div className="flex gap-2 items-center ">
                    <Rating 
                        name="half-rating-read" 
                        value={rating} 
                        precision={0.5} 
                        readOnly 
                        icon={<StarIcon style={{ color: '#f59e0b' }} />} 
                        emptyIcon={<StarIcon style={{ color: '#6f7787' }} />} 
                    />
                    <MdOutlineComment className="text-gray-600 ml-4"/>
                    <p className="text-gray-600 ml-1 text-lg " onClick={1234}>{voted} reviews</p>
                </div>
                <p className="flex items-center text-gray-600">Goods ID: {id}</p>
            </div>
        </div>
    </div>
}

export default MainGoodInfo;