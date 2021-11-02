import { SyntheticEvent, useEffect, useState } from "react";
import OneCompany from "../oneCompany/oneCompany";
import CompanyData from "../../../models/companyData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import { useHistory } from "react-router-dom";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import "./getAllCompanies.css";
import { Button } from "@mui/material";

interface allCompanies {
    companiesData:CompanyData[];
}

function GetAllCompanies(props:allCompanies): JSX.Element {
    let history = useHistory();
    const getFromURL = globals.urls.admin+"get_company/all";
    const searchURL = globals.urls.admin+"get_company/";
    let idSearch:string = "";

    const [companiesData,setData] = useState([new CompanyData()]);

    useEffect(()=>{ 
        jwtAxios.post(getFromURL).then(response=>{
            setData(response.data);
            notify.success("found!");
            }
        ).catch(error=>{
            console.log(error);
            notify.error("Sorry, can't find companies.");
        })
    },[]);

    function updateNumber(args:SyntheticEvent){
        idSearch = (args.target as HTMLInputElement).value.toString();
        console.log(idSearch);
    }

    function addNewCompany(){
        history.push("/AddCompany");
    }
    
    function searchById(){
        let URL = "";
        idSearch == ""?URL=getFromURL:URL=searchURL+idSearch;
        jwtAxios.post(URL).then((response)=>{
          idSearch == ""?setData(response.data):setData([response.data]);
          notify.success("found!");
        }) .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div className="getAllCompanies">
            <Button variant="contained" startIcon={<AddBusinessIcon />}  color="secondary" onClick={addNewCompany}>
            New company
            </Button>
            <br/><br/>

			search company: <input type="text" placeholder="ID number" onChange={updateNumber}/>
            <input type="button" value="Search" onClick={searchById}/><hr/>

			 {Array.from(companiesData).map(item=><OneCompany key ={item.id} company = {item}/>)}
        </div>
    );
}

export default GetAllCompanies;
