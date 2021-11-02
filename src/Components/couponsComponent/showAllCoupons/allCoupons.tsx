import axios from "axios";
import { useEffect, useState } from "react";
import CouponData from "../../models/couponData";
import { couponDownloadedAction } from "../../reduxComponents/couponState";
import store from "../../reduxComponents/store";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import OneCoupon from "../oneCoupon/oneCoupon";
import "./allCoupons.css";


interface allCoupons {
   couponsData:CouponData[];
}

function AllCoupons(props:allCoupons): JSX.Element {

    const myURL = globals.urls.guest+"all_coupons";
    
    const [couponsData,setData] = useState([new CouponData()]);

    useEffect(()=>{
        
        axios.get(myURL).then((response)=>{
           setData(response.data);
          // console.log("get coupons from server:  "+response.data);
          // store.dispatch(couponDownloadedAction(response.data));
          // console.log("coupons saved in store:  "+JSON.stringify(store.getState().couponState.coupons));
        }).catch(error=>{
            notify.error("Sorry, can't get coupons.");
            console.log(error);
        })
        
    //to get the coupons from appState without request from server(no axios): 
        {/*}
        store.subscribe(()=>{
            //store.dispatch(couponDownloadedAction(couponsData));
            const setData=store.getState().couponState.coupons;
            console.log("get coupons from store:  "+setData);
        })
        {*/}
        
    },[]);

    

    return (
        <div className="allCoupons mainTitle" id="Shop">
            <h2>Shop</h2>
        
            {Array.from(couponsData).map(item=><OneCoupon
                key ={item.id}
                id={item.id}
                amount={item.amount}
                title={item.title}
                price={item.price}
                endDate={item.endDate}
                image={item.image}
            />)}
            <div className="about" id="About">
                <h3>About</h3>
                This site is my first FullStack project, by which I was certified in a programming course.
                The site is based on TypeScrip and was built using the React library.
                The software running on the BeckEnd server was built in JAVA using Spring framework.
                I would like to thank Zeev Mindaly, my teacher in the course, and to the other course members for their part on the way to success.
            </div>
        </div>
    );
}

export default AllCoupons;