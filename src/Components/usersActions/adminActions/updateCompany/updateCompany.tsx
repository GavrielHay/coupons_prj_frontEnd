import { Alert, Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../models/companyData";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JWTAxios";
import notify from "../../../utils/Notify";
import "./updateCompany.css";


interface UpdateCompanyProps {
	id:string
}


function UpdateCompany(props:UpdateCompanyProps): JSX.Element {
    let history = useHistory();
    const updateURL = globals.urls.admin+"update_company";
    const {register, handleSubmit, setError, formState:{errors}} = useForm<CompanyData>();

    
    //get updated information of company to show to user before update:
    // (can do this efficiently without accessing the server using redux)
    const getFromURL = globals.urls.admin+"get_company/"+props.id;
    const [setCompany,setData] = useState(new CompanyData());    
    useEffect(()=>{jwtAxios.post(getFromURL).then((response)=>{
        setData(response.data);
            }
        ).catch(error=>{
         notify.error("Sorry, can't finde company.")}) 
        }
    ,[]);


    function send(companyData:CompanyData) {
        companyData.id=setCompany.id;
        companyData.name=setCompany.name;
        jwtAxios.post<string>(updateURL,companyData).then((response)=>{
            notify.success("company was updated!")
            history.push("/ShowAllCompanies");
                })
        .catch(error=>{
        notify.error("Sorry, can't update company.")
        }) 
    }


    return (
        <div className="updateCompany LoginBox">
			 <form onSubmit={handleSubmit(send)}>
                <br/>
			    <h3>update company:</h3>
                {setCompany.name}
                <br/><br/><br/>
{/*}
                <TextField label="Name (need to be Auto)" variant="outlined"
                    {...register("name",{
                         required :{value:true, message:"please enter name"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         }) }/>
               {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
                <br/><br/>
                        {*/}
                <TextField label="new Email" variant="outlined"
                    {...register("email",{
                         required :{value:true, message:"please enter email"},
                         minLength :{value:3 ,message:"please enter at least 3 characters"},
                         maxLength :{value:40 ,message:"Up to 40 characters can be entered"},
                         pattern: {value:/@[A-Za-z]/ ,message:"please enter vaild email address" }
                         }) }/>
               {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                <br/><br/>

                <TextField label="new Password" variant="outlined" type="password"
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

export default UpdateCompany;
