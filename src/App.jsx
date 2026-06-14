import './App.css'
import { useSelector } from "react-redux";
// import CreateCustomer from "./CreateCustomer";
// import Customer from "./Customer";
// import AccountOperations from "./AccountOperations";
// import BalanceDisplay from "./BalanceDisplay";

import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/acounts/AccountOperations";
import BalanceDisplay from "./features/acounts/BalanceDisplay";


function App() {

  const fullName = useSelector((state) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
        {fullName === "" ? (
          <CreateCustomer />
        ) : (
          <>
            <Customer />
            <AccountOperations />
            <BalanceDisplay />

          </>
        )
      }



    </div>
  );
}


export default App



// Minute 1:27:00