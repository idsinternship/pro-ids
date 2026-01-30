<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\LessonCompletion;

class ProgressController extends Controller
{
    public function myCourses(Request $request)
    {
        $user = auth('api')->user();

        $courses = Course::withCount('lessons')->get();

        return $courses->map(function ($course) use ($user) {
            $completed = LessonCompletion::where('user_id', $user->id)
                ->whereIn(
                    'lesson_id',
                    $course->lessons()->pluck('id')
                )
                ->count();

            $total = $course->lessons_count;

            return [
                'id' => $course->id,
                'title' => $course->title,
                'total_lessons' => $total,
                'completed_lessons' => $completed,
                'progress' => $total > 0
                    ? round(($completed / $total) * 100)
                    : 0,
            ];
        });
    }
}
