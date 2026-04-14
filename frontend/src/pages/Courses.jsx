import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/course/CourseCard.jsx";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)",
        }}
      >
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-info-subtle text-info-emphasis mb-3">
                Explore Our Catalog
              </span>
              <h1 className="display-5 fw-bold mb-3">Find your next course</h1>
              <p className="lead text-white-50 mb-0">
                Browse practical, career-focused learning paths taught by
                mentors and industry professionals.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="bg-white bg-opacity-10 rounded-4 p-4 border border-white border-opacity-10">
                <p className="small text-uppercase text-white-50 mb-2">
                  Total Courses
                </p>
                <p className="display-6 fw-bold mb-0">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {loading && (
            <div className="alert alert-light border text-center shadow-sm">
              Loading courses...
            </div>
          )}

          {!loading && courses.length === 0 && (
            <div className="alert alert-light border text-center shadow-sm">
              No courses have been added yet.
            </div>
          )}

          {!loading && courses.length > 0 && (
            <div className="row g-4">
              {courses.map((course) => (
                <div key={course._id} className="col-12 col-md-6 col-xl-4">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
