<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
public function show($id) {
    return Quiz::with('questions')->findOrFail($id);
}

public function submit(Request $request, $id) {
    $quiz = Quiz::with('questions')->findOrFail($id);
    $score = 0;

    foreach ($quiz->questions as $q) {
        if (($request->answers[$q->id] ?? null) === $q->correct_answer) {
            $score++;
        }
    }

    QuizAttempt::create([
        'user_id' => auth()->id(),
        'quiz_id' => $quiz->id,
        'score' => $score,
    ]);

    return ['score' => $score, 'total' => $quiz->questions->count()];
}

}
