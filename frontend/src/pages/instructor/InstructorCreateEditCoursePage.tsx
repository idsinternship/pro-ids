import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/courses";

export default function InstructorCreateEditCoursePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Course title is required");
      return;
    }

    try {
      setSubmitting(true);
      await createCourse({
        title,
        description,
      });

      navigate("/instructor/courses");
    } catch{
      setError("Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Create Course</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
            rows={4}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}