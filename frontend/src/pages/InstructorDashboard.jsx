import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";
import CourseCard from "../components/course/CourseCard.jsx";

export default function InstructorDashboard() {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get("/api/courses/instructor/my-courses", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        setMyCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchMyCourses();
    }
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await axios.post(
        "/api/courses",
        {
          title: formData.title,
          desc: formData.desc,
          price: Number(formData.price),
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setMyCourses((prev) => [response.data, ...prev]);

      setSuccess("Course created successfully!");

      setFormData({
        title: "",
        desc: "",
        price: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create course");
    }
  };

  const totalRevenuePotential = myCourses.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0,
  );

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="fw-bold display-6">Instructor Dashboard</h1>

          <p className="text-muted mb-0">
            Manage your courses and create engaging learning experiences.
          </p>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <h3 className="fw-bold text-primary mb-1">
                  {myCourses.length}
                </h3>

                <small className="text-muted">Courses</small>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <h3 className="fw-bold text-success mb-1">
                  ₹{totalRevenuePotential}
                </h3>

                <small className="text-muted">Revenue Potential</small>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <h3 className="fw-bold text-info mb-1">{categories.length}</h3>

                <small className="text-muted">Categories</small>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <h3 className="fw-bold text-warning mb-1">Active</h3>

                <small className="text-muted">Instructor</small>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="row g-4">
          {/* CREATE COURSE */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-2">Create a New Course</h3>

                <p className="text-muted mb-4">
                  Build and publish professional learning content for your
                  students.
                </p>

                <form onSubmit={handleSubmit}>
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Course Title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="desc"
                      className="form-control"
                      rows="4"
                      placeholder="Course Description"
                      value={formData.desc}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Course Price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>

                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary px-4">
                    Create Course
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* MY COURSES */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="fw-bold mb-1">My Courses</h3>

                    <p className="text-muted mb-0">Courses created by you.</p>
                  </div>

                  <span className="badge bg-primary">
                    {myCourses.length} Courses
                  </span>
                </div>

                {myCourses.length === 0 ? (
                  <div className="alert alert-info mb-0">
                    You haven't created any courses yet.
                  </div>
                ) : (
                  <div className="row g-3">
                    {myCourses.map((course) => (
                      <div key={course._id} className="col-12">
                        <CourseCard
                          course={course}
                          actionLabel="Manage Course"
                          actionTo={`/instructor/course/${course._id}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
