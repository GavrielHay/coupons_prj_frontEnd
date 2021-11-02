import { useHistory } from "react-router-dom";
import store from "../../reduxComponents/store";
import notify from "../../utils/Notify";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./oneCoupon.css";
import { Box, IconButton } from "@mui/material";

interface SingleCoupon {
    id:number;
    title:string;
    endDate:string;
    image:string;
    amount:number;
    price:number;
}

function OneCoupon(props: SingleCoupon): JSX.Element {

    let history = useHistory();

    function showCoupon(){
        history.push("/full_single_coupon/"+props.id);
    }



    function dateConverter(myDate:string){
        var reDate = myDate.split('-');
        var newDate = reDate[2]+"/"+reDate[1]+"/"+reDate[0]
        return newDate;
    }
    return (
        <div className="oneCoupon">
             <Box className="CouponBox" 
                onClick= {showCoupon}
                sx={{
                    width: 260,
                    height: 380,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: 'rgb(165, 59, 236)',
                        opacity: [0.9, 0.8, 0.8],
                        },
                }}
                >
            <br/>
           <img src={props.image}/><br/>
           <b>{props.title}</b><br/>
           qty: {props.amount}<br/>
           end of sale: {dateConverter(props.endDate)}<br/>
           {props.price}₪ only!<br/>
           <br/>
           <IconButton aria-label="more"  onClick={showCoupon}>
                 <MoreVertIcon />
            </IconButton>
           <br/>
           </Box>
        </div>
    );
}

export default OneCoupon;
