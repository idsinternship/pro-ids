<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Instructor
        $instructor = User::create([
            'name' => 'Instructor One',
            'email' => 'instructor@example.com',
            'password' => Hash::make('password'),
            'role' => 'instructor',
        ]);

        // Student
        $student = User::create([
            'name' => 'Student One',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        // Course 1 (published)
        $course1 = Course::create([
            'instructor_id' => $instructor->id,
            'title' => 'Laravel Fundamentals',
            'description' => 'Learn Laravel from scratch: routing, controllers, models, auth.',
            'published' => true,
        ]);

        // Course 2 (draft)
        $course2 = Course::create([
            'instructor_id' => $instructor->id,
            'title' => 'API Building with Laravel',
            'description' => 'Build REST APIs with Laravel, validation, resources, auth.',
            'published' => false,
        ]);

        // Lessons for Course 1
        Lesson::create([
            'course_id' => $course1->id,
            'title' => 'Intro & Setup',
            'content' => 'Install PHP, Composer, Laravel. Create your first app.',
        ]);

        Lesson::create([
            'course_id' => $course1->id,
            'title' => 'Routing & Controllers',
            'content' => 'Learn routes, controllers, requests, responses.',
        ]);

        // Enroll student in published course
        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course1->id,
        ]);
    }
}