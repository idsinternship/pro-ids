import { useState } from "react";
import { createLesson } from "../../api/lessons";

interface Props {
  courseId: number;
}

export default function InstructorLessons({ courseId }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await createLesson({
      course_id: courseId,
      title,
      content,
      order: 1,
    });

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h3>Add Lesson</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={submit}>Add Lesson</button>
    </div>
  );
}