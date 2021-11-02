import CouponData from "../../../models/couponData";
import "./oneCustomerCoupon.css";

interface SingleCoupon {
   coupon:CouponData;
}

function OneCustomerCoupon(props: SingleCoupon): JSX.Element {

    function dateConverter(myDate:string){
        var reDate = myDate.split('-');
        var newDate = reDate[2]+"/"+reDate[1]+"/"+reDate[0]
        return newDate;
    }

    return (
        <div className="oneCustomerCoupon CouponBox">
            <br/>
            <img src={props.coupon.image}/><br/>
           {props.coupon.title}<br/>
           ({props.coupon.category})<br/>
           {props.coupon.description}<br/>
           price: {props.coupon.price}₪<br/>
           start of discount: {dateConverter(props.coupon.startDate)}<br/>
           end of sale: {dateConverter(props.coupon.endDate)}<br/>
           <br/>
        </div>
    );
}

export default OneCustomerCoupon;
