import { Link } from "react-router-dom";

function SingleSearchBarResult(props) {
  return (
    <Link to={`/${props.category}/${props.id}`} className="block mx-2">
      <div className="flex flex-row my-2 justify-between rounded-md bg-gray-100 w-full hover:bg-gray-200 transition-bg duration-200  ">
        <div className="flex w-full max-w-[120px] h-full max-h-[180px]">
          <img
            src={props.img}
            alt={props.productName}
            className="w-[100px] h-[125px] object-contain m-2 rounded-xl"
          />
        </div>
        <div className="ml-2 flex flex-col w-full pt-2">
          <h2 className="text-gray-700 font-semibold text-lg">{props.title}</h2>
          <div className="flex mt-2">
            {props.old_price && (
              <p className="text-gray-600 text-md line-through">
                {props.old_price}₴
              </p>
            )}
            <p
              className={`ml-2 text-lg ${
                props.old_price ? "text-red-500" : "text-gray-600"
              }`}
            >
              {props.price} ₴
            </p>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">{props.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default SingleSearchBarResult;
