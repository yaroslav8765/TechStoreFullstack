import LogoLink from "../ui/LogoLink";
import UsersCartItem from "../components/UsersCartItems";
import AuthInput from "../ui/AuthInput";
import NovaPostInput from "../ui/NovaPostInputCity";
import NovaPostSearch from "../components/NovaPostSearch";

function Checkout(){
    function handleInputChange(){

    }
    return <div className="flex flex-col max-w-[1200px] w-full mx-auto mt-4 shadow-md border border-gray-100 rounded-xl p-4">
        <LogoLink />
        <div className="flex justify-evenly">
            <div className="flex flex-col items-center w-full max-w-[500px]">
                <div className="max-w-[300px]">
                <AuthInput
                    label="Your name*"
                    placeholder="Enter your name"
                    value="dsfs"
                    onChange={handleInputChange}
                    name="username"
                    errorMessage={""}
                />
                <AuthInput
                    label="Your surname*"
                    placeholder="Enter surname"
                    value="dsfs"
                    onChange={handleInputChange}
                    name="surname"
                    errorMessage={""}
                />
                <AuthInput
                    label="Phone number*"
                    placeholder="Enter your phone number"
                    value="dsfs"
                    onChange={handleInputChange}
                    name="phone_number"
                    errorMessage={""}
                />    

                <NovaPostSearch/>  
                          
                </div>
                
            </div>
            <div className="max-w-[500px]">
            <UsersCartItem/>
            </div>
        </div>
    </div>
}

export default Checkout;