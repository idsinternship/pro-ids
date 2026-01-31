<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * Public course listing with search & filtering
     */
    public function index(Request $request)
    {
        $query = Course::query()
            ->where('published', true);

        // Keyword search
        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Filters
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        // Sorting
        if ($request->input('sort') === 'popular') {
            $query->withCount('students')
                  ->orderByDesc('students_count');
        } else {
            $query->orderByDesc('created_at');
        }

        return response()->json($query->get());
    }

    /**
     * Show course
     */
    public function show(Course $course)
    {
        if (!$course->published) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        return response()->json($course);
    }

    /**
     * Instructor creates course
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'difficulty' => 'nullable|string|max:50',
            'thumbnail' => 'nullable|string',
        ]);

        $course = Course::create([
            'instructor_id' => Auth::id(),
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'category' => $data['category'] ?? null,
            'difficulty' => $data['difficulty'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'published' => false,
        ]);

        return response()->json($course, 201);
    }

    /**
     * Instructor course list
     */
    public function myCourses()
    {
        return response()->json(
            Course::where('instructor_id', Auth::id())
                ->orderByDesc('created_at')
                ->get()
        );
    }

    /**
     * Publish course
     */
    public function publish(Course $course)
    {
        if ($course->instructor_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $course->update(['published' => true]);

        return response()->json(['message' => 'Course published successfully']);
    }
}