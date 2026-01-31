<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        Course::truncate();

        $instructor = User::where('role', 'instructor')->first();

        Course::create([
            'title' => 'Laravel Fundamentals',
            'description' => 'Learn Laravel from scratch',
            'instructor_id' => $instructor->id,
        ]);
    }
}