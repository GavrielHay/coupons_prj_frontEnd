import CouponData from "../models/couponData";
import store from "./store";

//interface - our redux state
export class CouponState{
    public coupons:CouponData[] = [];
} 

//action types
export enum CouponActionType{
    couponDownloaded = "CouponDownloaded", //get
    couponAdded = "CouponAdded",
    couponUpdated = "CouponUpdated",
    couponDeleted = "CouponDeleted",
}

//actions decleration
export interface CouponAction {
    type: CouponActionType,
    payload?: any,
}

//action creators
export function couponDownloadedAction(coupons:CouponData[]):CouponAction{
    return{type: CouponActionType.couponDownloaded , payload: coupons}
}

export function couponAddedAction(coupon:CouponData):CouponAction{
    return{type: CouponActionType.couponAdded , payload: coupon}
}

export function couponUpdatedAction(coupon:CouponData):CouponAction{
    return{type: CouponActionType.couponUpdated , payload: coupon}
}

export function couponDeletedAction(id:number):CouponAction{
    return{type: CouponActionType.couponDeleted , payload: id}
}

//REDUX reducer
export function couponReducer(currentState: CouponState = new CouponState(), action:CouponAction):CouponState{
    const newState = {...currentState};

    switch (action.type){
        case CouponActionType.couponDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponActionType.couponAdded:
            const addToCoupons = store.getState().couponState.coupons;
            addToCoupons.push(action.payload);
            newState.coupons = addToCoupons;
            break;
        case CouponActionType.couponUpdated:
            let updatedCoupon = new CouponData;
            updatedCoupon = action.payload;
            const updateInCoupons = store.getState().couponState.coupons;
            Array.from(updateInCoupons).map(item=>{if(item.id===updatedCoupon.id){
                const index = updateInCoupons.indexOf(item);
                updateInCoupons[index]=updatedCoupon;
                newState.coupons = updateInCoupons;
                return;
            }})
            break;
        case CouponActionType.couponDeleted:
            const deleteFromCoupons = store.getState().couponState.coupons;
            Array.from(deleteFromCoupons).map(item=>{if(item.id===action.payload){
                const index = deleteFromCoupons.indexOf(item);
                deleteFromCoupons.splice(index,1);
                newState.coupons = deleteFromCoupons;
                return;
            }})
            break;
    }

    return newState;
    }
