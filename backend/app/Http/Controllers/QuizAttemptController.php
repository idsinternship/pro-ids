<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;

class QuizAttemptController extends Controller
{
    public function submit(Request $request, Quiz $quiz)
    {
        $answers = $request->input('answers', []);

        $score = 0;
        $total = $quiz->questions()->count();

        foreach ($quiz->questions as $question) {
            $correct = $question->options
                ->where('is_correct', true)
                ->pluck('id')
                ->sort()
                ->values()
                ->toArray();

            $given = collect($answers[$question->id] ?? [])
                ->sort()
                ->values()
                ->toArray();

            if ($correct === $given) {
                $score++;
            }
        }

        $percentage = $total ? intval(($score / $total) * 100) : 0;

        $attempt = QuizAttempt::create([
            'quiz_id' => $quiz->id,
            'user_id' => auth()->id(),
            'score' => $percentage,
        ]);

        return response()->json([
            'score' => $percentage,
            'passed' => $percentage >= $quiz->passing_score,
            'attempt' => $attempt,
        ]);
    }
}