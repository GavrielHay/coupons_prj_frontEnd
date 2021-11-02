import { Alert, Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../models/customerData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./updateCustomer.css";


interface UpdateCustomerProps {
	id:string
}

function UpdateCustomer(props:UpdateCustomerProps): JSX.Element {
    let history = useHistory();
    const updateURL = globals.urls.admin+"update_customer";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<CustomerData>();

    //get updated information of customer to show to user before update:
    // (can do this efficiently without accessing the server using redux)
    const getFromURL = globals.urls.admin+"get_customer/"+props.id;
    const [setCustomer,setData] = useState(new CustomerData());    
    useEffect(()=>{jwtAxios.post(getFromURL)
        .then((response)=>{
            setData(response.data)
            }
        ).catch(error=>{
            notify.error("Sorry, can't finde customer.")
        }) 
    },[]);

    function send(customerData:CustomerData) {
        customerData.id=setCustomer.id;
        jwtAxios.post<string>(updateURL,customerData)
        .then((response)=>{
            notify.success("customer was updated!")
            history.push("/ShowAllCustomers");
        }).catch(error=>{
        notify.error("Sorry, can't update customer.")
        }) 
    }


    return (
        <div className="updateCustomer LoginBox">
			 <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h3>update customer</h3>
                {setCustomer.firstName}{" "}{setCustomer.lastName}
                <br/><br/><br/>
                
                <TextField label="New First name" variant="outlined"
                    {...register("firstName",{
                         required :{value:true, message:"please enter first name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.firstName && <Alert severity="error">{errors.firstName.message}</Alert>}
                <br/><br/>

                <TextField label="New Last name" variant="outlined"
                    {...register("lastName",{
                         required :{value:true, message:"please enter last name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.lastName && <Alert severity="error">{errors.lastName.message}</Alert>}
                <br/><br/>

                <TextField label="New Email" variant="outlined"
                    {...register("email",{
                         required :{value:true, message:"please enter email"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         pattern: {value:/@[A-Za-z]/ ,message:"please enter vaild email address" }
                         }) }/>
               {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                <br/><br/>

                <TextField label="New Password" variant="outlined" type="password"
                    {...register("password",{
                         required :{value:true, message:"please enter password"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
                <br/><br/>

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="secondary">UPDATE</Button>
                </ButtonGroup>
                <br/><br/>
            </form>
        </div>
    );
}

export default UpdateCustomer;
