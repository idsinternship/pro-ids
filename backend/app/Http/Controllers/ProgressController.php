<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function courseProgress($courseId)
    {
        $user = Auth::user();
        $course = Course::with(['lessons', 'quiz'])->findOrFail($courseId);

        $completedLessons = $course->lessons()
            ->whereHas('progress', fn ($q) =>
                $q->where('user_id', $user->id)
            )
            ->count();

        $totalLessons = $course->lessons()->count();

        $quizPassed = false;
        if ($course->quiz) {
            $quizPassed = $course->quiz->hasPassed($user->id);
        }

        return response()->json([
            'completed_lessons' => $completedLessons,
            'total_lessons' => $totalLessons,
            'quiz_passed' => $quizPassed,
        ]);
    }
}