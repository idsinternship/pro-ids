<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    /**
     * Enroll authenticated STUDENT into a published course
     */
    public function enroll($courseId)
    {
        $user = Auth::guard('api')->user();

        // Defensive role check
        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Only students can enroll in courses'
            ], 403);
        }

        $course = Course::where('id', $courseId)
            ->where('is_published', true)
            ->first();

        if (! $course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found or not published'
            ], 404);
        }

        // Prevent duplicate enrollment
        $existing = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => 'Already enrolled',
                'data' => $existing
            ]);
        }

        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Enrolled successfully',
            'data' => $enrollment
        ], 201);
    }
}