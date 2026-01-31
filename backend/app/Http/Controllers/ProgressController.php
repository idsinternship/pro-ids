<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\LessonCompletion;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    /**
     * Authoritative course progress aggregation.
     */
    public function courseProgress($courseId)
    {
        $user = Auth::user();

        $course = Course::with(['lessons', 'quizzes'])->findOrFail($courseId);

        // 1. Must be enrolled
        if (!$course->enrollments()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'error' => 'User is not enrolled in this course'
            ], 403);
        }

        // 2. Lessons progress
        $lessonIds = $course->lessons->pluck('id');

        $completedLessons = LessonCompletion::where('user_id', $user->id)
            ->whereIn('lesson_id', $lessonIds)
            ->pluck('lesson_id');

        $lessonsTotal = $lessonIds->count();
        $lessonsCompleted = $completedLessons->count();

        // 3. Quizzes (course-level + lesson-level)
        $quizIds = Quiz::where('course_id', $course->id)
            ->orWhereIn('lesson_id', $lessonIds)
            ->pluck('id');

        $quizzesTotal = $quizIds->count();

        $quizzesPassed = 0;
        $quizDetails = [];

        foreach ($quizIds as $quizId) {
            $quiz = Quiz::find($quizId);

            $bestAttempt = QuizAttempt::where('user_id', $user->id)
                ->where('quiz_id', $quizId)
                ->orderByDesc('score')
                ->first();

            $passed = $bestAttempt && $bestAttempt->score >= $quiz->passing_score;

            if ($passed) {
                $quizzesPassed++;
            }

            $quizDetails[] = [
                'quiz_id' => $quizId,
                'attempted' => (bool) $bestAttempt,
                'passed' => $passed,
                'best_score' => $bestAttempt?->score,
                'passing_score' => $quiz->passing_score,
            ];
        }

        // 4. Overall completion
        $lessonsComplete = ($lessonsCompleted === $lessonsTotal);
        $quizzesComplete = ($quizzesPassed === $quizzesTotal);

        $isCompleted = $lessonsComplete && $quizzesComplete;

        // Percentage (weighted: lessons + quizzes)
        $totalUnits = $lessonsTotal + $quizzesTotal;
        $completedUnits = $lessonsCompleted + $quizzesPassed;

        $percentage = $totalUnits > 0
            ? round(($completedUnits / $totalUnits) * 100, 2)
            : 0;

        return response()->json([
            'course_id' => $course->id,
            'lessons' => [
                'total' => $lessonsTotal,
                'completed' => $lessonsCompleted,
            ],
            'quizzes' => [
                'total' => $quizzesTotal,
                'passed' => $quizzesPassed,
                'details' => $quizDetails,
            ],
            'percentage' => $percentage,
            'completed' => $isCompleted,
            'eligible_for_certificate' => $isCompleted,
        ]);
    }
}