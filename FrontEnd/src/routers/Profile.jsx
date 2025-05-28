import { redirect } from "react-router-dom";
import { useNavigate,useRevalidator  } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    function logoutHandler(){
        localStorage.removeItem("access_token");
         revalidator.revalidate();
        return navigate('/');
    }

    return(
        <div>
            <button className="bg-red-500 text-black" onClick={logoutHandler}>
                Logout
            </button>
        </div>
    );
}

export default Profile;