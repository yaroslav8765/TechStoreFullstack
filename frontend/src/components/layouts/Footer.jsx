import React from "react";
import listOfLinks from "../../links";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const date = new Date();

    return (
        <footer className="w-full bg-gray-100 border-t mt-8">
            <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row justify-between text-sm text-gray-600">
                
                <div className="mb-4 md:mb-0">
                    <h3 className="text-black font-semibold mb-2">Information</h3>
                    <ul>
                        <li><a onClick={()=>{navigate("/about-us")}} className="hover:cursor-pointer hover:underline hover:text-gray-800">About Us</a></li>
                        <li><a onClick={()=>{navigate("/privacy-policy")}} className="hover:cursor-pointer hover:underline hover:text-gray-800">Privacy Policy</a></li>
                        <li><a onClick={()=>{navigate("/terms-and-conditions")}} className="hover:cursor-pointer hover:underline hover:text-gray-800">Terms & Conditions</a></li>
                        <li><a onClick={()=>{navigate("/return-policy-faqs")}} className="hover:cursor-pointer hover:underline hover:text-gray-800">Return Policy</a></li>
                    </ul>
                </div>

                <div className="mb-4 md:mb-0">
                    <h3 className="text-black font-semibold mb-2">Customer Service</h3>
                    <ul>
                        <li><a href={listOfLinks.contact_us} className="hover:cursor-pointer hover:underline hover:text-gray-800">Contact Us</a></li>
                        <li><a onClick={()=>{navigate("/return-policy-faqs")}} className="hover:cursor-pointer hover:underline hover:text-gray-800">FAQs</a></li>
                        <li><a href={listOfLinks.support_center} className="hover:cursor-pointer hover:underline hover:text-gray-800">Support Center</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-black font-semibold mb-2">Subscribe to our newsletter</h3>
                    <form className="flex">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="px-3 py-2 border rounded-l-md w-full max-w-[200px]
                            focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none"
                        />
                        <button 
                            type="submit" 
                            className=" text-white px-4 py-2 rounded-r-md gradient-btn-green"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 py-4 border-t">
                &copy; {date.getFullYear()} TechStore. All rights reserved.
            </div>
        </footer>
    );
}


export default Footer;
