<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    /**
     * Get progress percentage for an enrolled student in a course
     */
    public function courseProgress($courseId)
    {
        $user = Auth::guard('api')->user();

        // Defensive role check
        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Only students can view course progress'
            ], 403);
        }

        // Ensure enrollment
        $enrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->exists();

        if (! $enrolled) {
            return response()->json([
                'success' => false,
                'message' => 'You are not enrolled in this course'
            ], 403);
        }

        $course = Course::findOrFail($courseId);

        $totalLessons = Lesson::where('course_id', $course->id)->count();

        $completedLessons = LessonProgress::where('user_id', $user->id)
            ->whereIn('lesson_id', function ($query) use ($course) {
                $query->select('id')
                    ->from('lessons')
                    ->where('course_id', $course->id);
            })
            ->distinct('lesson_id')
            ->count('lesson_id');

        $progress = $totalLessons > 0
            ? round(($completedLessons / $totalLessons) * 100)
            : 0;

        return response()->json([
            'success' => true,
            'data' => [
                'course_id' => $course->id,
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedLessons,
                'progress_percentage' => $progress
            ]
        ]);
    }
}