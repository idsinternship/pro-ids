import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* ================= TYPES ================= */

interface Option {
  id: number;
  text: string;
  is_correct: boolean;
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
  published: boolean;
  questions: Question[];
}

/* ================= PAGE ================= */

export default function CourseQuizBuilder() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(
        `/api/instructor/courses/${courseId}/quiz`
      );
      setQuiz(res.data.data);
      setLoading(false);
    };

    fetchQuiz();
  }, [courseId]);

  /* ================= VALIDATION ================= */

  const validationErrors = useMemo(() => {
    if (!quiz) return [];

    const errors: string[] = [];

    if (quiz.questions.length === 0) {
      errors.push("Quiz must contain at least one question.");
    }

    quiz.questions.forEach((q, qi) => {
      if (!q.text.trim()) {
        errors.push(`Question ${qi + 1}: text is required.`);
      }

      if (q.options.length < 2) {
        errors.push(
          `Question ${qi + 1}: must have at least 2 options.`
        );
      }

      const correctCount = q.options.filter(
        (o) => o.is_correct
      ).length;

      if (correctCount === 0) {
        errors.push(
          `Question ${qi + 1}: must have at least one correct option.`
        );
      }

      if (!q.multiple && correctCount > 1) {
        errors.push(
          `Question ${qi + 1}: only one correct option allowed.`
        );
      }
    });

    return errors;
  }, [quiz]);

  const canPublish = validationErrors.length === 0;

  /* ================= HELPERS ================= */

  const updateQuestion = (id: number, patch: Partial<Question>) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) =>
              q.id === id ? { ...q, ...patch } : q
            ),
          }
        : prev
    );
  };

  const toggleCorrect = (questionId: number, optionId: number) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) => {
              if (q.id !== questionId) return q;

              return {
                ...q,
                options: q.options.map((o) => {
                  if (q.multiple) {
                    return o.id === optionId
                      ? { ...o, is_correct: !o.is_correct }
                      : o;
                  }

                  return {
                    ...o,
                    is_correct: o.id === optionId,
                  };
                }),
              };
            }),
          }
        : prev
    );
  };

  const updateOptionText = (
    questionId: number,
    optionId: number,
    text: string
  ) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    options: q.options.map((o) =>
                      o.id === optionId ? { ...o, text } : o
                    ),
                  }
                : q
            ),
          }
        : prev
    );
  };

  const addOption = (questionId: number) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    options: [
                      ...q.options,
                      {
                        id: Date.now(),
                        text: "New option",
                        is_correct: false,
                      },
                    ],
                  }
                : q
            ),
          }
        : prev
    );
  };

  const deleteOption = (
    questionId: number,
    optionId: number
  ) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    options:
                      q.options.length > 1
                        ? q.options.filter(
                            (o) => o.id !== optionId
                          )
                        : q.options,
                  }
                : q
            ),
          }
        : prev
    );
  };

  const addQuestion = async () => {
    const res = await axios.post("/api/instructor/questions", {
      course_id: courseId,
      text: "New question",
      multiple: false,
    });

    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: [...prev.questions, res.data.data],
          }
        : prev
    );
  };

  /* ================= SAVE ================= */

  const saveQuiz = async (publish: boolean) => {
    if (!quiz) return;

    if (publish && !canPublish) {
      setError("Fix validation errors before publishing.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await axios.post(
        `/api/instructor/quizzes/${quiz.id}/save`,
        {
          questions: quiz.questions,
          publish,
        }
      );

      setQuiz({ ...quiz, published: publish });
    } catch {
      setError("Failed to save quiz.");
    } finally {
      setSaving(false);
    }
  };

  /* ================= RENDER ================= */

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading quiz builder…
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Quiz Builder
          </h1>
          <p className="text-zinc-400">
            Build and manage your quiz
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-xl text-sm
            ${
              quiz.published
                ? "bg-emerald-400/20 text-emerald-300"
                : "bg-zinc-400/20 text-zinc-300"
            }`}
        >
          {quiz.published ? "Published" : "Draft"}
        </span>
      </div>

      {/* VALIDATION */}
      {!canPublish && (
        <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/20 text-sm space-y-1">
          {validationErrors.map((e, i) => (
            <div key={i}>• {e}</div>
          ))}
        </div>
      )}

      {/* QUESTIONS */}
      <div className="space-y-6">
        {quiz.questions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-2xl p-6 bg-[var(--panel)] border border-[var(--border)] space-y-4"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">
                Question {index + 1}
              </h2>

              <label className="flex gap-2 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={q.multiple}
                  onChange={(e) =>
                    updateQuestion(q.id, {
                      multiple: e.target.checked,
                      options: q.options.map((o) => ({
                        ...o,
                        is_correct: false,
                      })),
                    })
                  }
                />
                Multiple correct
              </label>
            </div>

            <textarea
              value={q.text}
              onChange={(e) =>
                updateQuestion(q.id, { text: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[var(--border)]"
            />

            <div className="space-y-2">
              {q.options.map((opt) => (
                <div
                  key={opt.id}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={opt.is_correct}
                    onChange={() =>
                      toggleCorrect(q.id, opt.id)
                    }
                  />

                  <input
                    value={opt.text}
                    onChange={(e) =>
                      updateOptionText(
                        q.id,
                        opt.id,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-[var(--border)]"
                  />

                  <button
                    onClick={() =>
                      deleteOption(q.id, opt.id)
                    }
                    className="text-zinc-500 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={() => addOption(q.id)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                + Add Option
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between">
        <button
          onClick={addQuestion}
          className="px-6 py-3 rounded-xl border border-[var(--border)] text-zinc-300"
        >
          + Add Question
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => saveQuiz(false)}
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-[var(--border)] text-zinc-300"
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>

          <button
            onClick={() => saveQuiz(true)}
            disabled={!canPublish || saving}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold disabled:opacity-40"
          >
            Publish Quiz
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}