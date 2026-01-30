<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    // GET /api/instructor/courses
    public function index(Request $request)
    {
        return Course::where('instructor_id', $request->user()->id)
            ->withCount('lessons')
            ->get();
    }

    // POST /api/instructor/courses
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        return Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'instructor_id' => $request->user()->id,
        ]);
    }

    // PUT /api/instructor/courses/{id}
    public function update(Request $request, $id)
    {
        $course = Course::where('id', $id)
            ->where('instructor_id', $request->user()->id)
            ->firstOrFail();

        $course->update(
            $request->only('title', 'description')
        );

        return $course;
    }

    // DELETE /api/instructor/courses/{id}
    public function destroy(Request $request, $id)
    {
        $course = Course::where('id', $id)
            ->where('instructor_id', $request->user()->id)
            ->firstOrFail();

        $course->delete();

        return response()->json(['success' => true]);
    }
}
