<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class InstructorAnalyticsController extends Controller
{
    public function dashboard()
    {
        $instructorId = Auth::id();

        $courses = Course::withCount('students')
            ->where('instructor_id', $instructorId)
            ->get();

        $totalStudents = $courses->sum('students_count');

        return response()->json([
            'courses' => $courses,
            'total_students' => $totalStudents,
            'revenue' => 0, // ready for payments later
            'completion_rate' => null, // hook lesson completion later
        ]);
    }
}