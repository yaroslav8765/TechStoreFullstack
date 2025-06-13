import { useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";
import { Link } from "react-router-dom";
import { FaBox, FaDollarSign, FaCalculator } from 'react-icons/fa';

function ExpandedOrderItem(props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-2 mt-4 ">
      <Link to={`/${props.category}/${props.id}`}>
        <img
          className="object-contain min-w-20 h-20 rounded-md"
          src={props.image_url}
          alt={props.goods_name}
        />
      </Link>

      <div className="flex flex-col flex-grow w-full max-w-[200px]">
        <Link to={`/${props.category}/${props.id}`}>
          <p className="text-gray-800 text-lg font-semibold hover:underline">{props.goods_name}</p>
        </Link>
      </div>
      <div className=" max-w-[450px] flex flex-wrap justify-between items-start w-full text-gray-600 text-sm text-right">
        <p className="flex items-center justify-end gap-1">
          <FaBox className="text-cyan-500" /> Quantity: <span className="font-medium">{props.quantity}</span>
        </p>
        <p className="flex items-center justify-end gap-1">
          <FaDollarSign className="text-green-500" /> Price: <span className="font-medium">{props.price} ₴</span>
        </p>
        <p className="flex items-center justify-end gap-1">
          <FaCalculator className="text-yellow-600" /> Total: <span className="font-medium">{props.price_for_all} ₴</span>
        </p>
      </div>
    </div>
  );
}


export default ExpandedOrderItem;


/*
image_url={good.image_url}
goods_name={good.name}
quantity={orderDetails[index].quantity}
price={orderDetails[index].price_for_one}
price_for_all={orderDetails[index].quantity*orderDetails[index].price_for_one}
shipping_adress={orderInfo.shipping_adress}
reciever_name={orderInfo.reciever_name} 

*/