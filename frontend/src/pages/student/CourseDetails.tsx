import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import { getCourseProgress } from "../../api/progress";

export default function CourseDetails() {
  const { id } = useParams();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const res = await getCourseProgress(Number(id));
      setProgress(res.overall_progress);
    })();
  }, [id]);

  return (
    <div>
      <h2>Course Progress</h2>
      <ProgressBar value={progress} />
    </div>
  );
}