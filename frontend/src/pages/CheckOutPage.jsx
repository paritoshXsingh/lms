import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useAuth } from "../context/authContext.jsx";
import CheckOutForm from "../components/payment/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CheckOutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [creatingIntent, setCreatingIntent] = useState(false);

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
            Authorization: `Bearer ${user}`,
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

  const totalLessons =
    course.modules?.reduce(
      (count, module) => count + (module.lessons?.length || 0),
      0,
    ) || 0;

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h2 className="fw-bold mb-2">Secure Checkout</h2>

                <p className="text-muted mb-4">
                  Complete your enrollment and start learning today.
                </p>

                <h4 className="fw-bold">{course.title}</h4>

                <p className="text-muted">{course.desc}</p>

                <div className="bg-light rounded p-3 border mb-4">
                  <h6 className="fw-bold mb-3">Course Summary</h6>

                  <div className="d-flex justify-content-between mb-2">
                    <span>👨‍🏫 Instructor</span>
                    <span>{course.instructor?.name}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>📚 Modules</span>
                    <span>{course.modules?.length || 0}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>🎬 Lessons</span>
                    <span>{totalLessons}</span>
                  </div>
                </div>

                <hr />

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Course Price</span>

                    <div>
                      <span className="text-decoration-line-through text-muted me-2">
                        ₹{course.price + 200}
                      </span>

                      <span className="fw-bold fs-4 text-primary">
                        ₹{course.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="small text-muted mb-4">
                  ✓ Lifetime access <br />
                  ✓ Learn at your own pace <br />✓ Secure payments powered by
                  Stripe
                </div>

                {!clientSecret ? (
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleCreatePaymentIntent}
                    disabled={creatingIntent}
                  >
                    {creatingIntent
                      ? "Preparing Payment..."
                      : "Proceed to Payment"}
                  </button>
                ) : (
                  <div className="border rounded p-4 mt-4">
                    <h6 className="fw-bold mb-3">Payment Details</h6>

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
