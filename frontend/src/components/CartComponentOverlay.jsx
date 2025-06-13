import { ClassNames } from "@emotion/react";
import Modal from "../ui/Modal";
import CartComponent from "./CartComponent";


function CartComponentOverlay({clickHandler, isAllowedNavigate,navigateTo}){
    return<div >
        <Modal redirectLink={navigateTo} isAllowedNavigate={isAllowedNavigate} clickCloseHandler={clickHandler} >
            <CartComponent/>
        </Modal>
    </div>
}

export default CartComponentOverlay;