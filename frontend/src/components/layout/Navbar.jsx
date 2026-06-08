import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  let role = null;

  if (user) {
    const payload = JSON.parse(atob(user.split(".")[1]));
    role = payload.user.role;
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top shadow-sm">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          LearnHub
        </Link>

        {/* Toggle button (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left side */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                Courses
              </Link>
            </li>
          </ul>

          {/* Right side
          Conditionally render login/logout */}
          <ul className="navbar-nav">
            {user ? (
              <>
                {role === "student" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/learning">
                      My Learning
                    </NavLink>
                  </li>
                )}
                {role === "instructor" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/instructor">
                      Instructor Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn nav-link border-0 bg-transparent"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
