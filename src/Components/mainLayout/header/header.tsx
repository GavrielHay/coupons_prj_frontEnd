import { Button } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../reduxComponents/store";
import "./header.css";

function Header(): JSX.Element {
    let history = useHistory();
      
    const [userType,setUserType] = useState("guest");


    store.subscribe(()=>{
        setUserType(store.getState().loginState.loggedInUser.clientType);
        //console.log("header: getting info from store...");
    })

    function loginKnob(){
        switch(userType){
            case("Administrator"):
            case("Company"):
            case("Customer"):
                return <>
                 <Button variant="outlined" sx={{ borderColor: "rgb(214, 230, 227)" ,color: "rgb(214, 230, 227)" ,textTransform: 'none'} } endIcon={<LogoutRoundedIcon  />} onClick={()=>{history.push("/logout");}}>
                 Logout            
                </Button>
                </>;
            default:
                //setUserType("Guest");
                return<>
                <Button variant="outlined" sx={{ borderColor: "rgb(214, 230, 227)" ,color: "rgb(214, 230, 227)", textTransform: 'none' } } endIcon={<LoginIcon />} onClick={()=>{history.push("/login");}}>
                Login            
                </Button>
                </>;
        }
    }

    function goHome() {
        history.push("/");
    }

function scrollTo(id:string){
    if(document.getElementById(id)!== null)
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

    return (
        <div className="header">   
            <img className="logo" src="https://backendlessappcontent.com/714949D1-C002-AF07-FF15-EF82D744B200/ABC8004A-3104-4D43-8B11-A8C3A9493F71/files/site_imgs/logo.png" onClick={goHome} />  
            <div className="headerMenu">  
                 <Button variant="text" sx={{ color: "rgb(214, 230, 227)", textTransform: 'none' }} onClick={()=>{history.push("/")}}>Home</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="text" sx={{ color: "rgb(214, 230, 227)", textTransform: 'none' }} onClick={()=>{scrollTo("Shop")}}>Shop</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <Button variant="text" sx={{ color: "rgb(214, 230, 227)", textTransform: 'none' }} onClick={()=>{scrollTo("About")}}>About</Button>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <Button variant="text" sx={{ color: "rgb(214, 230, 227)", textTransform: 'none' }} onClick={()=>{scrollTo("Contact")}}>Contact</Button>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             Welcome {userType==""?"Guest":userType}! &nbsp;&nbsp;&nbsp;&nbsp;
                {loginKnob()}
            </div>
            
           
        </div>
        
    );
}

export default Header;
