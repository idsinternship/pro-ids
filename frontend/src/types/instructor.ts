export interface Course {
  id: number;
  title: string;
  description?: string | null;
  published: boolean;
  lessons_count?: number;
  quizzes_count?: number;
}

export interface CreateCoursePayload {
  title: string;
  description?: string;
}

export interface CreateLessonPayload {
  course_id: number;
  title: string;
  content?: string;
  video_url?: string;
  order: number;
}

export interface CreateQuizPayload {
  course_id: number;
  lesson_id?: number;
  title: string;
  passing_score: number;
  time_limit?: number;
}