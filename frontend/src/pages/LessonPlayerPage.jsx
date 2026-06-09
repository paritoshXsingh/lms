import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";

const getFlattenedLessons = (modules = []) =>
  modules.flatMap((module, moduleIndex) =>
    (module.lessons || []).map((lesson, lessonIndex) => ({
      ...lesson,
      moduleTitle: module.title || `Module ${moduleIndex + 1}`,
      moduleIndex,
      lessonIndex,
      id:
        lesson._id ||
        `${module.title || "module"}-${lesson.title || "lesson"}-${moduleIndex}-${lessonIndex}`,
    })),
  );

const isEmbeddableVideo = (url = "") =>
  /youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/i.test(url);

const getEmbedUrl = (url = "") => {
  if (/youtube\.com\/watch\?v=/i.test(url)) {
    return url.replace("watch?v=", "embed/");
  }

  if (/youtu\.be\//i.test(url)) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (/vimeo\.com\//i.test(url) && !/player\.vimeo\.com/i.test(url)) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }

  return url;
};

export default function LessonPlayerPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`/api/courses/my-courses/${id}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        setCourse(response.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load this course right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const lessons = getFlattenedLessons(course?.modules);

  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ||
    lessons[0] ||
    null;

  const currentLessonIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLesson?.id,
  );

  const progressPercentage =
    lessons.length > 0
      ? Math.round(((currentLessonIndex + 1) / lessons.length) * 100)
      : 0;

  useEffect(() => {
    if (!activeLessonId && lessons.length > 0) {
      setActiveLessonId(lessons[0].id);
    }
  }, [activeLessonId, lessons]);

  if (loading) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="alert alert-light border text-center shadow-sm">
            Loading your lesson player...
          </div>
        </div>
      </section>
    );
  }

  if (error || !course) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="alert alert-danger shadow-sm">
            <h2 className="h5 fw-bold mb-2">Course unavailable</h2>
            <p className="mb-3">
              {error || "We could not open this course from your library."}
            </p>
            <Link to="/learning" className="btn btn-primary">
              Back to My Learning
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <Link
            to="/learning"
            className="text-decoration-none text-primary fw-semibold"
          >
            ← Back to My Learning
          </Link>

          <h1 className="fw-bold mt-3 mb-2">{course.title}</h1>

          <p className="text-muted mb-3">
            {course.desc ||
              "Your lessons will appear here once they are added."}
          </p>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span className="fw-semibold">Course Progress</span>

              <span>
                {lessons.length > 0
                  ? `${currentLessonIndex + 1} / ${lessons.length} Lessons`
                  : "0 Lessons"}
              </span>
            </div>

            <div className="progress mt-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${progressPercentage}%`,
                }}
              >
                {progressPercentage}%
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="ratio ratio-16x9 bg-dark rounded overflow-hidden mb-4">
                  {activeLesson?.videoUrl ? (
                    isEmbeddableVideo(activeLesson.videoUrl) ? (
                      <iframe
                        src={getEmbedUrl(activeLesson.videoUrl)}
                        title={activeLesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        controls
                        className="w-100 h-100"
                        src={activeLesson.videoUrl}
                      >
                        Your browser does not support video playback.
                      </video>
                    )
                  ) : (
                    <div className="d-flex align-items-center justify-content-center text-white text-center p-4">
                      <div>
                        <h2 className="h5 fw-bold">Lesson player prototype</h2>
                        <p className="mb-0 text-white-50">
                          Add a lesson video URL to start playing content here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <h2 className="h4 fw-bold mb-2">
                  {activeLesson?.title || "No lesson selected"}
                </h2>

                <p className="text-muted mb-3">
                  {activeLesson?.moduleTitle || "Course content"}
                </p>

                {activeLesson?.videoUrl && (
                  <a
                    href={activeLesson.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Watch Original Video
                  </a>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-3">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <div className="fw-semibold">
                      👨‍🏫 {course.instructor?.name || "Instructor"}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3 mb-md-0">
                    <div className="fw-semibold">
                      📚 {course.modules?.length || 0} Modules
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="fw-semibold">
                      🎬 {lessons.length} Lessons
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold mb-0">Course Content</h2>

                  <span className="badge bg-primary px-3 py-2">
                    {lessons.length} Lessons
                  </span>
                </div>

                {lessons.length === 0 ? (
                  <div className="alert alert-light border mb-0">
                    No lessons have been added to this course yet.
                  </div>
                ) : (
                  <div className="list-group">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`list-group-item list-group-item-action text-start ${
                          activeLesson?.id === lesson.id
                            ? "active border-primary"
                            : ""
                        }`}
                        onClick={() => setActiveLessonId(lesson.id)}
                      >
                        <div className="fw-semibold">
                          Lesson {index + 1}: {lesson.title}
                        </div>

                        <small
                          className={
                            activeLesson?.id === lesson.id
                              ? "text-white-50"
                              : "text-muted"
                          }
                        >
                          {lesson.moduleTitle}
                        </small>
                      </button>
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
