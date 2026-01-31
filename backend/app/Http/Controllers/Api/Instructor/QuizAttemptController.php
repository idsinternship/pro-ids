<?php

namespace App\Http\Controllers\Api\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;

class QuizAttemptController extends Controller
{
    public function index(Quiz $quiz)
    {
        $user = Auth::user();

        if ($quiz->course->instructor_id !== $user->id) {
            abort(403);
        }

        return response()->json([
            'quiz' => $quiz->title,
            'attempts' => $quiz->attempts()
                ->with('user:id,name,email')
                ->latest()
                ->get()
                ->map(fn ($a) => [
                    'student' => $a->user->name,
                    'email' => $a->user->email,
                    'score' => $a->score,
                    'passed' => $a->score >= $quiz->passing_score,
                    'submitted_at' => $a->created_at->toDateTimeString(),
                ]),
        ]);
    }
}