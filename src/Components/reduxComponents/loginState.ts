import OnlineUser from "../models/onlineUser";
import UserDetails from "../models/userDetails";
import jwt_decode from "jwt-decode";
import { stringify } from "querystring";
import jwtDecode from "jwt-decode";


//interface - our redux state
export class LoginState{
    public loggedInUser:OnlineUser = new OnlineUser();
} 

//action types
export enum LoginActionType{
    login = "login", 
    logout = "logout",
    updateToken = "updateToken",
 //   register = "register",
}

//actions decleration
export interface LoginAction {
    type: LoginActionType,
    payload?: any,
}

//action creators
export function loginAction(token:string):LoginAction{
    return{type: LoginActionType.login , payload: token}
}

export function logoutAction():LoginAction{
    return{type: LoginActionType.logout , payload: null}
}

export function updateTokenAction(token:string):LoginAction{
    return{type: LoginActionType.updateToken , payload: token}
}

{/*}
export function registerAction(newUser:UserDetails):LoginAction{
    return{type: LoginActionType.register , payload: newUser}
}
{*/}

//REDUX reducer
export function loginReducer(currentState: LoginState = new LoginState(), action:LoginAction):LoginState{
    const newState = {...currentState};

    switch (action.type){
        //case LoginActionType.login:
        //    const newLogin = new OnlineUser();
        //    newLogin.token = action.payload;
        //    break;
        case LoginActionType.logout:
            newState.loggedInUser = new OnlineUser();
            window.localStorage.removeItem("token");
            break;
        case LoginActionType.updateToken:
            //get the string, extract the client type, and update the authState
            //save the data to local storage
            window.localStorage.setItem("token",action.payload);
            const loggedInUser = new OnlineUser();
            loggedInUser.token = action.payload;
            loggedInUser.clientType = (JSON.parse(JSON.stringify(jwtDecode(loggedInUser.token)))).clientType;
            loggedInUser.userID = parseFloat((JSON.parse(JSON.stringify(jwtDecode(loggedInUser.token)))).userID);
            newState.loggedInUser = loggedInUser;
            break;
       // case LoginActionType.register:
            //do something
            break;
      
    }

    return newState;

    }
