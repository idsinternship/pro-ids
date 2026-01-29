import { useState } from "react";
import AppLayout from "../layout/AppLayout";

type SyllabusItem = {
  id: number;
  title: string;
  type: "VIDEO" | "TEXT" | "QUIZ";
};

const COURSE_TITLE = "Fullstack Web Development with React";
const STUDENT_NAME = "John Doe";

const syllabus: SyllabusItem[] = [
  { id: 1, title: "Introduction to React", type: "VIDEO" },
  { id: 2, title: "Understanding Hooks", type: "TEXT" },
  { id: 3, title: "React Fundamentals Quiz", type: "QUIZ" },
];

export default function CourseLessonPage() {
  const [activeId, setActiveId] = useState(1);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const activeItem = syllabus.find((s) => s.id === activeId)!;
  const quizPassed = quizScore !== null && quizScore >= 70;

  function goBackToLesson() {
    setQuizSubmitted(false);
    setQuizScore(null);
    setActiveId(1);
  }

  function submitQuiz() {
    const mockScore = 85; // mock grading
    setQuizScore(mockScore);
    setQuizSubmitted(true);

    if (mockScore >= 70) {
      generateCertificateOnce();
    }
  }

  function generateCertificateOnce() {
    const existing = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const alreadyIssued = existing.some(
      (c: any) => c.courseTitle === COURSE_TITLE
    );

    if (alreadyIssued) return;

    localStorage.setItem(
      "certificates",
      JSON.stringify([
        ...existing,
        {
          id: crypto.randomUUID(),
          courseTitle: COURSE_TITLE,
          studentName: STUDENT_NAME,
          issuedAt: new Date().toLocaleDateString(),
        },
      ])
    );
  }

  return (
    <AppLayout title="Welcome Back">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 24,
        }}
      >
        {/* MAIN */}
        <div>
          {/* HEADER */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                ← {COURSE_TITLE}
              </div>
              <div style={{ fontSize: 14, color: "#64748b" }}>
                Instructor: Sarah Jenkins
              </div>
            </div>

            <button
              style={{
                background: "#2f66e6",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Mark Complete
            </button>
          </div>

          {/* LESSON CONTENT */}
          {activeItem.type !== "QUIZ" && (
            <>
              <div
                style={{
                  background: "#222",
                  borderRadius: 18,
                  height: 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  marginBottom: 20,
                }}
              >
                Video / Lesson Content
              </div>

              <h2 style={{ marginBottom: 32 }}>{activeItem.title}</h2>
            </>
          )}

          {/* QUIZ */}
          {activeId === 3 && (
            <div
              style={{
                background: "white",
                borderRadius: 18,
                padding: 24,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: 16 }}>
                📝 React Fundamentals Quiz
              </h3>

              {!quizSubmitted ? (
                <>
                  <QuizQuestion
                    question="What is React primarily used for?"
                    options={[
                      "Database management",
                      "Building user interfaces",
                      "Styling websites",
                      "Server deployment",
                    ]}
                  />

                  <QuizQuestion
                    question="Which hook manages state?"
                    options={[
                      "useFetch",
                      "useData",
                      "useState",
                      "useEffect",
                    ]}
                  />

                  <button
                    onClick={submitQuiz}
                    style={{
                      marginTop: 20,
                      background: "#2f66e6",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: 12,
                      fontWeight: 600,
                    }}
                  >
                    Submit Quiz
                  </button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      background: quizPassed ? "#f0fdf4" : "#fef2f2",
                      border: `1px solid ${
                        quizPassed ? "#bbf7d0" : "#fecaca"
                      }`,
                      color: quizPassed ? "#166534" : "#991b1b",
                      padding: 16,
                      borderRadius: 12,
                      marginBottom: 20,
                      fontWeight: 600,
                    }}
                  >
                    {quizPassed ? "✅ Passed" : "❌ Failed"} — Score:{" "}
                    {quizScore}%
                    {quizPassed && (
                      <div style={{ marginTop: 6, fontWeight: 500 }}>
                        Certificate issued for this course
                      </div>
                    )}
                  </div>

                  <button
                    onClick={goBackToLesson}
                    style={{
                      background: "#e5e7eb",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 12,
                      fontWeight: 600,
                    }}
                  >
                    ← Back to Lesson
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {quizSubmitted && (
  <div style={{ marginTop: 20 }}>
    <h4>Answer Review</h4>

    <div style={{ fontSize: 14, marginTop: 8 }}>
      <strong>Q:</strong> What is React primarily used for?
      <br />
      <span style={{ color: "#991b1b" }}>
        Your answer: Database management ❌
      </span>
      <br />
      <span style={{ color: "#166534" }}>
        Correct answer: Building user interfaces ✅
      </span>
    </div>

    <div style={{ fontSize: 14, marginTop: 12 }}>
      <strong>Q:</strong> Which hook manages state?
      <br />
      <span style={{ color: "#166534" }}>
        Your answer: useState ✅
      </span>
    </div>
  </div>
)}


        {/* SYLLABUS */}
        <aside
          style={{
            background: "white",
            borderRadius: 18,
            padding: 20,
            height: "fit-content",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            Syllabus
          </div>

          {syllabus.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveId(item.id);
                setQuizSubmitted(false);
                setQuizScore(null);
              }}
              style={{
                padding: 12,
                borderRadius: 12,
                background:
                  activeId === item.id ? "#f1f5f9" : "transparent",
                marginBottom: 6,
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                {index + 1}. {item.title}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color:
                    item.type === "QUIZ"
                      ? "#f97316"
                      : "#64748b",
                }}
              >
                {item.type === "QUIZ"
                  ? "ASSESSMENT AVAILABLE"
                  : item.type}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </AppLayout>
  );
}

/* ---------- QUIZ QUESTION ---------- */

function QuizQuestion({
  question,
  options,
}: {
  question: string;
  options: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      style={{
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 10 }}>
        {question}
      </div>

      {options.map((opt) => (
        <label
          key={opt}
          style={{
            display: "block",
            padding: "8px 12px",
            borderRadius: 10,
            border:
              selected === opt
                ? "2px solid #2f66e6"
                : "1px solid #e5e7eb",
            marginBottom: 8,
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            style={{ marginRight: 8 }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
