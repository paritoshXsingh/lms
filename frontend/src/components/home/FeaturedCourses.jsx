import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "../course/CourseCard.jsx";

export default function FeturedCourses() {
  //place to store courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  //call the get course api
  useEffect(() => {
    //fetch the data
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        //save the data to our state
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const featuredCourses = courses.slice(0, 4);

  return (
    <>
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary text-decoration-none">
              View All →
            </Link>
          </div>

          <div className="row">
            {loading && (
              <div className="col-12">
                <div className="alert alert-light border text-center mb-0">
                  Loading featured courses...
                </div>
              </div>
            )}

            {!loading && featuredCourses.length === 0 && (
              <div className="col-12">
                <div className="alert alert-light border text-center mb-0">
                  No courses available right now.
                </div>
              </div>
            )}

            {!loading &&
              featuredCourses.map((course) => (
                <div key={course._id} className="col-12 col-sm-6 col-lg-3 mb-4">
                  <CourseCard course={course} compact />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
