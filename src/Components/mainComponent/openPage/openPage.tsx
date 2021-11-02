import { Button } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../reduxComponents/store";
import "./openPage.css";

function OpenPage(): JSX.Element {

    let history = useHistory();
    function goToLogin() {history.push("/login");}

    return (
        <div className="openPage mainTitle">
           <br/><br/><br/>
     <h1>FREE COUPONS FOR SALE</h1><br/>
      <br/>
      <Button variant="contained" color="secondary" size="large" onClick={goToLogin} >
          Shop Now
        </Button>
		{/*}<h3>Welcome Dear {store.getState().loginState.loggedInUser.clientType}</h3><br/>
            what would you like to do today? {*/}
        </div>
    );
}

export default OpenPage;
