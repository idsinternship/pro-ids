<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Course;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        Lesson::truncate();

        $course = Course::first();

        Lesson::insert([
            [
                'course_id' => $course->id,
                'title' => 'Introduction to Laravel',
                'content' => 'Laravel basics overview',
                'order' => 1,
            ],
            [
                'course_id' => $course->id,
                'title' => 'Routing & Controllers',
                'content' => 'How routing works in Laravel',
                'order' => 2,
            ],
        ]);
    }
}