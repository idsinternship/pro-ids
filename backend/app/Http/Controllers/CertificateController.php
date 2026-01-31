<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\QuizAttempt;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function issue(Course $course)
    {
        $user = Auth::user();

        // 1️⃣ Check lesson completion
        $totalLessons = Lesson::where('course_id', $course->id)->count();

        $completedLessons = LessonProgress::where('user_id', $user->id)
            ->where('completed', true)
            ->whereHas('lesson', fn ($q) => $q->where('course_id', $course->id))
            ->count();

        if ($totalLessons === 0 || $completedLessons < $totalLessons) {
            return response()->json([
                'error' => 'Complete all lessons first'
            ], 403);
        }

        // 2️⃣ Check quiz passed
        $passedQuiz = QuizAttempt::where('user_id', $user->id)
            ->whereHas('quiz', fn ($q) => $q->where('course_id', $course->id))
            ->where('passed', true)
            ->exists();

        if (! $passedQuiz) {
            return response()->json([
                'error' => 'Quiz must be passed'
            ], 403);
        }

        // 3️⃣ Prevent duplicate certificate
        if (Certificate::where('user_id', $user->id)->where('course_id', $course->id)->exists()) {
            return response()->json([
                'error' => 'Certificate already issued'
            ], 409);
        }

        // 4️⃣ Create certificate record
        $certificate = Certificate::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'verification_code' => Str::uuid(),
        ]);

        // 5️⃣ Generate PDF
        $pdf = Pdf::loadView('certificates.certificate', [
            'user' => $user,
            'course' => $course,
            'certificate' => $certificate,
        ]);

        $path = "certificates/{$certificate->verification_code}.pdf";
        Storage::disk('public')->put($path, $pdf->output());

        // Optional: store file path
        $certificate->update([
            'pdf_path' => $path,
        ]);

        return response()->json([
            'certificate' => $certificate,
            'pdf_url' => asset("storage/{$path}")
        ]);
    }

    public function verify($code)
    {
        return Certificate::with(['user', 'course'])
            ->where('verification_code', $code)
            ->firstOrFail();
    }
}