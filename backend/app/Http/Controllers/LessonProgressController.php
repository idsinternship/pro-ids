<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class LessonProgressController extends Controller
{
    /**
     * Mark a lesson as completed by an enrolled student
     */
    public function complete($lessonId)
    {
        $user = Auth::guard('api')->user();

        // Defensive role check
        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Only students can complete lessons'
            ], 403);
        }

        $lesson = Lesson::with('course')->findOrFail($lessonId);

        // Ensure student is enrolled in the course
        $enrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $lesson->course_id)
            ->exists();

        if (! $enrolled) {
            return response()->json([
                'success' => false,
                'message' => 'You must be enrolled in the course to complete lessons'
            ], 403);
        }

        // Idempotent completion
        $progress = LessonProgress::firstOrCreate(
            [
                'user_id' => $user->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'completed' => true,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Lesson marked as completed',
            'data' => $progress
        ]);
    }
}