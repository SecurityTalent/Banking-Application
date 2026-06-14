import { createStore } from "redux";
import { combineReducers } from "redux";
import accountReducer from "./features/acounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";



const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);


export default store;



















