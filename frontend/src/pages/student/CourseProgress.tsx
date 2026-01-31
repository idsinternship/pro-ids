import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ProgressResponse {
  completed_lessons: number;
  total_lessons: number;
  quiz_passed: boolean;
}

export default function CourseProgress() {
  const { courseId } = useParams();
  const [progress, setProgress] =
    useState<ProgressResponse | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await axios.get(
        `/api/progress/${courseId}`
      );
      setProgress(res.data);
    };

    fetchProgress();
  }, [courseId]);

  if (!progress) return null;

  return (
    <div className="space-y-6">
      <div>
        Lessons: {progress.completed_lessons} /{" "}
        {progress.total_lessons}
      </div>

      <div>
        Quiz:{" "}
        {progress.quiz_passed ? (
          <span className="text-emerald-400">
            Passed
          </span>
        ) : (
          <span className="text-red-400">
            Not passed
          </span>
        )}
      </div>

      {progress.quiz_passed && (
        <a
          href={`/api/certificate/${courseId}`}
          className="inline-block px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold"
        >
          Download Certificate
        </a>
      )}
    </div>
  );
}