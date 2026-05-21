import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/course/CourseCard.jsx";
import { useAuth } from "../context/authContext.jsx";

const LearningPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user) {
        setCourses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        //my-courses is protected thus send the token along with the request
        const response = await axios.get("/api/courses/my-courses", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        setCourses(response.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load your courses right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-bold mb-2">My Learning Center</h1>
          <p className="text-muted mb-0">
            Continue with the courses you have already enrolled in.
          </p>
        </div>

        {loading && (
          <div className="alert alert-light border text-center shadow-sm">
            Loading your courses...
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger shadow-sm">{error}</div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="alert alert-light border text-center shadow-sm">
            You have not enrolled in any courses yet.
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="row g-4">
            {courses.map((course) => (
              <div key={course._id} className="col-12 col-md-6 col-xl-4">
                <CourseCard
                  course={course}
                  actionLabel="Start Learning"
                  actionTo={`/learning/${course._id}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningPage;
