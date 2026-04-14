import { Link } from "react-router";
export default function CtaSection() {
  return (
    <>
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
    </>
  );
}
