import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";

export default function InstructorCoursePage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [moduleTitle, setModuleTitle] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleAddModule = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await axios.post(
        `/api/courses/${id}/modules`,
        {
          title: moduleTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setCourse((prev) => ({
        ...prev,
        modules: response.data.modules,
      }));

      setModuleTitle("");
      setSuccess("Module added successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to add module");
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="alert alert-light border">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Course not found.</div>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-bold">{course.title}</h1>

          <div className="d-flex gap-2 align-items-center">
            <span className="badge bg-primary">{course.category?.name}</span>

            <span className="text-muted">₹{course.price}</span>
          </div>

          <p className="text-muted mt-3">{course.desc}</p>
        </div>

        <div className="row g-4">
          {/* Add Module */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4>Add Module</h4>

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleAddModule}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Module Title"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Add Module
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="mb-3">
                  Modules ({course.modules?.length || 0})
                </h4>

                {course.modules?.length === 0 ? (
                  <div className="alert alert-light border">
                    No modules added yet.
                  </div>
                ) : (
                  <div className="list-group">
                    {course.modules.map((module, index) => (
                      <div key={module._id} className="list-group-item">
                        <div className="fw-semibold">
                          Module {index + 1}: {module.title}
                        </div>

                        <small className="text-muted">
                          Lessons: {module.lessons?.length || 0}
                        </small>
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
