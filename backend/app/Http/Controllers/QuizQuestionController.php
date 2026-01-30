<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question_text' => 'required|string',
            'question_type' => 'required|in:MCQ,MSQ,TF',
        ]);

        $quiz = Quiz::findOrFail($data['quiz_id']);
        abort_unless($quiz->course->instructor_id === auth()->id(), 403);

        $question = QuizQuestion::create($data);

        return response()->json($question, 201);
    }
}