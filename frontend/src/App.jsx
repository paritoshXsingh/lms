import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Register from "./pages/Register.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LearningPage from "./pages/LearningPage.jsx";
import LessonPlayerPage from "./pages/LessonPlayerPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import InstructorCoursePage from "./pages/InstructorCoursePage.jsx";
import CheckOutPage from "./pages/CheckOutPage.jsx";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/learning/:id" element={<LessonPlayerPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/checkout/:id" element={<CheckOutPage />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route
              path="/instructor/course/:id"
              element={<InstructorCoursePage />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
