import { useParams } from "react-router-dom";

export default function InstructorCoursePage() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h1>Manage Course</h1>

      <p>Course ID: {id}</p>
    </div>
  );
}