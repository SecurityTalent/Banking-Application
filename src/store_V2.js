import {configureStore} from "@reduxjs/toolkit";

import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/acounts/accountSlice";


const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  }
})


export default store;