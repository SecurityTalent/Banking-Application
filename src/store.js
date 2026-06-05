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


            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
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

// ! Not to use good for real apps, just for testing. why? because it doesn't have middleware, devtools, etc.

// store.dispatch({ type: "account/deposit", payload: 500 })
// console.log(store.getState())

// store.dispatch({ type: "account/withdraw", payload: 200 })
// console.log(store.getState())


// store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a car" }, })
// console.log(store.getState())


// store.dispatch({ type: "account/payLoan" })
// console.log(store.getState())

//! use action creators instead of dispatching objects directly, it's a good practice and makes it easier to manage actions in larger applications.

function deposit(amount) {
    return {
        type: "account/deposit",
        payload: amount,
    }
}

function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount,
    }
}

function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose },
    }
}

function payLoan() {
    return {
        type: "account/payLoan",
    }
}


store.dispatch(deposit(500))
console.log(store.getState())

store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, "Buy a car"))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())






export default store;



















