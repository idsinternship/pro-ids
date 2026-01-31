<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LessonCompletion;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Support\Facades\Auth;

class StudentDashboardController extends Controller
{
    /**
     * Aggregated dashboard for the logged-in student.
     */
    public function index()
    {
        $user = Auth::user();

        // Get enrolled courses
        $enrollments = Enrollment::where('user_id', $user->id)
            ->with('course.lessons')
            ->get();

        $dashboardCourses = [];

        foreach ($enrollments as $enrollment) {
            $course = $enrollment->course;

            // Lessons
            $lessonIds = $course->lessons->pluck('id');
            $completedLessons = LessonCompletion::where('user_id', $user->id)
                ->whereIn('lesson_id', $lessonIds)
                ->pluck('lesson_id');

            $lessonsTotal = $lessonIds->count();
            $lessonsCompleted = $completedLessons->count();

            // Last accessed lesson (best approximation)
            $lastLessonId = LessonCompletion::where('user_id', $user->id)
                ->whereIn('lesson_id', $lessonIds)
                ->orderByDesc('completed_at')
                ->value('lesson_id');

            // Quizzes
            $quizIds = Quiz::where('course_id', $course->id)
                ->orWhereIn('lesson_id', $lessonIds)
                ->pluck('id');

            $quizzesTotal = $quizIds->count();
            $quizzesPassed = 0;

            foreach ($quizIds as $quizId) {
                $quiz = Quiz::find($quizId);

                $bestAttempt = QuizAttempt::where('user_id', $user->id)
                    ->where('quiz_id', $quizId)
                    ->orderByDesc('score')
                    ->first();

                if ($bestAttempt && $bestAttempt->score >= $quiz->passing_score) {
                    $quizzesPassed++;
                }
            }

            // Completion logic (must match ProgressController)
            $completed =
                $lessonsCompleted === $lessonsTotal &&
                $quizzesPassed === $quizzesTotal;

            $totalUnits = $lessonsTotal + $quizzesTotal;
            $completedUnits = $lessonsCompleted + $quizzesPassed;

            $percentage = $totalUnits > 0
                ? round(($completedUnits / $totalUnits) * 100, 2)
                : 0;

            $dashboardCourses[] = [
                'course_id' => $course->id,
                'title' => $course->title,
                'thumbnail' => $course->thumbnail,
                'percentage' => $percentage,
                'completed' => $completed,
                'eligible_for_certificate' => $completed,
                'lessons' => [
                    'total' => $lessonsTotal,
                    'completed' => $lessonsCompleted,
                ],
                'quizzes' => [
                    'total' => $quizzesTotal,
                    'passed' => $quizzesPassed,
                ],
                'last_lesson_id' => $lastLessonId,
            ];
        }

        return response()->json([
            'student_id' => $user->id,
            'courses' => $dashboardCourses,
        ]);
    }
}