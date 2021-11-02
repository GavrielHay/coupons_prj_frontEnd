import { Button} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useHistory } from "react-router-dom";
import store from "../../../reduxComponents/store";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./buyCoupon.css";

interface BuyCouponProps {
	id:string
}

function BuyCoupon(props: BuyCouponProps): JSX.Element {
    let history = useHistory();
    const buyURL = globals.urls.customer+"buy_coupon/"+props.id

    function confirmPayment(){
        if(store.getState().loginState.loggedInUser.clientType==="Customer"){
            jwtAxios.post(buyURL).then(()=>{
                notify.success("Congratulations! You bought a new coupon");
                history.push("/ShowCustomerCoupons");
            }).catch((error)=>{
            //notify.error("Sorry, this purchase could not be made.")
            notify.error(""+error);
            console.log(error);
            history.push("/coupons_show");

        }
            )
        } else{
            history.push("/login");
            notify.error("Only our customers can purchase coupons.  If you are a customer, please login.")
        }
    }

    return (
        <div className="buyCoupon LoginBox">
            <h3>payment example</h3><hr/>
            <br/>
            enter details: [...]<br/><br/>
			enter credit card: [1234-5678-0000-0000]<br/><br/>
            <Button variant="contained" startIcon={<PaymentIcon />} color="secondary" onClick={confirmPayment}>
            Confirm payment
            </Button>
            <br/>
            <br/>
        </div>
    );
}

export default BuyCoupon;
