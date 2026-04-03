import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">LMS</h4>
            <p className="text-muted">
              Learn new skills, upgrade your career, and grow with our online
              courses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-decoration-none text-light">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-decoration-none text-light">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-decoration-none text-light"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Categories</h6>
            <ul className="list-unstyled">
              <li className="text-muted">Web Development</li>
              <li className="text-muted">Data Science</li>
              <li className="text-muted">AI & ML</li>
              <li className="text-muted">Cyber Security</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="text-muted mb-1">Email: support@lms.com</p>
            <p className="text-muted mb-1">Phone: +91 9876543210</p>
          </div>
        </div>

        {/* Bottom */}
        <hr className="border-secondary" />

        <div className="text-center">
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} LMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
