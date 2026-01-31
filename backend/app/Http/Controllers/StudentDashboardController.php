<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use App\Models\QuizAttempt;

class StudentDashboardController extends Controller
{
    /**
     * Student dashboard summary
     */
    public function index()
    {
        $user = Auth::guard('api')->user();

        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Only students can access this dashboard'
            ], 403);
        }

        $enrolledCourses = Enrollment::where('user_id', $user->id)->count();

        $completedLessons = LessonProgress::where('user_id', $user->id)
            ->distinct('lesson_id')
            ->count('lesson_id');

        // Best attempt per quiz, then average
        $averageScore = QuizAttempt::where('user_id', $user->id)
            ->selectRaw('MAX(score) as score')
            ->groupBy('quiz_id')
            ->get()
            ->avg('score');

        return response()->json([
            'success' => true,
            'data' => [
                'enrolled_courses' => $enrolledCourses,
                'completed_lessons' => $completedLessons,
                'average_quiz_score' => round($averageScore ?? 0, 2),
            ]
        ]);
    }
}