import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CouponData from "../../models/couponData";
import store from "../../reduxComponents/store";
import globals from "../../utils/Globals";
import jwtAxios from "../../utils/JWTAxios";
import notify from "../../utils/Notify";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./fullOneCoupon.css";

interface FullOneCouponProps {
	id:string
}


function FullOneCoupon(props: FullOneCouponProps): JSX.Element {

    const serverURL = globals.urls.guest+"one_coupon/"+props.id;
    const [couponData,setData] = useState(new CouponData());
    let history = useHistory();

    useEffect(()=>{axios.get(serverURL).then((response)=>{
        console.log(response);
        setData(response.data)
            }
        ).catch(error=>{
            notify.error("Sorry, can't find coupon.")
         })}
    ,[]);

    function dateConverter(myDate:string){
        var reDate = myDate.split('-');
        var newDate = reDate[2]+"/"+reDate[1]+"/"+reDate[0]
        return newDate;
    }

    
    function purchase(){
        if(store.getState().loginState.loggedInUser.clientType==="Customer"){
            history.push("/BuyCoupon/"+props.id);
        } else{
            history.push("/login");
            notify.error("Only our customers can purchase coupons.  If you are a customer, please login.")
        }
    }

    return (
        <div className="fullOneCoupon CouponBox" id="fullCoupon" >
            <br/>
            <img src={couponData.image}/><br/>
           {couponData.title}<br/>
           ({couponData.category})<br/>
           {couponData.description}<br/>
           price: {couponData.price}<br/>
           qty: {couponData.amount}<br/>
           start of discount: {dateConverter(couponData.startDate)}<br/>
           end of sale: {dateConverter(couponData.endDate)}<br/>
           <br/>
           <Button variant="contained" startIcon={<AddShoppingCartIcon />} color="secondary" onClick={purchase}>
           BUY NOW!            
           </Button>
          <br/><br/>
        </div>
    );
}

export default FullOneCoupon;
