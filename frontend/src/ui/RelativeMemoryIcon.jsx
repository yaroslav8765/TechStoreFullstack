import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



function RelativeMemoryIcon({ diff_value, goods_id, category }){
    const { category_URL, id } = useParams();
    const navigate = useNavigate();

    function redirectHandler() {
        navigate(`/${category}/${goods_id}`);
    }


    return<div
            onClick={redirectHandler}
            className={`flex items-center justify-center rounded-md border ${goods_id==id?"border-green-400":"border-gray-500"} h-[30px] w-[65px] p-1 cursor-pointer m-2 hover:bg-gray-200 transition-all duration-200`}
        >
            <div className={`rounded-full  `}><p className="text-gray-600 font-semibold">{diff_value}</p></div> 

        </div>
}

export default RelativeMemoryIcon;