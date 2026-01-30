<?php

namespace App\Http\Controllers;

use App\Models\Course;

class CourseController extends Controller
{
    // GET /api/courses
    public function index()
    {
        return Course::withCount('lessons')->get();
    }

    // GET /api/courses/{id}
    public function show($id)
    {
        return Course::with('lessons')->findOrFail($id);
    }
}
