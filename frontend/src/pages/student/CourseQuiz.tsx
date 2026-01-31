import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface Quiz {
  id: number;
  title: string;
  passing_score: number;
  questions: Question[];
}

export default function CourseQuiz() {
  const { courseId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    passed: boolean;
    score_percentage: number;
  }>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`/api/quizzes/${courseId}`);
      setQuiz(res.data.data);
    };

    fetchQuiz();
  }, [courseId]);

  const toggleOption = (
    questionId: number,
    optionId: number
  ) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const submitQuiz = async () => {
    if (!quiz) return;

    setSubmitting(true);
    try {
      const res = await axios.post(
        `/api/quizzes/${quiz.id}/attempt`,
        { answers }
      );
      setResult(res.data.data);
    } finally {
      setSubmitting(false);
    }
  };

  if (!quiz) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading quiz…
      </div>
    );
  }

  if (result) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md w-full rounded-3xl p-8 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl text-center space-y-6">
          <h1 className="text-3xl font-bold">
            {result.passed ? "Passed 🎉" : "Not Passed"}
          </h1>

          <p className="text-zinc-400">
            Your score:{" "}
            <span className="font-semibold text-white">
              {result.score_percentage}%
            </span>
          </p>

          {result.passed ? (
            <a
              href={`/courses/${courseId}/certificate`}
              className="inline-block px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition"
            >
              View Certificate →
            </a>
          ) : (
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 rounded-xl border border-[var(--border)] text-zinc-300 hover:bg-white/5 transition"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {quiz.title}
        </h1>
        <p className="text-zinc-400 mt-1">
          Passing score: {quiz.passing_score}%
        </p>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-6">
        {quiz.questions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] backdrop-blur-xl space-y-4"
          >
            <div className="font-semibold">
              {index + 1}. {q.question}
            </div>

            <div className="space-y-2">
              {q.options.map((opt) => {
                const selected =
                  answers[q.id]?.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      toggleOption(q.id, opt.id)
                    }
                    className={`w-full text-left px-4 py-3 rounded-xl border transition
                      ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-[var(--border)] hover:bg-white/5"
                      }
                    `}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          onClick={submitQuiz}
          disabled={submitting}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}