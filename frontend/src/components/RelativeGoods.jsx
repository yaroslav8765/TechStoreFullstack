import RelativeColorIcon from "../ui/RelativeColorIcon";
import RelativeMemoryIcon from "../ui/RelativeMemoryIcon";

const colorOrder = [
  "white",
  "black",
  "gray",
  "red",
  "pink",
  "rose",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia"
];


function RelativeGoods({info, category}){
    return<div className="shadow-md rounded-xl">
        <div className="flex ">
        {info
            ?.filter((parameter) => parameter.difference === "color")
            .sort((a, b) => {
            const aIndex = colorOrder.indexOf(a.diff_value.toLowerCase());
            const bIndex = colorOrder.indexOf(b.diff_value.toLowerCase());
            return aIndex - bIndex;
            })
            .map((parameter, index) => (
            <RelativeColorIcon
                key={index}
                diff_value={parameter.diff_value}
                goods_id={parameter.good_two}
                category={category}
            />
            ))}
        </div>
        <div className="flex ">
        {info
            ?.filter((parameter) => parameter.difference === "memory")
            .sort((a, b) => {
            const aValue = parseInt(a.diff_value);
            const bValue = parseInt(b.diff_value);
            return aValue - bValue;
            })
            .map((parameter, index) => (
            <RelativeMemoryIcon
                key={index}
                diff_value={parameter.diff_value}
                goods_id={parameter.good_two}
                category={category}
            />
            ))}
        </div>
    </div>
}

export default RelativeGoods;