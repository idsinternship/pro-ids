import api from "./client";

export interface CreateCoursePayload {
  title: string;
  description?: string;
}

export const createCourse = async (data: CreateCoursePayload) => {
  const res = await api.post("/courses", data);
  return res.data;
};

export const getInstructorCourses = async () => {
  const res = await api.get("/instructor/courses");
  return res.data;
};

export const publishCourse = async (courseId: number) => {
  const res = await api.post(`/courses/${courseId}/publish`);
  return res.data;
};