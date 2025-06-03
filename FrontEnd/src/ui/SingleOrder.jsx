import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdExpandMore } from "react-icons/md";

import { useState,useEffect } from 'react';
import ExpandedOrderItem from './ExpandedOrderItem';
import { checkAuthLoader, getAuthToken } from "../../util/auth";


function SingleOrder(props){
    const [isExpanded,  setIsExpanded] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderGoods, setOrderGoods] = useState([]);
    const [orderInfo, setOrderInfo] = useState();
    const [containerHeight, setContainerHeight] = useState();
    const API_URL = import.meta.env.VITE_API_URL;

    async function expandHandler() {
        isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    } 

     useEffect(()=>{
        async function getOrderData() {
            
            const authResult = checkAuthLoader();
            if(authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/user/show-order-info/${props.order_number}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })

            if(response.ok){
                const resData = await response.json();
                setOrderInfo(resData.order);
                setOrderDetails(resData.order_items);
                setOrderGoods(resData.goods);
                console.log(orderGoods.length*114);
                setContainerHeight(((orderGoods.length+1)*114)+72);
            }
        }
        getOrderData();
    },[])

    return <div className='flex flex-col mx-2 mb-2  px-8 py-2 shadow-sm border-1 border-gray-200 rounded-md '>
        <div className="flex justify-between " onClick={expandHandler}>
            <MdExpandMore className={`mt-[2px] border-1 rounded-full text-2xl border-gray-500 hover:text-cyan-400 hover:border-cyan-400 text-gray-500 transition relative duration-150 ease-in ${isExpanded ? 'transform rotate-180' : ''} `} />

            <h2 className="orders-table">{props.order_number}</h2>
            <h2 className="orders-table">{props.created_at}</h2>
            <h2 className="orders-table">{props.total_price}</h2>
            <h2 className="orders-table">{props.last_update}</h2>
            <h2 className="orders-table">{props.order_status}</h2>

            
        </div>
        <div className='overflow-y-auto max-h-[500px] '>
            <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{
                maxHeight: isExpanded ? `${containerHeight}px` : '0px',
            }}
            >

                {orderGoods && orderGoods.map((good, index) =>
                <ExpandedOrderItem
                    key={index} 
                    image_url={good.image_url}
                    goods_name={good.name}
                    quantity={orderDetails[index].quantity}
                    price={orderDetails[index].price_for_one}
                    price_for_all={orderDetails[index].quantity*orderDetails[index].price_for_one}
                    shipping_adress={orderInfo.shipping_adress}
                    reciever_name={orderInfo.reciever_name}
                />
                )}
                <div className="flex flex-col items-end text-right text-sm text-gray-500 p-4">
                    <p>Recipient: <span className="font-medium">{orderInfo?.reciever_name}</span></p>
                    <p>Address: <span className="font-medium">{orderInfo?.shipping_adress}</span></p>
                </div>
            </div>
        </div>
    </div>
}

export default SingleOrder;
