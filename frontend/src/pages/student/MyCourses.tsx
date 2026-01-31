import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";

interface Course {
  course_id: number;
  title: string;
  description: string;
  progress_percentage: number;
}

export default function MyCourses() {
  
  const { token } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://stunning-space-waddle-wrp4wxpqq5rc54r7-8000.app.github.dev/api/my-learning",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ SAFETY: always set an array
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setCourses(list);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading your courses…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Courses
        </h1>
        <p className="text-zinc-400 mt-1">
          Pick up where you left off
        </p>
      </div>

      {/* ===== COURSE GRID ===== */}
      {courses.length === 0 ? (
        <div className="text-zinc-400">
          You’re not enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.course_id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const completed = course.progress_percentage >= 100;

  return (
    <div className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-1">
          {course.title}
        </h2>
        <p className="text-sm text-zinc-400 line-clamp-2">
          {course.description}
        </p>
      </div>

      {/* ===== PROGRESS ===== */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-zinc-400 mb-1">
          <span>Progress</span>
          <span>{course.progress_percentage}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
          <div
            className={`h-full transition-all ${
              completed
                ? "bg-emerald-400"
                : "bg-[var(--accent)]"
            }`}
            style={{ width: `${course.progress_percentage}%` }}
          />
        </div>
      </div>

      {/* ===== ACTION ===== */}
      <a
        href={`/courses/${course.course_id}/lessons`}
        className={`mt-6 inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition
          ${
            completed
              ? "border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10"
              : "bg-[var(--accent)] text-black hover:brightness-110"
          }
        `}
      >
        {completed ? "Review Course →" : "Continue →"}
      </a>
    </div>
  );
}