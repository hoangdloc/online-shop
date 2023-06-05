import axios from "axios";
import { url } from "../slices/api";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector(state => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id
      })
      .then(res => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch(err => console.error(err.message));
  };

  return <button onClick={() => handleCheckout()}>Check Out</button>;
};

export default PayButton;
