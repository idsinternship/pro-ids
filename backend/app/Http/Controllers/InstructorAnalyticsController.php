<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\QuizAttempt;
use App\Models\Course;

class InstructorAnalyticsController extends Controller
{
    /**
     * Instructor analytics: top & low performing quizzes
     */
    public function index()
    {
        $user = Auth::guard('api')->user();

        if ($user->role !== 'instructor') {
            return response()->json([
                'success' => false,
                'message' => 'Only instructors can access analytics'
            ], 403);
        }

        $courseIds = Course::where('created_by', $user->id)->pluck('id');

        $quizPerformance = QuizAttempt::whereIn('quiz_id', function ($q) use ($courseIds) {
                $q->select('id')->from('quizzes')->whereIn('course_id', $courseIds);
            })
            ->selectRaw('quiz_id, MAX(score) as best_score')
            ->groupBy('quiz_id');

        $topQuizzes = (clone $quizPerformance)
            ->orderBy('best_score', 'desc')
            ->take(5)
            ->get();

        $lowQuizzes = (clone $quizPerformance)
            ->orderBy('best_score', 'asc')
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'top_quizzes' => $topQuizzes,
                'low_quizzes' => $lowQuizzes,
            ]
        ]);
    }
}