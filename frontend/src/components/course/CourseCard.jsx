import { Link } from "react-router-dom";

export default function CourseCard({ course, compact = false }) {
  const description = course.desc?.length > 100
    ? `${course.desc.slice(0, 100)}...`
    : course.desc;

  return (
    <div className="card border-0 shadow-sm h-100 overflow-hidden">
      <div
        className="p-4 text-white"
        style={{
          minHeight: compact ? "180px" : "210px",
          background: "linear-gradient(135deg, #0d6efd 0%, #20c997 100%)",
        }}
      >
        <span className="badge bg-light text-primary fw-semibold mb-3">
          {course.category?.name || "General"}
        </span>
        <h5 className="fw-bold mb-2">{course.title}</h5>
        <p className="mb-0 small text-white-50">
          {description || "Learn through practical lessons and guided content."}
        </p>
      </div>

      <div className="card-body d-flex flex-column">
        <p className="text-muted small mb-2">
          Instructor: {course.instructor?.name || "Expert Mentor"}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <span className="fw-bold fs-5 text-primary">₹{course.price}</span>
          <Link
            to={`/courses/${course._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
