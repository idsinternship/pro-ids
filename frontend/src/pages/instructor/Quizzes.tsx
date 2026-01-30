import { createQuiz, createQuestion, createOption } from "../../api/quizzes";

export default async function createFullQuiz(courseId: number) {
  const quiz = await createQuiz({
    course_id: courseId,
    title: "Sample Quiz",
    passing_score: 60,
    time_limit: 10,
  });

  const question = await createQuestion({
    quiz_id: quiz.data.id,
    question_text: "2 + 2 = ?",
    question_type: "MCQ",
  });

  await createOption({
    question_id: question.data.id,
    answer_text: "4",
    is_correct: true,
  });

  await createOption({
    question_id: question.data.id,
    answer_text: "5",
    is_correct: false,
  });
}