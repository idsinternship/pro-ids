import { useEffect, useState } from "react";
import { Course } from "../../types/instructor";
import {
  createCourse,
  publishCourse,
  getInstructorCourses,
} from "../../api/courses";

export default function InstructorCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getInstructorCourses();
      setCourses(res.data);
    })();
  }, []);

  const submit = async () => {
    await createCourse({ title });
    setTitle("");

    const res = await getInstructorCourses();
    setCourses(res.data);
  };

  return (
    <div>
      <h2>My Courses</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course title"
      />
      <button onClick={submit}>Create</button>

      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            {c.title} — {c.published ? "Published" : "Draft"}
            {!c.published && (
              <button onClick={() => publishCourse(c.id)}>
                Publish
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}