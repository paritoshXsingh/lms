import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function CheckOutForm({ courseId, token, navigate }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError("");

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        try {
          await axios.post(
            `/api/courses/${courseId}/enroll`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          alert("Payment Successful!");

          navigate("/learning");
        } catch (error) {
          console.error(error);

          setError("Payment completed but enrollment failed.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <button
        type="submit"
        className="btn btn-success w-100 mt-3"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
