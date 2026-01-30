<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    CourseController,
    LessonController,
    QuizController,
    QuizQuestionController,
    QuizOptionController,
    QuizAttemptController
};

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | INSTRUCTOR ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:instructor')->group(function () {

        // Courses
        Route::post('/courses', [CourseController::class, 'store']);
        Route::get('/instructor/courses', [CourseController::class, 'myCourses']);
        Route::post('/courses/{course}/publish', [CourseController::class, 'publish']);

        // Lessons
        Route::post('/lessons', [LessonController::class, 'store']);

        // Quizzes
        Route::post('/quizzes', [QuizController::class, 'store']);
        Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);
        Route::post('/quiz-options', [QuizOptionController::class, 'store']);
    });

    /*
    |--------------------------------------------------------------------------
    | STUDENT ROUTES
    |--------------------------------------------------------------------------
    */

    // Browse courses
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{course}', [CourseController::class, 'show']);

    // Learning progress
    Route::post('/lessons/{lesson}/complete', [LessonController::class, 'complete']);

    // Quiz attempts
    Route::post('/quizzes/{quiz}/submit', [QuizAttemptController::class, 'submit']);
});