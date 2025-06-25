import LogoLink from "../ui/LogoLink";
import UsersCartItem from "../components/UsersCartItems";

function Checkout(){

    return <div className="flex flex-col max-w-[600px] w-full mx-auto mt-4 shadow-md border border-gray-100 rounded-xl p-4">
        <LogoLink />
        <UsersCartItem/>
    </div>
}

export default Checkout;