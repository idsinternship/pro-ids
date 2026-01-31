import { useEffect, useState } from "react";
import axios from "axios";

interface QuizPerformance {
  quiz_id: number;
  title: string;
  avg_score: number;
}

interface AnalyticsResponse {
  top_quizzes: QuizPerformance[];
  low_quizzes: QuizPerformance[];
}

export default function CourseAnalytics() {
  const [data, setData] =
    useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "/api/instructor/analytics"
        );
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading analytics…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-red-400">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Course Analytics
        </h1>
        <p className="text-zinc-400 mt-1">
          Quiz performance across your courses
        </p>
      </div>

      {/* TOP QUIZZES */}
      <AnalyticsSection
        title="Top Performing Quizzes"
        subtitle="Students are mastering these"
        quizzes={data.top_quizzes}
        accent="emerald"
      />

      {/* LOW QUIZZES */}
      <AnalyticsSection
        title="Low Performing Quizzes"
        subtitle="These may need improvement"
        quizzes={data.low_quizzes}
        accent="rose"
      />
    </div>
  );
}

function AnalyticsSection({
  title,
  subtitle,
  quizzes,
  accent,
}: {
  title: string;
  subtitle: string;
  quizzes: QuizPerformance[];
  accent: "emerald" | "rose";
}) {
  if (quizzes.length === 0) {
    return (
      <div className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] text-zinc-400">
        No data available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
        <p className="text-zinc-400 text-sm">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quiz_id}
            className={`flex items-center justify-between rounded-2xl p-5 border backdrop-blur-xl
              ${
                accent === "emerald"
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : "border-rose-400/30 bg-rose-400/10"
              }
            `}
          >
            <div>
              <div className="font-semibold">
                {quiz.title}
              </div>
              <div className="text-sm text-zinc-400">
                Quiz ID #{quiz.quiz_id}
              </div>
            </div>

            <div className="text-2xl font-bold">
              {quiz.avg_score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}