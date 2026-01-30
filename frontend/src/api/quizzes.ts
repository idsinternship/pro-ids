import api from "./client";
import { CreateQuizPayload } from "../types/instructor";

export const createQuiz = (data: CreateQuizPayload) =>
  api.post("/quizzes", data);

export const createQuestion = (data: {
  quiz_id: number;
  question_text: string;
  question_type: "MCQ" | "MSQ" | "TF";
}) =>
  api.post("/quiz-questions", data);

export const createOption = (data: {
  question_id: number;
  answer_text: string;
  is_correct: boolean;
}) =>
  api.post("/quiz-options", data);