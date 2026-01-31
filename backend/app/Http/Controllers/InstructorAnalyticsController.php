<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\QuizAttempt;
use App\Models\Certificate;
use Illuminate\Support\Facades\Auth;

class InstructorAnalyticsController extends Controller
{
    /**
     * Overall instructor dashboard
     */
    public function dashboard()
    {
        $instructorId = Auth::id();

        $courses = Course::where('instructor_id', $instructorId)->get();

        return response()->json([
            'courses_count' => $courses->count(),
            'course_ids' => $courses->pluck('id'),
        ]);
    }

    /**
     * Per-course analytics
     */
    public function courseAnalytics(Course $course)
    {
        // Ownership check
        if ($course->instructor_id !== Auth::id()) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 403);
        }

        // Students
        $enrolled = Enrollment::where('course_id', $course->id)->count();

        // Lessons
        $totalLessons = Lesson::where('course_id', $course->id)->count();

        $completedStudents = LessonProgress::whereHas(
            'lesson',
            fn ($q) => $q->where('course_id', $course->id)
        )
        ->where('completed', true)
        ->select('user_id')
        ->groupBy('user_id')
        ->havingRaw('COUNT(*) = ?', [$totalLessons])
        ->count();

        $completionRate = $enrolled > 0
            ? round(($completedStudents / $enrolled) * 100, 2)
            : 0;

        // Quiz analytics
        $quizAttempts = QuizAttempt::whereHas(
            'quiz',
            fn ($q) => $q->where('course_id', $course->id)
        )->get();

        $avgScore = round($quizAttempts->avg('score') ?? 0, 2);

        $passRate = $quizAttempts->count() > 0
            ? round(($quizAttempts->where('passed', true)->count() / $quizAttempts->count()) * 100, 2)
            : 0;

        // Certificates
        $certificates = Certificate::where('course_id', $course->id)->count();

        return response()->json([
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
            ],
            'students_enrolled' => $enrolled,
            'completion_rate_percent' => $completionRate,
            'average_quiz_score' => $avgScore,
            'quiz_pass_rate_percent' => $passRate,
            'certificates_issued' => $certificates,
        ]);
    }
}