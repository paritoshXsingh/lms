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
  const [lessonData, setLessonData] = useState({});
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

  const handleDeleteLesson = async (moduleId, lessonId) => {
    try {
      const response = await axios.delete(
        `/api/courses/${id}/modules/${moduleId}/lessons/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((module) =>
          module._id === moduleId ? response.data.module : module,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLesson = async (e, moduleId) => {
    e.preventDefault();

    try {
      const lesson = lessonData[moduleId];

      if (!lesson?.title || !lesson?.videoUrl) {
        return;
      }

      const response = await axios.post(
        `/api/courses/${id}/modules/${moduleId}/lessons`,
        {
          title: lesson.title,
          videoUrl: lesson.videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((module) =>
          module._id === moduleId ? response.data.module : module,
        ),
      }));

      setLessonData((prev) => ({
        ...prev,
        [moduleId]: {
          title: "",
          videoUrl: "",
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDeleteModule = async (moduleId) => {
    try {
      const response = await axios.delete(
        `/api/courses/${id}/modules/${moduleId}`,
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
    } catch (error) {
      console.error(error);
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

          <p className="text-muted mt-3 mb-4">{course.desc}</p>

          <div className="row g-3 mb-4">
            <div className="col-6 col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h4 className="fw-bold text-primary">
                    {course.modules?.length || 0}
                  </h4>
                  <small className="text-muted">Modules</small>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h4 className="fw-bold text-success">
                    {course.modules?.reduce(
                      (count, module) => count + (module.lessons?.length || 0),
                      0,
                    )}
                  </h4>
                  <small className="text-muted">Lessons</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h4 className="fw-bold text-warning">₹{course.price}</h4>
                  <small className="text-muted">Course Price</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Add Module */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="fw-bold">Create New Module</h4>

                <p className="text-muted">
                  Organize your lessons into structured modules.
                </p>

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
                  <div className="accordion" id="modulesAccordion">
                    {course.modules.map((module, index) => (
                      <div key={module._id} className="accordion-item">
                        <h2 className="accordion-header">
                          <div className="d-flex w-100 align-items-center">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#module-${module._id}`}
                            >
                              <div className="d-flex justify-content-between w-100 me-3">
                                <span>
                                  Module {index + 1}: {module.title}
                                </span>

                                <small className="text-muted">
                                  {module.lessons?.length || 0} lessons
                                </small>
                              </div>
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger me-2"
                              onClick={() => handleDeleteModule(module._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </h2>

                        <div
                          id={`module-${module._id}`}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body">
                            <p className="text-muted">
                              Lessons: {module.lessons?.length || 0}
                            </p>

                            {/* Existing Lessons */}

                            {module.lessons?.length > 0 && (
                              <div className="list-group mb-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <div
                                    key={lesson._id}
                                    className="list-group-item"
                                  >
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <div className="fw-semibold">
                                          Lesson {lessonIndex + 1}:{" "}
                                          {lesson.title}
                                        </div>

                                        <div>{lesson.title}</div>

                                        <small className="text-success">
                                          Video attached
                                        </small>
                                      </div>

                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          handleDeleteLesson(
                                            module._id,
                                            lesson._id,
                                          )
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Lesson Form */}

                            <form
                              onSubmit={(e) => handleAddLesson(e, module._id)}
                            >
                              <div className="mb-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Lesson Title"
                                  value={lessonData[module._id]?.title || ""}
                                  onChange={(e) =>
                                    setLessonData((prev) => ({
                                      ...prev,
                                      [module._id]: {
                                        ...prev[module._id],
                                        title: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              </div>

                              <div className="mb-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Video URL"
                                  value={lessonData[module._id]?.videoUrl || ""}
                                  onChange={(e) =>
                                    setLessonData((prev) => ({
                                      ...prev,
                                      [module._id]: {
                                        ...prev[module._id],
                                        videoUrl: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              </div>

                              <button
                                type="submit"
                                className="btn btn-success btn-sm"
                              >
                                Add Lesson
                              </button>
                            </form>
                          </div>
                        </div>
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
