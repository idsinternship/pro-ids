// frontend/src/pages/student/QuizTake.tsx
// FULL FILE – eslint-safe (no `any`)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

/* ================= TYPES ================= */

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  multiple: boolean;
  options: Option[];
}

interface Quiz {
  id: number;
  title: string;
  passing_score: number;
  questions: Question[];
}

interface QuizResult {
  score: number;
  passed: boolean;
}

interface AttemptErrorResponse {
  message?: string;
}

/* ================= PAGE ================= */

export default function QuizTake() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  /* ================= LOAD QUIZ ================= */

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get<Quiz>(`/api/quizzes/${quizId}`);
      setQuiz(res.data);
      setLoading(false);
    };

    fetchQuiz();
  }, [quizId]);

  /* ================= ANSWERS ================= */

  const toggleOption = (question: Question, optionId: number) => {
    setAnswers((prev) => {
      const current = prev[question.id] || [];

      if (question.multiple) {
        return {
          ...prev,
          [question.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }

      return {
        ...prev,
        [question.id]: [optionId],
      };
    });
  };

  /* ================= SUBMIT ================= */

  const submitQuiz = async () => {
    if (!quiz) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload = quiz.questions.map((q) => ({
        question_id: q.id,
        selected_option_ids: answers[q.id] || [],
      }));

      const res = await axios.post<QuizResult>(
        `/api/student/quizzes/${quiz.id}/attempt`,
        { answers: payload }
      );

      setResult(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<AttemptErrorResponse>;
        setError(
          axiosErr.response?.data?.message ||
            "Quiz submission failed."
        );
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= RENDER ================= */

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading quiz…
      </div>
    );
  }

  if (!quiz) return null;

  if (result) {
    return (
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-bold">Quiz Result</h1>

        <div className="text-5xl font-bold">{result.score}%</div>

        <div
          className={`text-xl font-semibold ${
            result.passed
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {result.passed ? "PASSED" : "FAILED"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <p className="text-zinc-400">
          Passing score: {quiz.passing_score}%
        </p>
      </div>

      {quiz.questions.map((q, index) => (
        <div
          key={q.id}
          className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] space-y-4"
        >
          <h2 className="font-semibold">
            {index + 1}. {q.text}
          </h2>

          <div className="space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type={q.multiple ? "checkbox" : "radio"}
                  checked={
                    answers[q.id]?.includes(opt.id) ?? false
                  }
                  onChange={() =>
                    toggleOption(q, opt.id)
                  }
                />
                <span>{opt.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div className="text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={submitQuiz}
        disabled={submitting}
        className="px-8 py-4 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110 disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit Quiz"}
      </button>
    </div>
  );
}