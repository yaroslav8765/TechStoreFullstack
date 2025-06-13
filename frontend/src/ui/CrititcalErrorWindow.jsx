import Modal from "./Modal"
import { Link } from "react-router-dom";
function CrititcalErrorWindow({message}){
    return <>
        <Modal redirectLink="/">
            <div className="flex flex-col items-center justify-between py-4 bg-gray-300 w-[600px] h-[200px]">
                <h2 className="text-bold text-3xl">Error</h2>
                <p className="text-xl">{message}</p>
                <Link to="/" className="gradient-btn-red w-[120px] h-[40px] text-center flex items-center justify-center">Go to main</Link>
            </div>
        </Modal>
    </>
}

export default CrititcalErrorWindow;