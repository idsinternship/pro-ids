import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface CertificateData {
  course_title: string;
  student_name: string;
  issued_at: string;
}

interface ApiErrorResponse {
  message?: string;
}

export default function Certificate() {
  const { courseId } = useParams();
  const [data, setData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(
          `/api/certificate/${courseId}`
        );
        setData(res.data.data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          const apiError =
            err.response?.data as ApiErrorResponse | undefined;

          setError(
            apiError?.message ??
              "Certificate not available"
          );
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [courseId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Preparing your certificate…
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md w-full rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl text-center space-y-4">
          <h1 className="text-xl font-semibold">
            Certificate Locked
          </h1>
          <p className="text-zinc-400">
            {error}
          </p>
          <a
            href={`/courses/${courseId}/lessons`}
            className="inline-block px-5 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
          >
            Back to Course →
          </a>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-2xl w-full rounded-3xl p-10 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl text-center space-y-8">
        {/* TITLE */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Certificate of Completion
          </h1>
          <p className="text-zinc-400 mt-2">
            This certifies that
          </p>
        </div>

        {/* NAME */}
        <div className="text-3xl font-semibold">
          {data.student_name}
        </div>

        {/* COURSE */}
        <div className="text-zinc-400">
          has successfully completed the course
        </div>

        <div className="text-2xl font-semibold">
          {data.course_title}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-8 text-sm text-zinc-500">
          <span>
            Issued on{" "}
            {new Date(
              data.issued_at
            ).toLocaleDateString()}
          </span>

          <span className="tracking-widest">
            PRO•IDS
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
          >
            Print / Save PDF
          </button>

          <a
            href="/student"
            className="px-6 py-3 rounded-xl border border-[var(--border)] text-zinc-300 hover:bg-white/5 transition"
          >
            Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}