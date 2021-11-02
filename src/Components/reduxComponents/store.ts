import {combineReducers, createStore} from "redux";
import { couponReducer } from "./couponState";
import { loginReducer } from "./loginState";

const reducers = combineReducers({
    loginState:loginReducer,
    couponState:couponReducer,
})

const store = createStore(reducers);


export default store;