import { useState } from "react";
import loginIllustration from "../assets/loginIllustration.svg";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login from submitted", formData);
    //pass login info to authContext
    await login(formData.email, formData.password);
    navigate("/");
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* LEFT: Illustration (only on md and above) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <div className="text-center p-4">
            <img
              src={loginIllustration}
              alt="login illustration"
              className="img-fluid mb-3"
              style={{ maxWidth: "80%" }}
            />
            <h4 className="fw-bold">Welcome Back!</h4>
            <p className="text-muted">
              Login to access your courses and continue learning.
            </p>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            className="card p-4 shadow w-100 mx-3"
            style={{ maxWidth: "400px" }}
          >
            <h3 className="text-center mb-3">LMS Login</h3>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
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
                Login
              </button>

              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
