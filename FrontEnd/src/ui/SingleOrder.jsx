import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';



function SingleOrder(props){
    const [isExpanded,  setIsExpanded] = useState(false);
    
    async function expandHandler() {
        isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    } 


    return <div className='flex flex-col mx-2 px-8 py-2 shadow-md border-1 border-gray-200 rounded-md'>
        <div className="flex justify-between " onClick={expandHandler}>
            <div className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`}>
                <div 
                    className={`flex justify-center items-center hover:bg-gray-100 w-[25px] h-[25px] border-1 
                        border-gray-500 rounded-4xl hover:border-cyan-400  text-gray-500 hover:text-cyan-400 
                        transition-color duration-200 '`}
                    onClick={expandHandler}
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

        <div
        className={`expandable-content ${isExpanded ? 'expanded' : ''}`}
        >
        <p className='orders-table'>sdgsdgkjmkplj</p>
        </div>
    </div>
}

export default SingleOrder;
