import { Link } from "react-router-dom";

function LogoLink(){
    return <>
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800" ><Link to="/">TechStore</Link></h1>
    </>
}

export default LogoLink;