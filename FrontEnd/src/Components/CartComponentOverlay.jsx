import { ClassNames } from "@emotion/react";
import Modal from "../ui/Modal";
import CartComponent from "./CartComponent";


function CartComponentOverlay(){
    return<>
        <Modal redirectLink=".." >
            <CartComponent/>
        </Modal>
    </>
}

export default CartComponentOverlay;