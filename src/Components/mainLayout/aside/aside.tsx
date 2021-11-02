import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../reduxComponents/store";
import "./aside.css";
import RootState  from  "../../reduxComponents/store";
import { useSelector } from "react-redux";
import { BottomNavigation, BottomNavigationAction, Box, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InboxIcon from '@mui/icons-material/Inbox';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';


function Aside(): JSX.Element {

    let history = useHistory();
    const [userType,setUserType] = useState("guest");
    const [nowLabel,setNowLabel] = useState(0);
    const [value, setValue] = useState('recents');

    
    //const isLoggedIn = useSelector(state:RootState =>store.getState().loginState.loggedInUser.clientType);

    
    store.subscribe(()=>{
        setUserType(store.getState().loginState.loggedInUser.clientType);
        //console.log("aside: getting info from store...");
    })
   
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      
      };

    function userMenu(){
        switch(userType){ 
                case("Administrator"):
                    return <>
                    <BottomNavigation sx={{ width: 350,  bgcolor:"#2C3C5B" ,  }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                          label="Manage companies"
                          value="companies"
                          onClick={()=>{history.push("/ShowAllCompanies");}}
                            icon={<StoreIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                        <BottomNavigationAction
                            label="Manage customers"
                            value="customers"
                            onClick={()=>{history.push("/ShowAllCustomers");}}
                            icon={<GroupIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                    </BottomNavigation>
                    </>;
                
                case("Company"):
                    return<>
                    <BottomNavigation sx={{ width: 350,  bgcolor:"#2C3C5B" ,  }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                          label="Manage coupons"
                          value="coupons"
                          onClick={()=>{history.push("/ShowCompanyCoupons");}}
                            icon={<InboxIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                        <BottomNavigationAction
                            label="My details"
                            value="details"
                            onClick={()=>{history.push("/ShowCompanyDetails");}}
                            icon={<AccountCircleIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                    </BottomNavigation>
                    
                    
                    </>;
                case("Customer"):
                    return<>
                    <BottomNavigation sx={{ width: 250,  bgcolor:"#2C3C5B" ,  }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="My coupons"
                            value="coupons"
                            onClick={()=>{history.push("/ShowCustomerCoupons");}}
                            icon={<ShoppingCartIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                           <BottomNavigationAction
                            label="My details"
                            value="details"
                            onClick={()=>{history.push("/ShowCustomerDetails");}}
                            icon={<AccountCircleIcon sx={{ color: "rgb(214, 230, 227)" }}/>}
                        />
                    </BottomNavigation>
                  
                   </>;
                default:
                    //setUserType("Guest");
                    return<>Welcome to our great site!<br/>please login for cool stuff</>;
                
        }

    }



    return (
        <div className="aside">
            <nav>
                <div className="menuIcons">
                    {userMenu()}

                    {/*}
                    Actions here<hr/><br/>
                    <NavLink exact to="/coupons_show">our coupons</NavLink><br/>
                    <NavLink exact to="/login">log in</NavLink><br/>
                    <NavLink exact to="/logout">log out</NavLink><br/> 
                    <br/>ADMIN actions<br/> 
                    <NavLink exact to="/ShowAllCompanies">manage companies</NavLink><br/>
                    <NavLink exact to="/ShowAllCustomers">manage customers</NavLink><br/>
                    <br/>COMPANY actions<br/>
                    <NavLink exact to="/ShowCompanyCoupons">manage coupons</NavLink><br/>
                    <NavLink exact to="/ShowCompanyDetails">my details</NavLink><br/>
                    <br/>CUSTOMER actions<br/>
                    <NavLink exact to="/ShowCustomerCoupons">my coupons</NavLink><br/>
                    <NavLink exact to="/ShowCustomerDetails">my details</NavLink><br/>
                    {*/}
                
                    {/*}
                    Real thing<br/><br/>
                    <NavLink exact to="/admin">admin menu</NavLink><br/>
                    <NavLink exact to="/company">company menu</NavLink><br/>
                    <NavLink exact to="/customer">customer menu</NavLink>
                    {*/}
                </div>
            </nav>
        </div>
    );
}

export default Aside;
