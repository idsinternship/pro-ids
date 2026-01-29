import { useNavigate } from "react-router-dom";

type Props = {
  image: string;
  level: "BEGINNER" | "INTERMEDIATE";
  category: string;
  title: string;
  description: string;
  students: number;
  hours: number;
  progress: number;
};

export default function CourseCard({
  image,
  level,
  category,
  title,
  description,
  students,
  hours,
  progress,
}: Props) {
  const navigate = useNavigate();

  function handleClick() {
    // UI-only navigation for now
    navigate("/course/1/lesson/1");
  }

  return (
    <div
      onClick={handleClick}
      style={{
        background: "white",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.06)";
      }}
    >
      {/* IMAGE */}
      <div style={{ position: "relative" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: 180, objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "#2f66e6",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {level}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 18 }}>
        <div
          style={{
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          {category.toUpperCase()}
        </div>

        <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>

        <div
          style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 14,
          }}
        >
          {description}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: "#64748b",
            marginBottom: 10,
          }}
        >
          <span>👥 {students}</span>
          <span>⏱ {hours} Hours</span>
        </div>

        {/* PROGRESS */}
        <div
          style={{
            height: 6,
            background: "#e5e7eb",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#2f66e6",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#2f66e6",
          }}
        >
          Progress {progress}%
        </div>
      </div>
    </div>
  );
}
