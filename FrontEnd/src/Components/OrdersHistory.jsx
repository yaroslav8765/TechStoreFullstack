import SingleOrder from "../ui/SingleOrder";
import { useState } from "react";

function OrdersHistory(){
    const [isLoading, setIsLoading] = useState(false);
    
    return <div className={`flex flex-col w-full items-center shadow-md rounded-xl ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>

            <div className="flex flex-col w-full">
                <div className="flex mx-2 justify-between px-8 py-2">
                    <div className='flex justify-center items-center  w-[25px] h-[25px] border-1 '> </div>
                    <h2 className="orders-table">Order number</h2>
                    <h2 className="orders-table">Created at</h2>
                    <h2 className="orders-table">Total price</h2>
                    <h2 className="orders-table">Last update</h2>
                    <h2 className="orders-table">Order status</h2>
                </div>
                
                <SingleOrder
                order_number = "1"
                created_at = "22.12.1968"
                total_price = "124144"
                last_update = "21.4.1245"
                order_status = "pending"
                />
            </div>
    </div>
}

export default OrdersHistory;