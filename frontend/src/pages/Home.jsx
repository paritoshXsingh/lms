import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <HeroSection />

      {/* 🔥 FEATURES SECTION */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose Us</h2>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-3 h-100">
                <h5>📚 Expert Courses</h5>
                <p className="text-muted">
                  Learn from industry professionals with real-world experience.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-3 h-100">
                <h5>💻 Learn Anytime</h5>
                <p className="text-muted">
                  Access courses anytime, anywhere at your own pace.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-3 h-100">
                <h5>🚀 Career Growth</h5>
                <p className="text-muted">
                  Build skills that help you land better opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Browse by Category</h2>

          <div className="row">
            {/* Category Card */}
            <div className="col-6 col-md-3 mb-4">
              <Link to="/courses?category=web" className="text-decoration-none">
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🌐 Web Dev</h5>
                  <p className="text-muted small">HTML, CSS, React</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link
                to="/courses?category=data"
                className="text-decoration-none"
              >
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>📊 Data Science</h5>
                  <p className="text-muted small">Python, ML</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link to="/courses?category=ai" className="text-decoration-none">
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🤖 AI & ML</h5>
                  <p className="text-muted small">Deep Learning</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link
                to="/courses?category=security"
                className="text-decoration-none"
              >
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🔐 Cyber Security</h5>
                  <p className="text-muted small">Ethical Hacking</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary text-decoration-none">
              View All →
            </Link>
          </div>

          <div className="row">
            {/* Course Card */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://via.placeholder.com/300x180"
                  className="card-img-top"
                  alt="course"
                />
                <div className="card-body">
                  <h6 className="fw-bold">React for Beginners</h6>
                  <p className="text-muted small mb-1">By John Doe</p>
                  <p className="fw-semibold text-primary">₹499</p>
                </div>
              </div>
            </div>

            {/* Duplicate cards for now */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://via.placeholder.com/300x180"
                  className="card-img-top"
                  alt="course"
                />
                <div className="card-body">
                  <h6 className="fw-bold">Node.js Mastery</h6>
                  <p className="text-muted small mb-1">By Jane Smith</p>
                  <p className="fw-semibold text-primary">₹699</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://via.placeholder.com/300x180"
                  className="card-img-top"
                  alt="course"
                />
                <div className="card-body">
                  <h6 className="fw-bold">Python for Data Science</h6>
                  <p className="text-muted small mb-1">By Alex Lee</p>
                  <p className="fw-semibold text-primary">₹799</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://via.placeholder.com/300x180"
                  className="card-img-top"
                  alt="course"
                />
                <div className="card-body">
                  <h6 className="fw-bold">Cyber Security Basics</h6>
                  <p className="text-muted small mb-1">By Mike Ross</p>
                  <p className="fw-semibold text-primary">₹599</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CTA SECTION */}
      <section className="bg-primary text-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Start Learning Today</h2>
          <p className="mt-2">
            Join thousands of learners and boost your career.
          </p>
          <Link to="/login" className="btn btn-light mt-3 px-4">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
