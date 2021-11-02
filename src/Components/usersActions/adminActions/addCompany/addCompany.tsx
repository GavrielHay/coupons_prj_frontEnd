import { Alert, Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../models/companyData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./addCompany.css";

function AddCompany(): JSX.Element {
    let history = useHistory();
    const myURL = globals.urls.admin+"add_company";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<CompanyData>();

    function send(companyData:CompanyData) {
        jwtAxios.post<string>(myURL,companyData)
        .then(()=>{
            notify.success("company was added!")
            history.push("/ShowAllCompanies");
        }).catch(error=>{
            notify.error("Sorry, can't add company.")
        }) 
    }

    return (
        <div className="addCompany LoginBox">
			 <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h3>add company</h3>
                <br/>

                <TextField label="Name" variant="outlined"
                    {...register("name",{
                         required :{value:true, message:"please enter name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
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

export default AddCompany;
