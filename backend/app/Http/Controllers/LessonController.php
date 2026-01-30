<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Course;
use App\Models\LessonCompletion;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Instructor: Create lesson
    |--------------------------------------------------------------------------
    */
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'order' => 'required|integer|min:1',
        ]);

        $course = Course::findOrFail($data['course_id']);
        abort_unless($course->instructor_id === auth()->id(), 403);

        $lesson = Lesson::create($data);

        return response()->json($lesson, 201);
    }

    /*
    |--------------------------------------------------------------------------
    | Student: Mark lesson completed
    |--------------------------------------------------------------------------
    */
    public function complete(Lesson $lesson)
    {
        LessonCompletion::firstOrCreate([
            'user_id' => auth()->id(),
            'lesson_id' => $lesson->id,
        ]);

        return response()->json([
            'message' => 'Lesson completed',
        ]);
    }
}