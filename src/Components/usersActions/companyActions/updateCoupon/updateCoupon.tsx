import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Alert, Box, Button, ButtonGroup, InputAdornment, InputLabel, NativeSelect, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponData from "../../../models/couponData";
import store from '../../../reduxComponents/store';
import globals from "../../../utils/Globals";
import jwtAxios from '../../../utils/JWTAxios';
import notify from '../../../utils/Notify';
import "./updateCoupon.css";
import axios from 'axios';

interface UpdateCouponProps {
	id:string
}

interface myFileName{
    fileURL:string
  }

function UpdateCoupon(props:UpdateCouponProps): JSX.Element {
    let history = useHistory();
    const updateURL = globals.urls.company+"update_coupon";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<CouponData>();
     //for dates:
     const [startDate, setStartDate] = useState<Date | null>(new Date());
     const [endDate, setEndDate] = useState<Date | null>(new Date());
     //for image:
     const [updatedImage, setUpdatedImage] = useState<File>(null);
     const [myFileUrl, setMyFileUrl] = useState("null");

    //get updated information of coupon to show to user before update:
    // (can do this efficiently without accessing the server using redux)
    const getFromURL = globals.urls.guest+"one_coupon/"+props.id;
    const [oldCoupon,setOldCoupon] = useState(new CouponData());    
    useEffect(()=>{ 
        axios.get(getFromURL).
            then((response)=>{
                console.log("the response data: ");
                console.log(response.data);
                setOldCoupon(response.data);
            }).catch(error=>{
                notify.error("Sorry, can't finde coupon.");
                console.log(error);
                history.push("/ShowCompanyCoupons");
            }) 
    },[]);
    
    //check the coupon for update if belongs to correct company:
    useEffect(()=>{
        console.log("the old coupon:" );
        console.log(oldCoupon );
        if(oldCoupon.companyID!==0){
            if(oldCoupon.companyID==store.getState().loginState.loggedInUser.userID) {
                notify.success("ready for update");
                setMyFileUrl(oldCoupon.image);
            } else {
                setOldCoupon(new CouponData());
                notify.error("Can't edit coupon of other company.") ;
                history.push("/ShowCompanyCoupons");
            }
        }
    },[oldCoupon])

    
    
    function send(couponData:CouponData) {
        
        if(startDate>endDate||endDate<new Date()){
            notify.error("Start-date must be before End-date, and End-date has not expired")
            console.log("error: start-date must be before end-date, and end-date has not expired")
            return; 
        } else {
            couponData.id=oldCoupon.id;
            couponData.companyID=store.getState().loginState.loggedInUser.userID;
            couponData.startDate=dateConverter(startDate);
            couponData.endDate=dateConverter(endDate);
            console.log ("see the beuatiy: end date:"+couponData.endDate+" start date:"+couponData.startDate);
            couponData.image=myFileUrl;
        
            console.log(couponData);

            jwtAxios.post<string>(updateURL,couponData)
            .then((request)=>{
                notify.success("coupon succesfully updated!")
                history.push("/ShowCompanyCoupons");
            })
            .catch(error=>{
                notify.error("Sorry, can't update company.")
                console.log(error)
            }) 
        }
    }


        
   //handle dates:

    function dateConverter(myDate:Date){
        var reDate = myDate.toLocaleDateString().split('.');
        reDate.forEach((item,index)=>{reDate[index]=item.padStart(2, '0')});
        var newDate = reDate[2]+"-"+reDate[1]+"-"+reDate[0];
        return newDate;
    }

    
   //handle image upload:
   
   function updateImage(event:any){
    console.log(event.target.files[0]);
    setUpdatedImage(event.target.files[0]);
    console.log("the file in the system now:")
    console.log(updatedImage);
}

const [isWait , setIsWait] = useState<boolean>(false);
const uploadImage = ()=>{
    setIsWait(true);
     console.log("uplodaing started");
     console.log("---------------------------------");
     console.log("uploading file:");
     console.log(updatedImage);
     console.log("setting new random name code before upload...");
     const { v4: uuidv4 } = require('uuid');
     var readyFile = new File([updatedImage],uuidv4()); 
     console.log("ready to upload the file:");
     console.log(readyFile);

     Backendless.initApp("714949D1-C002-AF07-FF15-EF82D744B200","A2C52F10-78F9-4023-AD32-DD2998ED2955");
     Backendless.Files.upload(readyFile, "coupons_imgs" ,true)
     .then(  response =>{
     console.log( "File successfully uploaded. Path to download: " );
     //convert the object to normal literal object with our interface
     setMyFileUrl((response as myFileName).fileURL);
     //show the file url or store it in mysql
     console.log(myFileUrl);
     setIsWait(false);
    })
     .catch(  error =>{
     console.log( "error - " + error );
     setIsWait(false);
    })
     
 }

 function uplaodIsWaitButton(isWait:boolean){
    return isWait?
     <LoadingButton loading variant="contained" >Submit</LoadingButton>:
     <Button variant="contained" startIcon={<UploadFileIcon />} onClick={uploadImage} color="secondary">Upload</Button>;
 }

    return (
        <div className="updateCoupon LoginBox">
			    <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h2>update coupon </h2>
                <br/>
                
                Category: {oldCoupon.category}<br/>
                <InputLabel htmlFor="select">New Category</InputLabel>
                <NativeSelect id="select" {...register("category")} >
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Fashion">Fashion</option>

                </NativeSelect>
                <span>{errors.category && <p>{errors.category.message}</p>}</span>
                <br/><br/> 
                Title: {oldCoupon.title}<br/>
                <TextField label="New Title" variant="outlined" size="small"
                    {...register("title",{
                         required :{value:true, message:"please enter title"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.title && <Alert severity="error">{errors.title.message}</Alert>}
                <br/><br/>
                Description: {oldCoupon.description}<br/>
                <TextField label="New Description" variant="outlined" multiline
                    {...register("description",{
                        maxLength :{value:100 ,message:"Up to 100 characters can be entered"},
                         
                         }) }/>
               <span>{errors.description && <p>{errors.description.message}</p>}</span>
                <br/><br/>
                Qty: {oldCoupon.amount}<br/>
                <TextField label="New Qty" variant="outlined"   type="number" size="small"
                    {...register("amount",{
                         required :{value:true, message:"please enter quantity"},
                         min:{value:0, message:"Positive numbers only"},
                         
                         }) }/>
               <span>{errors.amount && <p>{errors.amount.message}</p>}</span>
                <br/><br/>

                Price:  {oldCoupon.price}<br/>
                <TextField label="New Price" variant="outlined"  type="number" size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                  }}
                    {...register("price",{
                         required :{value:true, message:"please enter price"},
                         min:{value:0, message:"Positive numbers only"},
                         }) }
                />
               <span>{errors.price && <p>{errors.price.message}</p>}</span>
                <br/><br/>

                Start date: {oldCoupon.startDate}<br/>
                <LocalizationProvider dateAdapter={AdapterDateFns} id="startDate" size="small" >
                    <DatePicker
                        label="New Start date"
                        value={startDate}
                        onChange={(newValue) => {
                        setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      
                    />
                </LocalizationProvider> 
                <span>{errors.startDate && <p>{errors.startDate.message}</p>}</span>
                <br/><br/> 

                End date: {oldCoupon.endDate}<br/>
                <LocalizationProvider dateAdapter={AdapterDateFns} id="endDate" size="small"  >
                    <DatePicker
                        label="New Expiration date"
                        value={endDate}
                        onChange={(newValue) => {
                        setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        
                    />
                </LocalizationProvider> 
                <span>{errors.endDate && <p>{errors.endDate.message}</p>}</span>
                <br/><br/> 

               
                <Box
                    sx={{
                        width: 300,
                        height:450,
                        border: 1,
                        borderRadius: 1,
                        borderColor: '#151F35',
                    }}
                >
                    SET NEW IMAGE
                <br/><br/>
                A. pickup an image from PC:
                <br/>
                <input type="file" id="image" name="New Image" onChange={updateImage}/>
                <br/><br/>
                B. Upload the image:
                <br/>
                {uplaodIsWaitButton(isWait)}
                <br/><br/>
                The corrent Image for the coupon:
                <img id="imgExample" src={myFileUrl}/>
                <br/>
                </Box>
                <br/><br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="secondary">UPDATE</Button>
                </ButtonGroup>
                <br/><br/>
            </form>
        </div>
    );
}

export default UpdateCoupon;
