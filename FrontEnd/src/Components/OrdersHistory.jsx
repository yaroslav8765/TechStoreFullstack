import SingleOrder from "../ui/SingleOrder";
import { useState, useEffect } from "react";
import { checkAuthLoader, getAuthToken } from "../../util/auth";


function OrdersHistory(){
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        async function getOrderData() {
            
            const authResult = checkAuthLoader();
            if(authResult) return authResult;
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/user/show-user-orders`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })

            if(response.ok){
                const resData = await response.json();
                console.log(resData);
                setOrders(resData);
            }
        }
        getOrderData();
    },[])


    return <div className={`flex flex-col w-full items-center shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>

            <div className="flex flex-col w-full  gap-1">
                <div className="flex mx-2 justify-between px-8 py-2">
                    <div className='flex justify-center items-center  w-[25px] h-[25px] border-1 '> </div>
                    <h2 className="orders-table">Order number</h2>
                    <h2 className="orders-table">Created at</h2>
                    <h2 className="orders-table">Total price</h2>
                    <h2 className="orders-table">Last update</h2>
                    <h2 className="orders-table">Order status</h2>
                </div>
                
                {orders && orders.map((order, index)=>
                    <SingleOrder
                    key = {index}
                    order_number = {order.order_number}
                    created_at = {order.created_at.slice(0, 10)}
                    total_price = {order.total_price}
                    last_update = {order.updated_at.slice(0, 10)}
                    order_status = {order.status}
                    />
                )}
            </div>
    </div>
}

export default OrdersHistory;