<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Certificate;
use App\Models\LessonCompletion;
use App\Models\QuizAttempt;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class CertificateController extends Controller
{
    public function generate(Course $course)
    {
        abort_unless($course->published, 404);

        $user = auth()->user();

        $totalLessons = $course->lessons()->count();
        $completedLessons = LessonCompletion::where('user_id', $user->id)
            ->whereIn('lesson_id', $course->lessons()->pluck('id'))
            ->count();

        abort_unless($totalLessons > 0 && $totalLessons === $completedLessons, 403);

        $avgScore = QuizAttempt::where('user_id', $user->id)
            ->whereIn('quiz_id', $course->quizzes()->pluck('id'))
            ->avg('score');

        abort_unless($avgScore !== null && $avgScore >= 60, 403);

        $certificate = Certificate::firstOrCreate(
            [
                'user_id' => $user->id,
                'course_id' => $course->id,
            ],
            [
                'code' => strtoupper(Str::random(10)),
                'issued_at' => now(),
            ]
        );

        $pdf = Pdf::loadView("certificates.certificate", [
            "user" => $user,
            "course" => $course,
            "certificate" => $certificate,
        ]);

        return $pdf->download("certificate-{$course->id}.pdf");
    }
}