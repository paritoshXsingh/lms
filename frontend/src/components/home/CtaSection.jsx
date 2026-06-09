import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

export default function CtaSection() {
  const { user } = useAuth();

  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #20c997 100%)",
      }}
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-3">Ready to Build Your Future?</h2>

        <p className="lead mb-4">
          Learn from expert instructors, gain practical skills, and accelerate
          your career with LearnHub.
        </p>

        <Link
          to={user ? "/courses" : "/register"}
          className="btn btn-light btn-lg px-4"
        >
          {user ? "Browse More Courses" : "Create Free Account"}
        </Link>
      </div>
    </section>
  );
}
