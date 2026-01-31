<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Support\Facades\Auth;

class LessonProgressController extends Controller
{
    public function complete(Lesson $lesson)
    {
        $progress = LessonProgress::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'lesson_id' => $lesson->id,
            ],
            [
                'completed' => true,
                'completed_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Lesson completed',
            'progress' => $progress,
        ]);
    }

    public function courseProgress($courseId)
    {
        $totalLessons = Lesson::where('course_id', $courseId)->count();

        $completed = LessonProgress::where('user_id', Auth::id())
            ->whereHas('lesson', fn ($q) => $q->where('course_id', $courseId))
            ->where('completed', true)
            ->count();

        return response()->json([
            'total_lessons' => $totalLessons,
            'completed_lessons' => $completed,
            'progress_percent' => $totalLessons > 0
                ? round(($completed / $totalLessons) * 100, 2)
                : 0,
        ]);
    }
}