import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import FeturedCourses from "../components/home/FeaturedCourses";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <HeroSection />

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

      {/* 🔥 FEATURES SECTION */}
      <FeturedCourses />

      {/* 🔥 CTA SECTION */}
      <CtaSection />
    </div>
  );
}
