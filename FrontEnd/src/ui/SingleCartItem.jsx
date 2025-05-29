import SingleSearchBarResult from "./SingleSearchBarResult";

function SingleCartItem(props) {
  return (
    <div className="flex">
        <div className="px-2 w-full box-border">
        <SingleSearchBarResult
            img={props.image_url}
            title={props.name}
            price={props.price}
            old_price={props.old_price}
            category={props.category}
            id={props.id}
            description={props.description}
        />
        </div>
         <div className="flex gap-2">
            <button 
            className="bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] gradient-btn-red " >-</button>
            <input 
            className="border-1 border-gray-500  mt-2 rounded-md w-[40px] h-[40px]
            focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none
            ">{props.quantity}</input>
            <button className="bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] gradient-btn-green">+</button>
        </div>
    </div>
  );
}

export default SingleCartItem;
