import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useState } from "react";

const CheckOutForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // setting my loader up
    event.preventDefault();
    setIsLoading(true);

    //validations
    const { error } = await stripe.confirmPayment({
      elements,
      //clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/complete`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Something went wroong");
    }
    setIsLoading(false);
  };
  return (
    <>
      <form id="course-payment" onSubmit={handleSubmit}>
        <PaymentElement id="course-payment-element" />
        <button disabled={isLoading || !elements || !stripe} id="submit">
          {isLoading && <div className="spinner" id="spinner"></div>}Pay Now
        </button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default CheckOutForm;
