import CouponData from "./couponData";

class CustomerData {
public id:number=0;
public firstName:string="";
public lastName:string="";
public email:string="";
public password:string="";
public coupons:CouponData[]=[];

}

export default CustomerData;