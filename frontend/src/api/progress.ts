import api from "./client";

export const getCourseProgress = async (courseId: number) => {
  const res = await api.get(`/courses/${courseId}/progress`);
  return res.data;
};