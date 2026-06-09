import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import FeturedCourses from "../components/home/FeaturedCourses";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <HeroSection />

      {/* 🔥 STATS SECTION */}
      <section
        className="py-4 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #20c997 100%)",
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <h3 className="fw-bold">500+</h3>
              <small>Students</small>
            </div>

            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <h3 className="fw-bold">50+</h3>
              <small>Courses</small>
            </div>

            <div className="col-6 col-md-3">
              <h3 className="fw-bold">20+</h3>
              <small>Instructors</small>
            </div>

            <div className="col-6 col-md-3">
              <h3 className="fw-bold">4</h3>
              <small>Categories</small>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 pb-5"></section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Browse by Category</h2>

          <div className="row">
            {/* Category Card */}
            <div className="col-6 col-md-3 mb-4">
              <Link
                to="/courses?category=Web Dev"
                className="text-decoration-none"
              >
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🌐 Web Dev</h5>
                  <p className="text-muted small">HTML, CSS, React</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link to="/courses?category=DSA" className="text-decoration-none">
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>📊 DSA</h5>
                  <p className="text-muted small">Python, ML</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link to="/courses?category=AI" className="text-decoration-none">
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🤖 AI & ML</h5>
                  <p className="text-muted small">Deep Learning</p>
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <Link
                to="/courses?category=Design"
                className="text-decoration-none"
              >
                <div className="card shadow-sm p-4 h-100 category-card">
                  <h5>🔐 Design</h5>
                  <p className="text-muted small">Design Implementations</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FEATURES SECTION */}
      <FeturedCourses />

      {/* 🔥 CTA SECTION */}
      <CtaSection />
    </div>
  );
}
