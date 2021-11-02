import { Redirect, Route, Switch } from "react-router";
import OpenPage from "../../mainComponent/openPage/openPage";
import LoginComponent from "../../mainComponent/loginComponent/loginComponent";
import Page404 from "../page404/page404";
import AllCoupons from "../../couponsComponent/showAllCoupons/allCoupons";
import AddCoupon from "../../usersActions/companyActions/addCoupon/addCoupon";
import FullOneCoupon from "../../couponsComponent/fullOneCoupon/fullOneCoupon";
import AddCompany from "../../usersActions/adminActions/addCompany/addCompany";
import UpdateCompany from "../../usersActions/adminActions/updateCompany/updateCompany";
import GetAllCustomers from "../../usersActions/adminActions/getAllCustomers/getAllCustomers";
import UpdateCustomer from "../../usersActions/adminActions/updateCustomer/updateCustomer";
import AddCustomer from "../../usersActions/adminActions/addCustomer/addCustomer";
import GetAllCompanies from "../../usersActions/adminActions/getAllCompanies/getAllCompanies";
import UpdateCoupon from "../../usersActions/companyActions/updateCoupon/updateCoupon";
import GetCompanyCoupons from "../../usersActions/companyActions/getCompanyCoupons/getCompanyCoupons";
import GetCompanyDetails from "../../usersActions/companyActions/getCompanyDetails/getCompanyDetails";
import BuyCoupon from "../../usersActions/customerActions/buyCoupon/buyCoupon";
import GetCustomerCoupons from "../../usersActions/customerActions/getCustomerCoupons/getCustomerCoupons";
import GetCustomerDetails from "../../usersActions/customerActions/getCustomerDetails/getCustomerDetails";
import LogoutComponent from "../../mainComponent/logoutComponent/logoutComponent";
import DeletePage from "../../mainComponent/deletePage/deletePage";

function Routing(): JSX.Element {
    return (
        <div className="routing">
			<Switch>
                //guest actions
                <Route path="/login" component={LoginComponent} exact/>
                <Route path="/logout" component={LogoutComponent} exact/>
                <Route path="/coupons_show" component={AllCoupons} exact/>
                <Route path="/full_single_coupon/:id" render={(props)=><FullOneCoupon id={props.match.params.id} />}/>

                //admin actions
                <Route path="/AddCompany" component={AddCompany} exact/>
                <Route path="/UpdateCompany/:id" render={(props)=><UpdateCompany id={props.match.params.id} />}/>
                <Route path="/ShowAllCompanies" component={GetAllCompanies} exact/>
                <Route path="/AddCustomer" component={AddCustomer} exact/>
                <Route path="/UpdateCustomer/:id" render={(props)=><UpdateCustomer id={props.match.params.id} />}/>
                <Route path="/ShowAllCustomers" component={GetAllCustomers} exact/>

                //company actions
                <Route path="/AddCoupon" component={AddCoupon}/>
                <Route path="/UpdateCoupon/:id"render={(props)=><UpdateCoupon id={props.match.params.id}/>}/>
                <Route path="/ShowCompanyCoupons" component={GetCompanyCoupons} exact/>
                <Route path="/ShowCompanyDetails" component={GetCompanyDetails} exact/>

                //customer actions
                <Route path="/BuyCoupon/:id" render={(props)=><BuyCoupon id={props.match.params.id} />}/>
                <Route path="/ShowCustomerCoupons" component={GetCustomerCoupons} exact/>
                <Route path="/ShowCustomerDetails" component={GetCustomerDetails} exact/>

                <Route path="/DeletionComplete" component={DeletePage} exact/>

                {/*} first page:{*/}
                <Redirect from="/" to="/coupons_show" exact/>
                {/*}"page not found".  must be last:{*/}
                <Route component={Page404}/>
            </Switch>
        </div>
    );
}

export default Routing;
