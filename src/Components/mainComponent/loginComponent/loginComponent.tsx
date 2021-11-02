import { Alert, Button, ButtonGroup, Checkbox, InputLabel, NativeSelect, TextField, Typography } from '@mui/material';
import { AccountBox } from "@material-ui/icons";
import "./loginComponent.css";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useForm } from "react-hook-form";
import UserDetails from "../../models/userDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import globals from '../../utils/Globals';
import store from '../../reduxComponents/store';
import { updateTokenAction } from '../../reduxComponents/loginState';
import Notify from '../../utils/Notify';
import { stringify } from 'querystring';
import jwtAxios from '../../utils/JWTAxios';
import notify from '../../utils/Notify';


function LoginComponent(): JSX.Element {

    const myURL = globals.urls.guest+"login";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<UserDetails>();
    //const [jwtToken,setToken] = useState("");
    const history = useHistory();

    useEffect(()=>{
       document.getElementById("Login").scrollIntoView({behavior: 'smooth'});
    },[])

    function send(userDetails:UserDetails) {
       userDetails.userID=0;//put any number as userID. the server will enter the correct id number after login.
        jwtAxios.post<string>(myURL,userDetails)
        .then((response)=>{
            notify.success("Login Success!");
           store.dispatch(updateTokenAction(response.headers.authorization));
           {/*}
            switch(userDetails.clientType){
            case("Administrator"):history.push("/admin");
            break;
            case("Company"):history.push("/company");
            break;
            case("Customer"):history.push("/customer");
            break;
           }
        {*/}
        history.push("/");
        })
        .catch(error=>{
          notify.error(""+error);
        })
        ;
    }

    
    return (
        <div className="loginComponent LoginBox" id="Login">
            
			<form onSubmit={handleSubmit(send)}>
                <br/><br/>
                <Typography variant="h4" className="HeadLine">Login</Typography><br/>
                <br/>
                <AccountBox style={{fontSize:40, margin :10}}/>
                <TextField label="User Email" variant="outlined"
                    {...register("email",{
                         required :{value:true, message:"*email required"},
                         minLength :{value:3, message:"please enter at least 3 characters"},
                         pattern: {value:/@[A-Za-z]/ ,message:"email address is not vaild" }
                         }) }/>
                {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                <br/><br/>

                <VpnKeyIcon style={{fontSize:40, margin :10}}/>
                <TextField label="Password" variant="outlined" type="password" 
                    {...register("password",{
                         required :{value:true, message:"*password required"}

                         })}/>
                {errors.password &&  <Alert severity="error">{errors.password.message}</Alert>}
                <br/><br/>
      
                <InputLabel htmlFor="select">client Type</InputLabel>
                <NativeSelect id="select" {...register("clientType")} >
                    <option value="Administrator">Administrator</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </NativeSelect>
                {errors.clientType &&<Alert severity="error">{errors.clientType.message}</Alert>}
                <br/><br/> 

                <Button className="myButton" type="submit" sx={{backgroundColor: "#151F35", color:"rgb(202, 218, 215)"}} fullWidth >Login</Button>
                <br/><br/>
                *In this site, only Admin can create new users
                <br/><br/>
            </form>
        </div>
    );
}

export default LoginComponent;
