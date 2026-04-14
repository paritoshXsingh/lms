import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="alert alert-light border text-center shadow-sm">
            Loading course details...
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="alert alert-light border shadow-sm">
            <h2 className="h4 fw-bold mb-2">Course not found</h2>
            <p className="text-muted mb-3">
              The course you are looking for may have been removed or is
              unavailable right now.
            </p>
            <Link to="/courses" className="btn btn-primary">
              Back to Courses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #20c997 100%)",
        }}
      >
        <div className="container py-3">
          <Link to="/courses" className="text-white text-decoration-none small">
            ← Back to all courses
          </Link>
          <div className="row g-4 align-items-end mt-1">
            <div className="col-lg-8">
              <span className="badge bg-light text-primary fw-semibold mb-3">
                {course.category?.name || "General"}
              </span>
              <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
              <p className="lead text-white-50 mb-0">
                {course.desc || "Course description coming soon."}
              </p>
            </div>
            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow p-4 text-dark">
                <p className="text-uppercase text-muted small mb-2">
                  Enrollment Price
                </p>
                <p className="display-6 fw-bold text-primary mb-3">
                  ₹{course.price}
                </p>
                <button className="btn btn-primary w-100" type="button">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="h3 fw-bold mb-3">About This Course</h2>
                  <p className="text-muted mb-0 lh-lg">
                    {course.desc || "Detailed course information will be added soon."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-4">Course Information</h3>
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span className="text-muted">Instructor</span>
                    <span className="fw-semibold">
                      {course.instructor?.name || "Expert Mentor"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span className="text-muted">Category</span>
                    <span className="fw-semibold">
                      {course.category?.name || "General"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Course ID</span>
                    <span className="fw-semibold small">{course._id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
