import api from "./client";
import { Course, CreateCoursePayload } from "../types/instructor";

export const createCourse = (data: CreateCoursePayload) =>
  api.post<Course>("/courses", data);

export const publishCourse = (courseId: number) =>
  api.post(`/courses/${courseId}/publish`);

export const getInstructorCourses = () =>
  api.get<Course[]>("/instructor/courses");