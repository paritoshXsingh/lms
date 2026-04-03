import { useState } from "react";
import { Link } from "react-router-dom";
import registerImg from "../assets/loginIllustration.svg"; // undraw svg

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // later connect backend
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* LEFT: Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            className="card p-4 shadow w-100 mx-3"
            style={{ maxWidth: "400px" }}
          >
            <h3 className="text-center mb-3">Create Account</h3>

            <form onSubmit={handleSubmit}>
              {/* Name */}
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

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
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

              {/* Button */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login" className="text-primary fw-semibold">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT: Illustration (desktop only) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <div className="text-center p-4">
            <img
              src={registerImg}
              alt="register"
              className="img-fluid mb-3"
              style={{ maxWidth: "80%" }}
            />
            <h4 className="fw-bold">Join Smart LMS</h4>
            <p className="text-muted">
              Start your learning journey today with top courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
