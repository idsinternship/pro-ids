<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Support\Facades\Auth;

class InstructorDashboardController extends Controller
{
    /**
     * Aggregated analytics dashboard for instructor.
     */
    public function index()
    {
        $instructor = Auth::user();

        // Instructor courses
        $courses = Course::where('created_by', $instructor->id)->get();
        $courseIds = $courses->pluck('id');

        // Course count
        $courseCount = $courses->count();

        // Enrollment count (unique students across all courses)
        $totalEnrollments = Enrollment::whereIn('course_id', $courseIds)
            ->distinct('user_id')
            ->count('user_id');

        // Quizzes created under instructor courses
        $quizzes = Quiz::whereIn('course_id', $courseIds)->get();

        $quizStats = [];

        foreach ($quizzes as $quiz) {
            $attempts = QuizAttempt::where('quiz_id', $quiz->id)->get();

            if ($attempts->count() === 0) {
                continue;
            }

            $averageScore = round($attempts->avg('score'), 2);

            $quizStats[] = [
                'quiz_id' => $quiz->id,
                'title' => $quiz->title,
                'course_id' => $quiz->course_id,
                'attempts' => $attempts->count(),
                'average_score' => $averageScore,
                'passing_score' => $quiz->passing_score,
            ];
        }

        // Sort quizzes
        $topQuizzes = collect($quizStats)
            ->sortByDesc('average_score')
            ->take(5)
            ->values();

        $lowQuizzes = collect($quizStats)
            ->sortBy('average_score')
            ->take(5)
            ->values();

        return response()->json([
            'instructor_id' => $instructor->id,
            'courses_created' => $courseCount,
            'total_enrolled_students' => $totalEnrollments,
            'quiz_summary' => [
                'total_quizzes' => $quizzes->count(),
                'top_performing' => $topQuizzes,
                'low_performing' => $lowQuizzes,
            ],
        ]);
    }
}