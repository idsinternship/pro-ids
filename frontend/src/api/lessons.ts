import api from "./client";
import { CreateLessonPayload } from "../types/instructor";

export const createLesson = (data: CreateLessonPayload) =>
  api.post("/lessons", data);