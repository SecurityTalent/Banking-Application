const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
    
}

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
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
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;


    }

}

// ! redux thunk allows us to write action creators that return a function instead of an action object. This is useful for handling asynchronous operations, such as fetching data from an API, before dispatching an action to the reducer.

export function deposit(amount, currency) {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount,
        };
    }


    return async function (dispatch, getState) {
        dispatch({
            type: "account/convertingCurrency",
        })

        try {
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);

            if (!res.ok) throw new Error("Failed to fetch exchange rate");
            const data = await res.json();
            const convertedAmount = amount * data.rates.USD;

            dispatch({
                type: "account/deposit",
                payload: convertedAmount,
            });
        } 
        
        catch (err) {
            console.error(err);
        }
    };
}




export function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount,
    }
}

export function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose },
    }
}

export function payLoan() {
    return {
        type: "account/payLoan",
    }
}




