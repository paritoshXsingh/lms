import heroImg from "../../assets/loginIllustration.svg";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section
      className="py-5 text-light"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold display-5">
              Learn Smarter with <span className="text-primary">Smart LMS</span>
            </h1>
            <p className="text-muted mt-3">
              Upgrade your skills with top courses from industry experts. Learn
              anytime, anywhere.
            </p>

            <div className="mt-4">
              <Link to="/courses" className="btn btn-primary me-3 px-4">
                Explore Courses
              </Link>
              <Link to="/login" className="btn btn-outline-primary px-4">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={heroImg}
              alt="learning"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
