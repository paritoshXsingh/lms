import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

import CheckOutForm from "../components/payment/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CheckOutPage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [creatingIntent, setCreatingIntent] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleCreatePaymentIntent = async () => {
    try {
      setCreatingIntent(true);

      const response = await axios.post(
        "/api/payment/create-payment-intent",
        {
          amount: course.price * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("user")
              .replaceAll('"', "")}`,
          },
        },
      );

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingIntent(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="alert alert-light border">Loading checkout...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Course not found.</div>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-3">Checkout</h2>

                <h4>{course.title}</h4>

                <p className="text-muted">{course.desc}</p>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Course Price</span>

                  <span className="fw-bold text-primary">₹{course.price}</span>
                </div>

                {!clientSecret ? (
                  <button
                    className="btn btn-primary w-100 mt-4"
                    onClick={handleCreatePaymentIntent}
                    disabled={creatingIntent}
                  >
                    {creatingIntent
                      ? "Creating Payment..."
                      : "Proceed to Payment"}
                  </button>
                ) : (
                  <div className="mt-4">
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckOutForm
                        courseId={course._id}
                        token={user}
                        navigate={navigate}
                      />
                    </Elements>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
