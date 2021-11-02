import axios from "axios";
import { updateTokenAction } from "../reduxComponents/loginState";
import store from "../reduxComponents/store";
import notify from "./Notify";

//יצירת אובייקט מוכן של
//axios => singleTon
const jwtAxios = axios.create();
//Request Interceptor - מה אנחנו רוצים לבצע מראש בעת שליחת בקשה לשרת
jwtAxios.interceptors.request.use((request)=>{
    let myToken =store.getState().loginState.loggedInUser.token;
   if (myToken.length<3){
      myToken = localStorage.getItem("token");
      if (myToken!==null){
         store.dispatch(updateTokenAction(myToken));
      }
    }
    request.headers = { "authorization" : "Bearer " + myToken } 
    return request;
});

jwtAxios.interceptors.response.use(
    (response)=>{
        store.dispatch(updateTokenAction(response.headers.authorization));
        return response;
    },(error) => {
        switch (error.response.status) {
          case 400:
            throw new Error(error.response.data.description);
          case 401:
            console.log("authorization error: You are not allowed.")
            throw new Error(error.response.data.description);
          case 403:
            throw new Error("Token time expired");
          case 404:
            console.log(error)
            throw new Error("Sorry, can't found.");
    
          default:
          throw new Error("An problem Occured")
        }
        
  });



export default jwtAxios;