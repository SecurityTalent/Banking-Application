import { useState } from "react";
import { useDispatch } from "react-redux";
import { deposit } from "./accountSlice";
import { useSelector } from "react-redux";
import { withdraw } from "./accountSlice";
import { requestLoan } from "./accountSlice";
import { payLoan } from "./accountSlice";
import { depositMoney } from "./accountSlice";



function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");



  const dispatch = useDispatch();
  const {loan: currentLoan, loanPurpose: currentLoanPurpose, balance, isLoading} = useSelector((store) => store.account);

  // console.log(balance);

  function handleDeposit() {
    if(!depositAmount) return;
    // dispatch(deposit(Number(depositAmount), currency)); // ! Version V1 without redux toolkit
    dispatch(depositMoney(Number(depositAmount), currency));  // ! Version V2 with redux toolkit


    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if(!withdrawalAmount) return;

    dispatch(withdraw(Number(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if(!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal} disabled={isLoading}>
            {isLoading ? "Processing..." : `Withdraw ${withdrawalAmount}`}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>


        {currentLoan > 0 && (
          <div>
            <span>Pay back ${currentLoan} - ${currentLoanPurpose}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;




