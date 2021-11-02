import { Alert, Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../models/customerData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./addCustomer.css";

function AddCustomer(): JSX.Element {
    let history = useHistory();
    const myURL = globals.urls.admin+"add_customer";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<CustomerData>();

    function send(customerData:CustomerData) {
        jwtAxios.post<string>(myURL,customerData)
        .then(()=>{
            notify.success("customer was added!")
            history.push("/ShowAllCustomers");
        }).catch(error=>{
            notify.error("Sorry, can't add customer.")
        }) 
    }


    return (
        <div className="addCustomer LoginBox">
			 <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h3>add customer</h3>
                <br/>
                
                <TextField label="First name" variant="outlined"
                    {...register("firstName",{
                         required :{value:true, message:"please enter first name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.firstName && <Alert severity="error">{errors.firstName.message}</Alert>}
                <br/><br/>

                <TextField label="Last name" variant="outlined"
                    {...register("lastName",{
                         required :{value:true, message:"please enter last name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.lastName && <Alert severity="error">{errors.lastName.message}</Alert>}
                <br/><br/>

                <TextField label="Email" variant="outlined"
                    {...register("email",{
                         required :{value:true, message:"please enter email"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         pattern: {value:/@[A-Za-z]/ ,message:"please enter vaild email address" }
                         }) }/>
               {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                <br/><br/>

                <TextField label="Password" variant="outlined" type="password"
                    {...register("password",{
                         required :{value:true, message:"please enter password"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
                <br/><br/>

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="secondary">ADD NOW!</Button>
                </ButtonGroup>
                <br/><br/>
            </form>
        </div>
    );
}

export default AddCustomer;
