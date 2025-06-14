import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function RelativeColorIcon({ diff_value, goods_id, category }) {
    const navigate = useNavigate();
    const { category_URL, id } = useParams();

    function redirectHandler() {
        navigate(`/${category}/${goods_id}`);
    }

const bgColorMap = {
  red: "bg-radial from-red-300 to-red-500",
  blue: "bg-radial from-blue-300 to-blue-500",
  green: "bg-radial from-green-300 to-green-500",
  yellow: "bg-radial from-yellow-300 to-yellow-500",
  purple: "bg-radial from-purple-300 to-purple-500",
  pink: "bg-radial from-pink-300 to-pink-500",
  indigo: "bg-radial from-indigo-300 to-indigo-500",
  teal: "bg-radial from-teal-300 to-teal-500",
  orange: "bg-radial from-orange-300 to-orange-500",
  lime: "bg-radial from-lime-300 to-lime-500",
  amber: "bg-radial from-amber-300 to-amber-500",
  cyan: "bg-radial from-cyan-300 to-cyan-500",
  emerald: "bg-radial from-emerald-300 to-emerald-500",
  fuchsia: "bg-radial from-fuchsia-300 to-fuchsia-500",
  rose: "bg-radial from-rose-300 to-rose-500",
  sky: "bg-radial from-sky-300 to-sky-500",
  violet: "bg-radial from-violet-300 to-violet-500",
  gray: "bg-radial from-gray-200 to-gray-500",
  black: "bg-radial from-neutral-600 to-black",
  white: "bg-radial from-white to-neutral-100",
};



    const bgColor = bgColorMap[diff_value] || "bg-gray-400";

    return (
        <div
        onClick={redirectHandler}
        className={`flex items-center justify-center rounded-full border ${goods_id==id?"border-green-400":"border-gray-500"} m-2 h-[40px] w-[40px] cursor-pointer hover:brightness-130 transition`}
        >
        <div className={`rounded-full border border-gray-500 h-[34px] w-[34px] ${bgColor}`} />
        </div>
    );
}

export default RelativeColorIcon;
