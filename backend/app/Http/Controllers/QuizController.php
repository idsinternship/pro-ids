<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function submit(Request $request, Quiz $quiz)
    {
        $user = Auth::user();

        // 1️⃣ Lock if already passed
        $alreadyPassed = QuizAttempt::where('user_id', $user->id)
            ->where('quiz_id', $quiz->id)
            ->where('passed', true)
            ->exists();

        if ($alreadyPassed) {
            return response()->json([
                'error' => 'Quiz already passed'
            ], 403);
        }

        // 2️⃣ Max attempts check
        $attempts = QuizAttempt::where('user_id', $user->id)
            ->where('quiz_id', $quiz->id)
            ->count();

        if ($attempts >= $quiz->max_attempts) {
            return response()->json([
                'error' => 'Maximum attempts reached'
            ], 403);
        }

        // 3️⃣ Validate answers payload
        $data = $request->validate([
            'answers' => 'required|array',
        ]);

        // 4️⃣ Auto-grade
        $total = $quiz->questions()->count();
        $correct = 0;

        foreach ($quiz->questions as $question) {
            $answerId = $data['answers'][$question->id] ?? null;

            if ($answerId && $question->answers()
                ->where('id', $answerId)
                ->where('is_correct', true)
                ->exists()) {
                $correct++;
            }
        }

        $score = $total > 0 ? round(($correct / $total) * 100) : 0;
        $passed = $score >= $quiz->pass_score;

        // 5️⃣ Save attempt
        $attempt = QuizAttempt::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz->id,
            'score' => $score,
            'passed' => $passed,
        ]);

        return response()->json([
            'score' => $score,
            'passed' => $passed,
            'remaining_attempts' => max(0, $quiz->max_attempts - ($attempts + 1)),
        ]);
    }
}