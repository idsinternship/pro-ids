<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Course;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    public function issue(Course $course)
    {
        $user = Auth::user();

        $certificate = Certificate::firstOrCreate(
            [
                'user_id' => $user->id,
                'course_id' => $course->id,
            ],
            [
                'verification_code' => Str::uuid(),
            ]
        );

        $pdf = Pdf::loadView('certificate', [
            'user' => $user,
            'course' => $course,
            'certificate' => $certificate,
        ]);

        return $pdf->download('certificate.pdf');
    }

    public function verify($code)
    {
        $certificate = Certificate::with(['user', 'course'])
            ->where('verification_code', $code)
            ->firstOrFail();

        return response()->json($certificate);
    }
}