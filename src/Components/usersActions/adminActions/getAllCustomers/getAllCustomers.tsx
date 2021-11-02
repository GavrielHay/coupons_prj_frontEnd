import { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../models/customerData";
import store from "../../../reduxComponents/store";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import OneCustomer from "../oneCustomer/oneCustomer";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "./getAllCustomers.css";
import { Button } from "@mui/material";

interface allCustomers {
    customersData:CustomerData[];
 }

function GetAllCustomers(props:allCustomers): JSX.Element {
    let history = useHistory();
    const getFromURL = globals.urls.admin+"get_customer/all";
    const searchURL = globals.urls.admin+"get_customer/";
    let idSearch:string = "";

    const [customersData,setData] = useState([new CustomerData()]);

    useEffect(()=>{jwtAxios.post(getFromURL).then((response)=>{
        setData(response.data);
        notify.success("found!");
        }
    )
    .catch(error=>{
        console.log(error)
        notify.error("Sorry, can't find customers.")});
        
},[]);

function addNewCustomer(){
    history.push("/AddCustomer");
}

function updateNumber(args:SyntheticEvent){
    idSearch = (args.target as HTMLInputElement).value.toString();
    console.log(idSearch);
}

function searchById(){
    let URL = "";
    idSearch == ""?URL=getFromURL:URL=searchURL+idSearch;
    jwtAxios.post(URL).then((response)=>{
        idSearch == ""?setData(response.data):setData([response.data]);
      notify.success("found!");
    }) .catch(error=>{
        console.log(error);
        notify.error("Sorry, can't find customer.");
    })
}

    return (
        <div className="getAllCustomers">
            <Button variant="contained" startIcon={<PersonAddIcon />}  color="secondary" onClick={addNewCustomer}>
            New customer
            </Button>
            <br/><br/>

              search customer: <input type="text" placeholder="ID number" onChange={updateNumber}/>
            <input type="button" value="Search" onClick={searchById}/><hr/>
            
			 {Array.from(customersData).map(item=><OneCustomer
                key ={item.id}
                customer = {item}
            />)}
        </div>
    );
}

export default GetAllCustomers;
