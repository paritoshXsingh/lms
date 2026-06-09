import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/loginIllustration.svg";
import { useAuth } from "../context/authContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      await register(name, email, password);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
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
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Account</h2>

                  <p className="text-muted mb-0">
                    Join LearnHub and start learning today.
                  </p>
                </div>

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  <button type="submit" className="btn btn-primary w-100">
                    Create Account
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account?</span>

                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none ms-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="text-center text-white">
              <img
                src={registerImg}
                alt="LearnHub Register"
                className="img-fluid mb-4"
                style={{
                  maxHeight: "420px",
                }}
              />

              <h1 className="fw-bold mb-3">Welcome to LearnHub</h1>

              <p
                className="mx-auto"
                style={{
                  maxWidth: "500px",
                  fontSize: "1.05rem",
                }}
              >
                Learn from expert instructors, build real-world projects, and
                grow your career with practical, industry-focused courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
