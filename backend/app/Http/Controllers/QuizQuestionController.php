<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizQuestionController extends Controller
{
    public function store(Request $request, $quizId)
    {
        $quiz = Quiz::with('course')->findOrFail($quizId);
        $user = Auth::user();

        if ($quiz->course->instructor_id !== $user->id) {
            abort(403);
        }

        $data = $request->validate([
            'text' => ['required', 'string'],
            'multiple' => ['required', 'boolean'],
        ]);

        $question = QuizQuestion::create([
            'quiz_id' => $quiz->id,
            'text' => $data['text'],
            'multiple' => $data['multiple'],
        ]);

        return response()->json($question, 201);
    }
}