import CouponData from "./couponData";

class CompanyData {
    public id:number=0;
    public name:string="";
    public email:string="";
    public password:string="";
    public coupons:CouponData[]=[];

}

export default CompanyData;