import { useEffect, useState } from "react";
import CustomerData from "../../../models/customerData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";


import "./getCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {

    const getFromURL = globals.urls.customer+"details";
    const [customerData,setData] = useState(new CustomerData());

    useEffect(()=>{jwtAxios.post(getFromURL).then((response)=>{
            console.log(response);
            setData(response.data)
        }).catch(error=>{
                console.log(error)})}
    ,[]);


    return (
        <div className="getCustomerDetails">
			<h3>My details</h3>
            <br/>
            <div className="LoginBox">   
            <br/>
            id: {customerData.id}<br/>
            first name: {customerData.firstName}<br/>
            last name: {customerData.lastName}<br/>
            email: {customerData.email}<br/>
            <br/>
            </div>
        </div>
    );
}

export default GetCustomerDetails;
