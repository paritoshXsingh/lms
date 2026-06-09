import { useState } from "react";
import loginIllustration from "../assets/loginIllustration.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);

      navigate("/");
    } catch (loginError) {
      setError(
        loginError.response?.data?.message || "Unable to login right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">
          {/* LEFT SIDE */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="text-center text-white">
              <img
                src={loginIllustration}
                alt="LearnHub Login"
                className="img-fluid mb-4"
                style={{
                  maxHeight: "420px",
                }}
              />

              <h1 className="fw-bold mb-3">Welcome Back</h1>

              <p
                className="mx-auto"
                style={{
                  maxWidth: "500px",
                  fontSize: "1.05rem",
                }}
              >
                Continue your learning journey, access your enrolled courses,
                and track your progress with LearnHub.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Login</h2>

                  <p className="text-muted mb-0">
                    Sign in to your LearnHub account.
                  </p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account?</span>

                  <Link
                    to="/register"
                    className="fw-semibold text-decoration-none ms-2"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
