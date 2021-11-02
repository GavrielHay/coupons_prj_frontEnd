import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../reduxComponents/loginState";
import store from "../../reduxComponents/store";
import "./logoutComponent.css";

function LogoutComponent(): JSX.Element {
    let history = useHistory();

    useEffect(()=>{
        store.dispatch(logoutAction());
        history.push("/");
    },[]);


    return (
        <div className="logoutComponent">
			logging out...
        </div>
    );
}

export default LogoutComponent;
