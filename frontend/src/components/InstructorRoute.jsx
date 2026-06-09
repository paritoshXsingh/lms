import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function InstructorRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(user.split(".")[1]));

    if (payload.user.role !== "instructor") {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error(error);
    return <Navigate to="/login" replace />;
  }
}
