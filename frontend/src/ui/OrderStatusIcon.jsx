

function OrderStatusIcon({status}){

    let formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    let color = "bg-amber-400"
    switch(formattedStatus){
        case "Pending":
            color = "bg-yellow-400";
        break;
        case "Compecting":
            color = "bg-purple-500"; 
        break;
        case "Sended":
            color = "bg-blue-400"; 
        break;
        case "Waiting for reciever":
            color = "bg-orange-400"; 
            formattedStatus="Awaiting rec." 
        break;
        case "Recieved":
            color = "bg-green-500"; 
        break;
        case "Canceled":
            color = "bg-red-500";
        break;
        default:
            color = "bg-gray-400"; 
        }


    return<>
        <div className={`flex justify-center items-center text-center ${color} rounded-4xl w-[110px] h-full`}>
            <p className="text-white font-semibold">{formattedStatus}</p>
        </div>
    </>
}

export default OrderStatusIcon;