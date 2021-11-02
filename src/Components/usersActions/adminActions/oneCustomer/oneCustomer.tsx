import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../models/customerData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useState } from "react";
import "./oneCustomer.css";



interface SingleCustomer {
    customer:CustomerData;
    }

function OneCustomer(props:SingleCustomer): JSX.Element {


    let history = useHistory();
    function updateCustomer(){
        history.push("/UpdateCustomer/"+props.customer.id);
    }

    const deleteURL = globals.urls.admin+"delete_customer/"+props.customer.id;

    function deleteCustomer(){
        jwtAxios.delete(deleteURL).then((response)=>{
            console.log(response.data)
            history.push("/DeletionComplete");
        })
            .catch(error=>{notify.error("Sorry, can't delete customer.")}) 
    }

    return (
        <div className="oneCustomer LoginBox">
			<br/>
            id: {props.customer.id}<br/>
            first name: {props.customer.firstName}<br/>
            last name: {props.customer.lastName}<br/>
            email: {props.customer.email}<br/>
            <br/>
           <br/>

           <div>
           <Tooltip title="To update">
                <IconButton aria-label="update" onClick={updateCustomer}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteCustomer}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            </div>

           <br/><br/>
        </div>
    );
}

export default OneCustomer;
