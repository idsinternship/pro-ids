import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface DashboardData {
  enrolled_courses: number;
  completed_lessons: number;
  average_quiz_score: number;
}

interface ApiErrorResponse {
  message?: string;
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/student/dashboard");
        console.log("Dashboard API response:", res.data); // Debug log
        setData(res.data.data);
      } catch (err: unknown) {
        console.error("Failed to load dashboard:", err); // Debug log
        
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError<ApiErrorResponse>;
          setError(
            axiosErr.response?.data?.message || 
            axiosErr.message || 
            "Failed to load dashboard"
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading dashboard…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-10">
        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-zinc-400 mt-1">
            Your learning progress at a glance
          </p>
        </div>

        <div className="text-red-400 p-6 bg-red-400/10 border border-red-400/30 rounded-xl">
          <div className="font-semibold">Error loading dashboard</div>
          <div className="text-sm mt-1">{error || "Unknown error"}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Student Dashboard
        </h1>
        <p className="text-zinc-400 mt-1">
          Your learning progress at a glance
        </p>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          label="Enrolled Courses"
          value={data.enrolled_courses}
        />
        <KpiCard
          label="Lessons Completed"
          value={data.completed_lessons}
        />
        <KpiCard
          label="Avg Quiz Score"
          value={`${data.average_quiz_score}%`}
          accent
        />
      </div>

      {/* ===== PROGRESS PANEL ===== */}
      <div className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl">
        <h2 className="text-xl font-semibold mb-4">
          Momentum
        </h2>

        <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] transition-all"
            style={{
              width: `${Math.min(
                data.average_quiz_score,
                100
              )}%`,
            }}
          />
        </div>

        <p className="text-sm text-zinc-400 mt-2">
          Based on your quiz performance
        </p>
      </div>

      {/* ===== ACTION ===== */}
      <div className="flex justify-end">
        <a
          href="/student/courses"
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
        >
          Continue Learning →
        </a>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border backdrop-blur-xl
        ${
          accent
            ? "border-cyan-400/30 bg-cyan-400/10"
            : "border-[var(--border)] bg-[var(--panel)]"
        }
      `}
    >
      <div className="text-sm text-zinc-400">
        {label}
      </div>
      <div className="text-3xl font-bold mt-2">
        {value}
      </div>
    </div>
  );
}