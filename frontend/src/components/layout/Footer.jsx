import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-3">
        <div className="row g-4 align-items-start">
          {/* Brand */}
          <div className="col-12 col-md-5">
            <h4 className="fw-bold mb-2">LearnHub</h4>

            <p className="text-secondary mb-0">
              Learn practical skills from expert instructors, build real
              projects, and advance your career with flexible online learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">Explore</h6>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/courses"
                  className="text-decoration-none text-secondary"
                >
                  Courses
                </Link>
              </li>

              {user && (
                <li>
                  <Link
                    to="/profile"
                    className="text-decoration-none text-secondary"
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-4">
            <h6 className="fw-bold mb-3">Popular Categories</h6>

            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-dark border">Web Dev</span>
              <span className="badge bg-dark border">DSA</span>
              <span className="badge bg-dark border">AI</span>
              <span className="badge bg-dark border">Design</span>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-secondary text-center text-md-start">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </small>

          <small className="text-secondary text-center text-md-end">
            Built with MERN & Stripe
          </small>
        </div>
      </div>
    </footer>
  );
}
