import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckOutPage = () => {
  const amount = 899;
  return;
  <>
    <h1>Complete your order</h1>
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: "CONSTANT_Client_SECRET" }}
    >
      <CheckOutForm amount={amount}></CheckOutForm>
    </Elements>
  </>;
};

export default CheckOutPage;
