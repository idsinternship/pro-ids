<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\QuizOptionController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\LessonProgressController;
use App\Http\Controllers\MyLearningController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\InstructorDashboardController;
use App\Http\Controllers\InstructorAnalyticsController;
use App\Http\Controllers\Api\Student\QuizAttemptController as StudentQuizAttemptController;
use App\Http\Controllers\Api\Instructor\QuizAttemptController as InstructorQuizAttemptController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:student')->group(function () {
        Route::get('/student/dashboard', [StudentDashboardController::class, 'index']);
        Route::post('/courses/{courseId}/enroll', [EnrollmentController::class, 'enroll']);
        Route::post('/lessons/{lessonId}/complete', [LessonProgressController::class, 'complete']);
        Route::post('/student/quizzes/{quiz}/attempt', [StudentQuizAttemptController::class, 'store']);
        Route::get('/my-learning', [MyLearningController::class, 'index']);
        Route::get('/progress/{courseId}', [ProgressController::class, 'courseProgress']);
        Route::get('/certificate/{courseId}', [CertificateController::class, 'download']);
    });

    Route::middleware('role:instructor')->group(function () {
        Route::get('/instructor/dashboard', [InstructorDashboardController::class, 'index']);
        Route::get('/instructor/analytics', [InstructorAnalyticsController::class, 'index']);
        Route::post('/courses', [CourseController::class, 'store']);
        Route::put('/courses/{id}', [CourseController::class, 'update']);
        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
        Route::post('/courses/{courseId}/lessons', [LessonController::class, 'store']);
        Route::post('/quizzes', [QuizController::class, 'store']);
        Route::post('/quizzes/{quizId}/questions', [QuizQuestionController::class, 'store']);
        Route::post('/questions/{questionId}/options', [QuizOptionController::class, 'store']);
        Route::get('/instructor/quizzes/{quiz}/attempts', [InstructorQuizAttemptController::class, 'index']);
    });

    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/{courseId}/lessons', [LessonController::class, 'index']);
    Route::get('/quizzes/{quizId}', [QuizController::class, 'show']);
});