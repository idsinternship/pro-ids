<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class CertificateController extends Controller
{
    public function download($courseId)
    {
        $user = Auth::user();
        $course = Course::with('quiz')->findOrFail($courseId);

        if (!$course->students()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Not enrolled'], 403);
        }

        if (!$course->quiz || !$course->quiz->hasPassed($user->id)) {
            return response()->json(['message' => 'Quiz not passed'], 403);
        }

        return response()->json([
            'certificate_id' => Str::uuid()->toString(),
            'student' => $user->name,
            'course' => $course->title,
            'issued_at' => now()->toDateString(),
        ], Response::HTTP_OK);
    }
}