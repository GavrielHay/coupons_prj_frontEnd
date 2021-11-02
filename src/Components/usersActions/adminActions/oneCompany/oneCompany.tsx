import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../models/companyData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import "./oneCompany.css";
import { useState } from "react";

interface SingleCompany {
company:CompanyData;
}

function OneCompany(props:SingleCompany): JSX.Element {


    let history = useHistory();
    function updateCompany(){
        history.push("/UpdateCompany/"+props.company.id);
    }

    const deleteURL = globals.urls.admin+"delete_company/"+props.company.id;
    function deleteCompany(){
        jwtAxios.delete(deleteURL).then((response)=>{
            console.log(response.data)
            history.push("/DeletionComplete");
        })
        .catch(error=>{notify.error("Sorry, can't delete company.")
        }) 
    }





    return (
        <div className="oneCompany LoginBox">
            <br/>
            id: {props.company.id}<br/>
            name: {props.company.name}<br/>
            email: {props.company.email}<br/>
            <br/>
            <div>
            <Tooltip title="To update">
                <IconButton aria-label="update" onClick={updateCompany}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteCompany}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            </div>
           <br/><br/>
        </div>
    );
}

export default OneCompany;
