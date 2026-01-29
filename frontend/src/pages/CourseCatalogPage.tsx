import AppLayout from "../layout/AppLayout";
import CourseCard from "../components/catalog/CourseCard";

const mockCourses = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    level: "INTERMEDIATE" as const,
    category: "Development",
    title: "Fullstack Web Development with React",
    description: "Master modern web development from zero to hero.",
    students: 1240,
    hours: 24,
    progress: 0,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    level: "BEGINNER" as const,
    category: "Data Science",
    title: "Introduction to Data Science",
    description: "Learn Python, Pandas, and Data Visualization.",
    students: 850,
    hours: 18,
    progress: 0,
  },
];

export default function CourseCatalogPage() {
  return (
    <AppLayout title="Course Catalog">
      {/* SEARCH */}
      <div
        style={{
          background: "white",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        }}
      >
        <span>🔍</span>
        <input
          placeholder="What do you want to learn today?"
          style={{
            border: "none",
            outline: "none",
            fontSize: 15,
            width: "100%",
          }}
        />
      </div>
      {/* FILTERS */}
<div
  style={{
    display: "flex",
    gap: 12,
    marginBottom: 20,
  }}
>
  <select
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #e5e7eb",
    }}
  >
    <option>All Categories</option>
    <option>Development</option>
    <option>Data Science</option>
  </select>

  <select
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #e5e7eb",
    }}
  >
    <option>All Levels</option>
    <option>Beginner</option>
    <option>Intermediate</option>
  </select>
</div>


      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {mockCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </AppLayout>
  );
}
