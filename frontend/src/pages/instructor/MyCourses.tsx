import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  status: "draft" | "published";
  enrolled_students: number;
}

export default function InstructorCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "/api/instructor/courses"
        );
        setCourses(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading courses…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Courses
          </h1>
          <p className="text-zinc-400 mt-1">
            Manage and improve your courses
          </p>
        </div>

        <a
          href="/instructor/courses/new"
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
        >
          + New Course
        </a>
      </div>

      {/* COURSE LIST */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl flex items-center justify-between"
          >
            <div>
              <div className="text-xl font-semibold">
                {course.title}
              </div>

              <div className="flex gap-4 mt-1 text-sm text-zinc-400">
                <span>
                  {course.enrolled_students} students
                </span>
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs
                    ${
                      course.status === "published"
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-zinc-400/20 text-zinc-300"
                    }
                  `}
                >
                  {course.status}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <a
                href={`/instructor/courses/${course.id}/lessons`}
                className="px-4 py-2 rounded-xl border border-[var(--border)] text-zinc-300 hover:bg-white/5 transition"
              >
                Lessons
              </a>

              <a
                href={`/instructor/courses/${course.id}/quiz`}
                className="px-4 py-2 rounded-xl border border-[var(--border)] text-zinc-300 hover:bg-white/5 transition"
              >
                Quiz
              </a>

              <a
                href={`/instructor/courses/${course.id}/analytics`}
                className="px-4 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
              >
                Analytics →
              </a>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="rounded-2xl p-10 bg-[var(--panel)] border border-[var(--border)] text-center text-zinc-400">
            No courses yet. Create your first one.
          </div>
        )}
      </div>
    </div>
  );
}