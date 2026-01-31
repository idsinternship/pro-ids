<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\InstructorAnalyticsController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\LessonProgressController;
use App\Http\Controllers\QuizController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| All routes are prefixed with /api
| Authentication: JWT via auth:api
*/

/* ======================================================
| AUTH (PUBLIC)
|======================================================*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/* ======================================================
| PUBLIC COURSES
|======================================================*/
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);

/* ======================================================
| PROTECTED ROUTES (JWT)
|======================================================*/
Route::middleware('auth:api')->group(function () {

    /* --------------------
    | AUTH
    |--------------------*/
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* --------------------
    | INSTRUCTOR – COURSES
    |--------------------*/
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/instructor/courses', [CourseController::class, 'myCourses']);
    Route::post('/courses/{course}/publish', [CourseController::class, 'publish']);

    /* --------------------
    | INSTRUCTOR – ANALYTICS (INSTRUCTOR ONLY)
    |--------------------*/
    Route::middleware('instructor')->group(function () {

        // Overall instructor dashboard
        Route::get(
            '/instructor/analytics',
            [InstructorAnalyticsController::class, 'dashboard']
        );

        // Per-course analytics breakdown
        Route::get(
            '/instructor/courses/{course}/analytics',
            [InstructorAnalyticsController::class, 'courseAnalytics']
        );
    });

    /* --------------------
    | ENROLLMENTS
    |--------------------*/
    Route::post(
        '/courses/{course}/enroll',
        [EnrollmentController::class, 'enroll']
    );

    Route::delete(
        '/courses/{course}/unenroll',
        [EnrollmentController::class, 'unenroll']
    );

    Route::get(
        '/my-enrollments',
        [EnrollmentController::class, 'myEnrollments']
    );

    /* --------------------
    | LESSON PROGRESS
    |--------------------*/
    Route::post(
        '/lessons/{lesson}/complete',
        [LessonProgressController::class, 'complete']
    );

    Route::get(
        '/courses/{course}/progress',
        [LessonProgressController::class, 'courseProgress']
    );

    /* --------------------
    | QUIZZES (AUTO-GRADED + LOCKING)
    |--------------------*/
    Route::post(
        '/quizzes/{quiz}/submit',
        [QuizController::class, 'submit']
    );

    /* --------------------
    | CERTIFICATES (PDF + GATED)
    |--------------------*/
    Route::post(
        '/courses/{course}/certificate',
        [CertificateController::class, 'issue']
    );
});

/* ======================================================
| CERTIFICATE VERIFICATION (PUBLIC)
|======================================================*/
Route::get(
    '/certificates/verify/{code}',
    [CertificateController::class, 'verify']
);