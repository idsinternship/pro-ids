<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizAttemptController extends Controller
{
    public function store(Request $request, Quiz $quiz)
    {
        $user = Auth::user();

        if (!$quiz->published) {
            return response()->json(['message' => 'Quiz not published'], 403);
        }

        $alreadyPassed = QuizAttempt::where('user_id', $user->id)
            ->where('quiz_id', $quiz->id)
            ->where('score', '>=', $quiz->passing_score)
            ->exists();

        if ($alreadyPassed) {
            return response()->json(['message' => 'Already passed'], 403);
        }

        $data = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.question_id' => ['required', 'integer'],
            'answers.*.selected_option_ids' => ['required', 'array'],
            'answers.*.selected_option_ids.*' => ['integer'],
        ]);

        $quiz->load('questions.options');

        $correct = 0;

        foreach ($quiz->questions as $question) {
            $answer = collect($data['answers'])
                ->firstWhere('question_id', $question->id);

            if (!$answer) continue;

            $correctIds = $question->options
                ->where('is_correct', true)
                ->pluck('id')
                ->sort()
                ->values();

            $selected = collect($answer['selected_option_ids'])
                ->sort()
                ->values();

            if ($correctIds->all() === $selected->all()) {
                $correct++;
            }
        }

        $score = round(($correct / max(1, $quiz->questions->count())) * 100, 2);

        QuizAttempt::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz->id,
            'score' => $score,
        ]);

        return response()->json([
            'score' => $score,
            'passed' => $score >= $quiz->passing_score,
        ]);
    }
}