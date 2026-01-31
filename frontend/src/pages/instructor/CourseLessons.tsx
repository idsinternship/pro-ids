import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Lesson {
  id: number;
  title: string;
  order: number;
  published: boolean;
}

interface CourseLessonsResponse {
  course: {
    id: number;
    title: string;
  };
  lessons: Lesson[];
}

export default function InstructorCourseLessons() {
  const { courseId } = useParams();
  const [data, setData] =
    useState<CourseLessonsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `/api/instructor/courses/${courseId}/lessons`
        );
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const createLesson = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);
    try {
      const res = await axios.post(
        `/api/instructor/courses/${courseId}/lessons`,
        { title: newTitle }
      );

      setData((prev) =>
        prev
          ? {
              ...prev,
              lessons: [...prev.lessons, res.data.data],
            }
          : prev
      );

      setNewTitle("");
    } finally {
      setCreating(false);
    }
  };

  const togglePublish = async (lesson: Lesson) => {
    await axios.post(
      `/api/instructor/lessons/${lesson.id}/toggle`
    );

    setData((prev) =>
      prev
        ? {
            ...prev,
            lessons: prev.lessons.map((l) =>
              l.id === lesson.id
                ? { ...l, published: !l.published }
                : l
            ),
          }
        : prev
    );
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

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {data.course.title}
        </h1>
        <p className="text-zinc-400 mt-1">
          Manage lesson structure
        </p>
      </div>

      {/* CREATE */}
      <div className="flex gap-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New lesson title"
          className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-[var(--border)] outline-none"
        />
        <button
          onClick={createLesson}
          disabled={creating}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {creating ? "Adding…" : "Add Lesson"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-2xl p-5 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">
                {lesson.title}
              </div>
              <div className="text-sm text-zinc-400">
                Order #{lesson.order}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePublish(lesson)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                  ${
                    lesson.published
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-zinc-400/20 text-zinc-300"
                  }
                `}
              >
                {lesson.published
                  ? "Published"
                  : "Draft"}
              </button>
            </div>
          </div>
        ))}

        {data.lessons.length === 0 && (
          <div className="rounded-2xl p-10 bg-[var(--panel)] border border-[var(--border)] text-center text-zinc-400">
            No lessons yet. Add your first lesson.
          </div>
        )}
      </div>
    </div>
  );
}