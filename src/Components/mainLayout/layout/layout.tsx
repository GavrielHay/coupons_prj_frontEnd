import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import globals from "../../utils/Globals";
import Aside from "../aside/aside";
import Footer from "../footer/footer";
import Header from "../header/header";
import MainScreen from "../mainScreen/mainScreen";
import Routing from "../routing/routing";
import { couponDownloadedAction } from "../../reduxComponents/couponState";
import store from "../../reduxComponents/store";

import "./layout.css";
import OpenPage from "../../mainComponent/openPage/openPage";

function Layout(): JSX.Element {
    
    //to get coupons when site up and save in appState:      --> but not working :( 
 {/*}
    const myURL = globals.urls.guest+"all_coupons";

    useEffect(()=>{
        
        axios.get(myURL).then((response)=>{
            store.subscribe(()=>{
                store.dispatch(couponDownloadedAction(response.data));
                const couponsFromStore=JSON.stringify(store.getState().couponState.coupons);
                console.log("data arrived, store updated:   "+couponsFromStore);
            })
         ();
        }).catch(error=>{
            //notify.error("Sorry, can't get coupons.");
            console.log(error);
        })
       
    },[]);
{*/}

const [userType,setUserType] = useState("guest");


store.subscribe(()=>{
    setUserType(store.getState().loginState.loggedInUser.clientType);
    //console.log("header: getting info from store...");
})

function secondLayout(){
    switch(userType){
        case("Administrator"):
        case("Company"):
        case("Customer"):
            return <>
             <aside>
                        <Aside/>
                </aside>
            </>;
        default:
           // setUserType("Guest");
            return <>
           
           <section>
                    <OpenPage/>

                </section>
            </>;
    }
}

    return (
        <div className="layout">
            <BrowserRouter>
                <header>
                            <Header/>
                </header>
               {secondLayout()}
                <main>
                       {/*} <MainScreen/>*/}
                       <Routing/>
                </main>
                <footer>
                        <Footer/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
