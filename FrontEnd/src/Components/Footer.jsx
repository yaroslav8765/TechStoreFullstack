import React from "react";

function Footer() {

    const date = new Date();

    return (
        <footer className="w-full bg-gray-100 border-t mt-8">
            <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row justify-between text-sm text-gray-600">
                
                <div className="mb-4 md:mb-0">
                    <h3 className="text-black font-semibold mb-2">Information</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">Return Policy</a></li>
                    </ul>
                </div>

                <div className="mb-4 md:mb-0">
                    <h3 className="text-black font-semibold mb-2">Customer Service</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Support Center</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-black font-semibold mb-2">Subscribe to our newsletter</h3>
                    <form className="flex">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="px-3 py-2 border rounded-l-md w-full max-w-[200px] outline-none"
                        />
                        <button 
                            type="submit" 
                            className=" text-white px-4 py-2 rounded-r-md bg-[linear-gradient(300deg,_#0f52ba,_#00c2c2,_#2fe0a2)] 
                            bg-[length:180%_180%] animate-gradient 
                            hover:bg-[linear-gradient(300deg,_#1a75ff,_#00d4b4,_#4fffcf)] 
                            transition-all duration-300"
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
