<?php

namespace App\Http\Controllers;

use App\Models\QuizOption;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizOptionController extends Controller
{
    public function store(Request $request, $questionId)
    {
        $question = QuizQuestion::with('quiz.course')->findOrFail($questionId);
        $user = Auth::user();

        if ($question->quiz->course->instructor_id !== $user->id) {
            abort(403);
        }

        $data = $request->validate([
            'text' => ['required', 'string'],
            'is_correct' => ['required', 'boolean'],
        ]);

        $option = QuizOption::create([
            'quiz_question_id' => $question->id,
            'text' => $data['text'],
            'is_correct' => $data['is_correct'],
        ]);

        return response()->json($option, 201);
    }
}