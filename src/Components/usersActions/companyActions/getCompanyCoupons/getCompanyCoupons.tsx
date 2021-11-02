import { Button, FormControl, FormHelperText, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CouponData from "../../../models/couponData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import OneCompanyCoupon from "../oneCompanyCoupon/oneCompanyCoupon";
import AddIcon from '@mui/icons-material/Add';
import "./getCompanyCoupons.css";


interface allCoupons {
    couponsData:CouponData[];
}

function GetCompanyCoupons(props:allCoupons): JSX.Element {
    let history = useHistory();
    let category:string = "";
    let maxPrice:string = "";
    const getFromURL = globals.urls.company+"get_coupons/all";
    const searchCategoryURL = globals.urls.company+"get_coupons/by_category/";
    const searchMaxPriceURL = globals.urls.company+"get_coupons/upto_price/";

    const [couponsData,setData] = useState([new CouponData()]);


    useEffect(()=>{jwtAxios.post(getFromURL).then(response=>{
            //console.log(response.data);
            setData(response.data);
            notify.success("found!");
            }
        ) 
        .catch(error=>{
            console.log(error)
            notify.error("Sorry, can't finde coupons.")
            });
    },[]);

    function addNewCoupon(){
        history.push("/AddCoupon");
    }
 
    function searchCategory(args:SelectChangeEvent<string>){
        category = args.target.value;
        let URL = "";
        category === "All"?URL=getFromURL:URL=searchCategoryURL+category;
        jwtAxios.post(URL).then((response)=>{
            setData(response.data);
            notify.success("found!");
          }).catch(error=>{
              console.log(error);
             notify.error("Sorry, can't find coupon.");
          })
    }

    function handleChangeMaxPrice(args:SyntheticEvent){
        maxPrice = (args.target as HTMLInputElement).value.toString();
        console.log(maxPrice);
    }

    function searchMaxPrice(){
        let URL = "";
        maxPrice == ""?URL=getFromURL:URL=searchMaxPriceURL+maxPrice;
        jwtAxios.post(URL).then((response)=>{
            setData(response.data);
            notify.success("found!");
          }).catch(error=>{
              console.log(error);
             notify.error("Sorry, can't find coupon.");
          })
    }

    
    return (
        <div className="getCompanyCoupons">
            <Button variant="contained" startIcon={<AddIcon />}  color="secondary"
                 onClick={addNewCoupon}>
                 New coupon
            </Button>
           <br/><br/>

            <FormControl sx={{ m: 1, minWidth: 120, margin:0 }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category}
                label="Category"
                size="small"
                onChange={searchCategory}
                >
                <MenuItem value="All">
                    <em>All</em>
                </MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Electricity"}>Electricity</MenuItem>
                <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"Vacation"}>Vacation</MenuItem>
                <MenuItem value={"Fashion"}>Fashion</MenuItem>
                </Select>
                <FormHelperText>show category</FormHelperText>
            </FormControl>

            &nbsp; &nbsp; &nbsp;

            <TextField
                id="outlined-helperText"
                label="₪"
                type="number"
                defaultValue="Default Value"
                helperText="show up-to price"
                size="small"
                onChange={handleChangeMaxPrice}
            />
            <input type="button" value="Search" onClick={searchMaxPrice}/>
            <hr/>

			{Array.from(couponsData).map(item=><OneCompanyCoupon key ={item.id} coupon = {item}/>)}
        </div>
    );
}

export default GetCompanyCoupons;
