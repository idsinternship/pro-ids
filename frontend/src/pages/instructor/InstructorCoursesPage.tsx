import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructorCourses } from "../../api/courses";

interface Course {
  id: number;
  title: string;
  published: boolean;
}

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getInstructorCourses();
      setCourses(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <h1>My Courses</h1>

      <Link to="/instructor/courses/new">
        <button>Create New Course</button>
      </Link>

      <ul style={{ marginTop: 20 }}>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong>{" "}
            {course.published ? "(Published)" : "(Draft)"}
          </li>
        ))}
      </ul>
    </div>
  );
}