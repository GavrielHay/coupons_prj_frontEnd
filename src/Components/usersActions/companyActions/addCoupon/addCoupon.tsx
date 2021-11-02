import { Alert, Button, ButtonGroup, InputAdornment, InputLabel, NativeSelect, TextField, Box, makeStyles, createStyles, Theme} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LoadingButton from '@mui/lab/LoadingButton';
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponData from "../../../models/couponData";
import "./addCoupon.css";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import globals from '../../../utils/Globals';
import notify from '../../../utils/Notify';
import jwtAxios from '../../../utils/JWTAxios';
import store from '../../../reduxComponents/store';
import Backendless from 'backendless';


  

interface myFileName{
    fileURL:string
  }




function AddCoupon(): JSX.Element {
    const defaultImgURL = "https://backendlessappcontent.com/714949D1-C002-AF07-FF15-EF82D744B200/ABC8004A-3104-4D43-8B11-A8C3A9493F71/files/site_imgs/defaultImg.png";
    let history = useHistory();
    const addURL = globals.urls.company+"add_coupon";
    //for dates:
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    //for image:
    const [updatedImage, setUpdatedImage] = useState<File>(null);
    const [myFileUrl, setMyFileUrl] = useState(defaultImgURL);


    const {register, handleSubmit, setError, formState:{errors}} = useForm<CouponData>();


    function send(couponData:CouponData) {
        if(startDate>endDate||endDate<new Date()){
            notify.error("Start-date must be before End-date, and End-date has not expired")
            console.log("error: start-date must be before end-date, and end-date has not expired")
            return; 
        } else {
            couponData.companyID=store.getState().loginState.loggedInUser.userID;
            couponData.startDate=dateConverter(startDate);
            couponData.endDate=dateConverter(endDate);
            console.log ("see the beuatiy: end date:"+couponData.endDate+" start date:"+couponData.startDate);
            couponData.image=myFileUrl;
        
            console.log(couponData);
            jwtAxios.post<string>(addURL,couponData)
            .then(()=>{
                notify.success("company succesfully added!")
                history.push("/ShowCompanyCoupons");
            }).catch(error=>{
                notify.error("Sorry, can't add coupon.")
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
        <div className="addCoupon LoginBox">
            <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h2>add coupon to stock</h2>
                <br/>

                <InputLabel htmlFor="select">Category</InputLabel>
                <NativeSelect id="select" {...register("category")} >
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Fashion">Fashion</option>

                </NativeSelect>
                <span>{errors.category && <p>{errors.category.message}</p>}</span>
                <br/><br/> 

                <TextField label="Title" variant="outlined" size="small"

                    {...register("title",{
                         required :{value:true, message:"please enter title"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.title && <Alert severity="error">{errors.title.message}</Alert>}
                <br/><br/>

                <TextField label="Description" variant="outlined"   multiline
                    {...register("description",{
                        maxLength :{value:100 ,message:"Up to 100 characters can be entered"},
                         
                         }) }/>
               <span>{errors.description && <p>{errors.description.message}</p>}</span>
                <br/><br/>

                <TextField label="Qty" variant="outlined" type="number"  size="small"
                    {...register("amount",{
                         required :{value:true, message:"please enter quantity"},
                         min:{value:0, message:"Positive numbers only"},
                         
                         }) }/>
               <span>{errors.amount && <p>{errors.amount.message}</p>}</span>
                <br/><br/>


                <TextField label="Price" variant="outlined"  type="number"  size="small"
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


                <LocalizationProvider dateAdapter={AdapterDateFns} id="startDate" size="small" >
                    <DatePicker
                        label="start date"
                        value={startDate}
                        onChange={(newValue) => {
                        setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      
                    />
                </LocalizationProvider> 
                <span>{errors.startDate && <p>{errors.startDate.message}</p>}</span>
                <br/><br/> 


                <LocalizationProvider dateAdapter={AdapterDateFns} id="endDate" size="small"  >
                    <DatePicker
                        label="expiration date"
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
                    <Button type="submit" color="secondary">ADD NOW!</Button>
                </ButtonGroup>
                <br/><br/>
            </form>
        </div>
    );
}

export default AddCoupon;
