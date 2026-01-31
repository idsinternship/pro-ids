import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

interface CourseResponse {
  course: {
    id: number;
    title: string;
  };
  lessons: Lesson[];
}

export default function StudentCourseLessons() {
  const { courseId } = useParams();
  const [data, setData] = useState<CourseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `/api/courses/${courseId}/lessons`
        );
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const completeLesson = async (lessonId: number) => {
    setUpdating(lessonId);

    try {
      await axios.post(`/api/lessons/${lessonId}/complete`);

      setData((prev) =>
        prev
          ? {
              ...prev,
              lessons: prev.lessons.map((l) =>
                l.id === lessonId
                  ? { ...l, completed: true }
                  : l
              ),
            }
          : prev
      );
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading lessons…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-red-400">
        Failed to load lessons.
      </div>
    );
  }

  const completedCount = data.lessons.filter(
    (l) => l.completed
  ).length;

  const progress =
    data.lessons.length > 0
      ? Math.round(
          (completedCount / data.lessons.length) * 100
        )
      : 0;

  return (
    <div className="space-y-10">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {data.course.title}
        </h1>
        <p className="text-zinc-400 mt-1">
          {completedCount} of {data.lessons.length} lessons
          completed
        </p>
      </div>

      {/* ===== PROGRESS BAR ===== */}
      <div className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl">
        <div className="flex justify-between text-sm mb-2 text-zinc-400">
          <span>Course Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ===== LESSON TIMELINE ===== */}
      <div className="space-y-4">
        {data.lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl
              ${
                lesson.completed
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : "border-[var(--border)] bg-[var(--panel)]"
              }
            `}
          >
            {/* STEP INDICATOR */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${
                  lesson.completed
                    ? "bg-emerald-400 text-black"
                    : "bg-black/40 text-zinc-400"
                }
              `}
            >
              {index + 1}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <div className="font-semibold">
                {lesson.title}
              </div>
              <div className="text-sm text-zinc-400">
                {lesson.completed
                  ? "Completed"
                  : "Not completed"}
              </div>
            </div>

            {/* ACTION */}
            {!lesson.completed && (
              <button
                onClick={() => completeLesson(lesson.id)}
                disabled={updating === lesson.id}
                className="px-4 py-2 rounded-xl bg-[var(--accent)] text-black text-sm font-semibold hover:brightness-110 transition disabled:opacity-50"
              >
                {updating === lesson.id
                  ? "Saving…"
                  : "Mark Complete"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ===== NEXT STEP ===== */}
      {progress === 100 && (
        <div className="flex justify-end">
          <a
            href={`/courses/${courseId}/quiz`}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
          >
            Take Quiz →
          </a>
        </div>
      )}
    </div>
  );
}