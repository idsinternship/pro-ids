<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Certificate;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class CertificateController extends Controller
{
    /**
     * Download certificate for a completed course
     */
    public function download($courseId)
    {
        $user = Auth::guard('api')->user();

        // Role enforcement
        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Only students can download certificates'
            ], 403);
        }

        // Enrollment check
        $enrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->exists();

        if (! $enrolled) {
            return response()->json([
                'success' => false,
                'message' => 'You are not enrolled in this course'
            ], 403);
        }

        $course = Course::findOrFail($courseId);

        // Lesson completion check
        $totalLessons = Lesson::where('course_id', $course->id)->count();

        $completedLessons = LessonProgress::where('user_id', $user->id)
            ->whereIn('lesson_id', function ($query) use ($course) {
                $query->select('id')
                    ->from('lessons')
                    ->where('course_id', $course->id);
            })
            ->distinct('lesson_id')
            ->count('lesson_id');

        if ($totalLessons > 0 && $completedLessons < $totalLessons) {
            return response()->json([
                'success' => false,
                'message' => 'All lessons must be completed before downloading the certificate'
            ], 403);
        }

        // Quiz pass check
        $quizzes = Quiz::where('course_id', $course->id)->get();

        foreach ($quizzes as $quiz) {
            $passed = QuizAttempt::where('user_id', $user->id)
                ->where('quiz_id', $quiz->id)
                ->where('score', '>=', $quiz->passing_score)
                ->exists();

            if (! $passed) {
                return response()->json([
                    'success' => false,
                    'message' => 'All quizzes must be passed before downloading the certificate'
                ], 403);
            }
        }

        // Create or fetch certificate
        $certificate = Certificate::firstOrCreate(
            [
                'user_id' => $user->id,
                'course_id' => $course->id,
            ],
            [
                'verification_code' => strtoupper(Str::random(10)),
            ]
        );

        $pdf = Pdf::loadView('certificates.certificate', [
            'student' => $user,
            'course' => $course,
            'date' => now()->toDateString(),
            'verificationCode' => $certificate->verification_code,
        ]);

        return $pdf->download(
            'certificate-' . $course->id . '-' . $user->id . '.pdf'
        );
    }
}