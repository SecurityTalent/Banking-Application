
import { useSelector } from "react-redux";



function Customer() {
  const Customer = useSelector((state) => state.customer.fullName);

  console.log(Customer)

  return <h2>👋 Welcome, {Customer}</h2>;
}

export default Customer;

