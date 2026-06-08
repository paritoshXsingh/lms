import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";
import CourseCard from "../components/course/CourseCard.jsx";

export default function InstructorDashboard() {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
  });
  const [myCourses, setMyCourses] = useState([]);
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
        console.log(error);
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
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-bold">Instructor Dashboard</h1>
          <p className="text-muted">
            Manage your courses and create new learning content.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4>Create Course</h4>
                <p className="text-muted">
                  Create a new course and start building content.
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
                      rows="3"
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
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
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

                  <button type="submit" className="btn btn-primary">
                    Create Course
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4>My Courses</h4>

                <p className="text-muted">Courses created by you.</p>

                {myCourses.length === 0 ? (
                  <div className="alert alert-light border">
                    You have not created any courses yet.
                  </div>
                ) : (
                  <div className="row g-3">
                    {myCourses.map((course) => (
                      <div key={course._id} className="col-12">
                        <CourseCard course={course} />
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
