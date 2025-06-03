import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState,useEffect } from 'react';
import ExpandedOrderItem from './ExpandedOrderItem';
import { checkAuthLoader, getAuthToken } from "../../util/auth";


function SingleOrder(props){
    const [isExpanded,  setIsExpanded] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderGoods, setOrderGoods] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
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
                console.log(resData);
                setOrderInfo(resData.order);
                setOrderDetails(resData.order_items);
                setOrderGoods(resData.goods);
            }
        }
        getOrderData();
    },[])

    return <div className='flex flex-col mx-2 px-8 py-2 shadow-sm border-1 border-gray-200 rounded-md'>
        <div className="flex justify-between " onClick={expandHandler}>
            <div className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`}>
                <div 
                    className={`flex justify-center items-center hover:bg-gray-100 w-[25px] h-[25px] border-1 
                        border-gray-500 rounded-4xl hover:border-cyan-400  text-gray-500 hover:text-cyan-400 
                        transition-color duration-200 '`}
                        >
                    <ExpandMoreIcon className={`mt-[2px] `} />
                </div>
            </div>

            <h2 className="orders-table">{props.order_number}</h2>
            <h2 className="orders-table">{props.created_at}</h2>
            <h2 className="orders-table">{props.total_price}</h2>
            <h2 className="orders-table">{props.last_update}</h2>
            <h2 className="orders-table">{props.order_status}</h2>

            
        </div>

        <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
            {orderGoods && orderGoods.map((good, index) =>
            <ExpandedOrderItem
                key={index} 
                image_url={1}
                goods_name={"asfsf"}
                quantity={orderDetails[index].quantity}
            />
            )}
        </div>

    </div>
}

export default SingleOrder;
