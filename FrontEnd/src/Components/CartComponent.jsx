import { useRouteLoaderData } from "react-router-dom";

function CartComponent(){
    const token = useRouteLoaderData('root');

    return <>
        <div className=" w-full h-[600px] shadow-md">

        </div>
    </>
}

export default CartComponent;