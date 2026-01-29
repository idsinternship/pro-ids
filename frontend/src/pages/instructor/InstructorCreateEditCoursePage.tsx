import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* =======================
   TYPES
======================= */

type LessonType = "VIDEO" | "TEXT" | "QUIZ";

type Lesson = {
  id: string;
  title: string;
  type: LessonType;
};

/* =======================
   PAGE
======================= */

export default function InstructorCreateEditCoursePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEditMode = Boolean(id);

  /* ---------- COURSE META ---------- */
  const [title, setTitle] = useState(
    isEditMode
      ? "Fullstack Web Development with React"
      : ""
  );
  const [category, setCategory] = useState(
    isEditMode ? "Development" : ""
  );
  const [difficulty, setDifficulty] = useState(
    isEditMode ? "Intermediate" : ""
  );
  const [description, setDescription] = useState(
    isEditMode
      ? "Learn fullstack development using React, hooks, and modern tooling."
      : ""
  );

  /* ---------- SYLLABUS ---------- */
  const [lessons, setLessons] = useState<Lesson[]>(
    isEditMode
      ? [
          {
            id: "l1",
            title: "Introduction to React",
            type: "VIDEO",
          },
          {
            id: "l2",
            title: "Understanding Hooks",
            type: "TEXT",
          },
          {
            id: "l3",
            title: "Final Quiz",
            type: "QUIZ",
          },
        ]
      : []
  );

  /* =======================
     HANDLERS
  ======================= */

  function addLesson(type: LessonType) {
    setLessons((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: `New ${type} Lesson`,
        type,
      },
    ]);
  }

  function updateLessonTitle(
    lessonId: string,
    value: string
  ) {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId ? { ...l, title: value } : l
      )
    );
  }

  function removeLesson(lessonId: string) {
    setLessons((prev) =>
      prev.filter((l) => l.id !== lessonId)
    );
  }

  function handleSave() {
    // UI-only for now
    navigate("/instructor/courses");
  }

  function handleCancel() {
    navigate("/instructor/courses");
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div style={{ maxWidth: 900 }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 24,
        }}
      >
        {isEditMode ? "Edit Course" : "Create Course"}
      </h1>

      {/* ================= COURSE DETAILS ================= */}
      <Section title="Course Details">
        <Input
          label="Course Title"
          value={title}
          onChange={setTitle}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <Select
            label="Category"
            value={category}
            options={[
              "Development",
              "Data Science",
              "Design",
            ]}
            onChange={setCategory}
          />

          <Select
            label="Difficulty"
            value={difficulty}
            options={[
              "Beginner",
              "Intermediate",
              "Advanced",
            ]}
            onChange={setDifficulty}
          />
        </div>

        <Textarea
          label="Short Description"
          value={description}
          onChange={setDescription}
        />
      </Section>

      {/* ================= SYLLABUS ================= */}
      <Section title="Course Syllabus">
        {lessons.length === 0 && (
          <div
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 16,
            }}
          >
            No lessons yet. Add your first lesson below.
          </div>
        )}

        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 20 }}>
              {index + 1}
            </span>

            <input
              value={lesson.title}
              onChange={(e) =>
                updateLessonTitle(
                  lesson.id,
                  e.target.value
                )
              }
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
              }}
            />

            <LessonBadge lessonType={lesson.type} />

            <button
              onClick={() =>
                removeLesson(lesson.id)
              }
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                border: "none",
                padding: "8px 10px",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 16,
          }}
        >
          <AddLessonButton
            label="+ Video"
            onClick={() => addLesson("VIDEO")}
          />
          <AddLessonButton
            label="+ Text"
            onClick={() => addLesson("TEXT")}
          />
          <AddLessonButton
            label="+ Quiz"
            onClick={() => addLesson("QUIZ")}
          />
        </div>
      </Section>

      {/* ================= ACTIONS ================= */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleSave}
          style={{
            background: "#2f66e6",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          {isEditMode ? "Save Changes" : "Create Course"}
        </button>

        <button
          onClick={handleCancel}
          style={{
            background: "#e5e7eb",
            border: "none",
            padding: "12px 20px",
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* =======================
   UI HELPERS
======================= */

function Section(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <h3 style={{ marginBottom: 16 }}>
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}

function Input(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 14 }}>
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={(e) =>
          props.onChange(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          marginTop: 4,
        }}
      />
    </div>
  );
}

function Textarea(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 14 }}>
        {props.label}
      </label>
      <textarea
        value={props.value}
        onChange={(e) =>
          props.onChange(e.target.value)
        }
        rows={3}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          marginTop: 4,
        }}
      />
    </div>
  );
}

function Select(props: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ fontSize: 14 }}>
        {props.label}
      </label>
      <select
        value={props.value}
        onChange={(e) =>
          props.onChange(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          marginTop: 4,
        }}
      >
        <option value="">Select</option>
        {props.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function LessonBadge(props: {
  lessonType: LessonType;
}) {
  const color =
    props.lessonType === "VIDEO"
      ? "#2563eb"
      : props.lessonType === "TEXT"
      ? "#16a34a"
      : "#f97316";

  return (
    <span
      style={{
        background: `${color}22`,
        color,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {props.lessonType}
    </span>
  );
}

function AddLessonButton(props: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      style={{
        background: "#f1f5f9",
        border: "1px dashed #cbd5e1",
        padding: "10px 14px",
        borderRadius: 10,
        fontWeight: 600,
      }}
    >
      {props.label}
    </button>
  );
}
