<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'title' => ['required', 'string'],
            'passing_score' => ['required', 'integer', 'min:0', 'max:100'],
        ]);

        $course = Course::findOrFail($data['course_id']);

        if ($course->instructor_id !== Auth::id()) {
            abort(403);
        }

        $quiz = Quiz::create([
            'course_id' => $course->id,
            'title' => $data['title'],
            'passing_score' => $data['passing_score'],
            'published' => false,
        ]);

        return response()->json($quiz, 201);
    }

    public function show($quizId)
    {
        return Quiz::with('questions.options')->findOrFail($quizId);
    }
}