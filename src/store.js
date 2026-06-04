import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",

}


function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            }

        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload,
            }
        case "account/requestLoan":
            if (state.loan > 0) return state

            // ! LATER
            return {
                ...state,
                loan: action.payload,

            }
        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
            }

        default:
            return state;


    }

}




const store = createStore(reducer);



store.dispatch({ type: "account/deposit", payload: 100 })
console.log(store.getState())

store.dispatch({ type: "account/withdraw", payload: 50 })
console.log(store.getState())


store.dispatch({ type: "account/requestLoan", payload: 1000 })
console.log(store.getState())


store.dispatch({ type: "account/payLoan" })
console.log(store.getState())






export default store;



















