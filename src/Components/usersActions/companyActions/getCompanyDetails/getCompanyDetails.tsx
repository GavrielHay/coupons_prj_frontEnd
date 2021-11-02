import { useEffect, useState } from "react";
import CompanyData from "../../../models/companyData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import "./getCompanyDetails.css";



function GetCompanyDetails(): JSX.Element {

    const getFromURL = globals.urls.company+"details";
    const [companyData,setData] = useState(new CompanyData());

    useEffect(()=>{
        
        jwtAxios.post(getFromURL).then(response=>{
            //console.log(response);
            setData(response.data)
            }).catch(error=>{console.log(error)
            })}
    ,[]);



    return (

        <div className="getCompanyDetails">
            <h3>my details</h3>
            <br/>
            <div className="LoginBox">          
            <br/>
            id: {companyData.id}<br/>
            name: {companyData.name}<br/>
            email: {companyData.email}<br/>
            <br/>
            </div> 
        </div>
    );
}

export default GetCompanyDetails;
