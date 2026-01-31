import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  passing_score: number;
  published: boolean;
  questions: Question[];
}

export default function QuizBuilder() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(`/api/quizzes/${quizId}`).then((res) => {
      setQuiz(res.data);
    });
  }, [quizId]);

  const saveQuiz = async () => {
    if (!quiz) return;

    setSaving(true);
    await axios.put(`/api/quizzes/${quiz.id}`, {
      title: quiz.title,
      passing_score: quiz.passing_score,
      published: quiz.published,
    });
    setSaving(false);
  };

  const deleteQuestion = async (questionId: number) => {
    await axios.delete(`/api/questions/${questionId}`);
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.filter(
              (q) => q.id !== questionId
            ),
          }
        : prev
    );
  };

  if (!quiz) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <input
          className="text-3xl font-bold bg-transparent border-b"
          value={quiz.title}
          onChange={(e) =>
            setQuiz({ ...quiz, title: e.target.value })
          }
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={quiz.published}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                published: e.target.checked,
              })
            }
          />
          Published
        </label>
      </div>

      <div className="flex gap-4 items-center">
        <label className="font-semibold">
          Passing score (%)
        </label>
        <input
          type="number"
          min={0}
          max={100}
          value={quiz.passing_score}
          onChange={(e) =>
            setQuiz({
              ...quiz,
              passing_score: Number(e.target.value),
            })
          }
          className="w-24 border px-2 py-1 rounded"
        />
      </div>

      {quiz.questions.map((q, i) => (
        <div
          key={q.id}
          className="p-6 border rounded-xl space-y-3"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">
              {i + 1}. {q.text}
            </h3>
            <button
              onClick={() => deleteQuestion(q.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={saveQuiz}
        disabled={saving}
        className="px-6 py-3 bg-[var(--accent)] rounded-xl font-semibold"
      >
        {saving ? "Saving…" : "Save Quiz"}
      </button>
    </div>
  );
}