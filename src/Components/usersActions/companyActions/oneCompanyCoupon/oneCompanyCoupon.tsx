import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CouponData from "../../../models/couponData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./oneCompanyCoupon.css";

interface SingleCoupon {
    coupon:CouponData;
}

function OneCompanyCoupon(props: SingleCoupon): JSX.Element {

    
    let history = useHistory();
    function updateCoupon(){
        history.push("/UpdateCoupon/"+props.coupon.id);
    }

    useEffect(()=>{
        
    })

    const deleteURL = globals.urls.company+"delete_coupon/"+props.coupon.id;
    function deleteCoupon(){
        jwtAxios.delete(deleteURL).then((response)=>{
            console.log(response.data)
            history.push("/DeletionComplete");
        })
        .catch(error=>{notify.error("Sorry, can't delete coupon.")
        }) 
    }

    function dateConverter(myDate:string){
        var reDate = myDate.split('-');
        var newDate = reDate[2]+"/"+reDate[1]+"/"+reDate[0]
        return newDate;
    }


    return (
        <div className="oneCompanyCoupon CouponBox">
            <br/>
            <img src={props.coupon.image}/><br/>
            {props.coupon.title}<br/>
            ({props.coupon.category})<br/>
            {props.coupon.description}<br/>
            price: {props.coupon.price}₪<br/>
            qty: {props.coupon.amount}<br/>
            start of discount: { dateConverter(props.coupon.startDate)} <br/>
            end of sale: { dateConverter(props.coupon.endDate)} <br/>
            <br/>
            <div>
            <Tooltip title="To update">
                <IconButton aria-label="update" onClick={updateCoupon}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteCoupon}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            </div>
            <br/>
        </div>
    );
}

export default OneCompanyCoupon;
