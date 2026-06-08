export default function InstructorDashboard() {
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

                <button className="btn btn-primary">Create Course</button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4>My Courses</h4>
                <p className="text-muted">
                  View and manage your published courses.
                </p>

                <button className="btn btn-outline-primary">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
