<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function enroll(Course $course)
    {
        $user = Auth::user();

        if (!$course->published) {
            return response()->json(['error' => 'Course not published'], 403);
        }

        $exists = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Already enrolled'], 409);
        }

        Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        return response()->json(['message' => 'Enrolled successfully']);
    }

    public function unenroll(Course $course)
    {
        Enrollment::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->delete();

        return response()->json(['message' => 'Unenrolled']);
    }

    public function myEnrollments()
    {
        return response()->json(
            Enrollment::with('course')
                ->where('user_id', Auth::id())
                ->get()
        );
    }
}