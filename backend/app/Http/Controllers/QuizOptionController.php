<?php

namespace App\Http\Controllers;

use App\Models\QuizQuestion;
use App\Models\QuizOption;
use Illuminate\Http\Request;

class QuizOptionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'question_id' => 'required|exists:quiz_questions,id',
            'answer_text' => 'required|string',
            'is_correct' => 'required|boolean',
        ]);

        $question = QuizQuestion::findOrFail($data['question_id']);
        abort_unless($question->quiz->course->instructor_id === auth()->id(), 403);

        $option = QuizOption::create($data);

        return response()->json($option, 201);
    }
}