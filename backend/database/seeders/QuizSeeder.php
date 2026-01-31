<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizOption;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $quiz = Quiz::create([
            'course_id' => 1,
            'title' => 'Final Exam',
            'published' => true,
            'passing_score' => 60,
            'max_attempts' => 3,
        ]);

        $q1 = QuizQuestion::create([
            'quiz_id' => $quiz->id,
            'text' => 'Laravel is written in which language?',
            'multiple' => false,
        ]);

        QuizOption::insert([
            [
                'quiz_question_id' => $q1->id,
                'option_text' => 'PHP',
                'is_correct' => true,
            ],
            [
                'quiz_question_id' => $q1->id,
                'option_text' => 'JavaScript',
                'is_correct' => false,
            ],
        ]);

        $q2 = QuizQuestion::create([
            'quiz_id' => $quiz->id,
            'text' => 'Which are Laravel features?',
            'multiple' => true,
        ]);

        QuizOption::insert([
            [
                'quiz_question_id' => $q2->id,
                'option_text' => 'Eloquent ORM',
                'is_correct' => true,
            ],
            [
                'quiz_question_id' => $q2->id,
                'option_text' => 'Blade Templates',
                'is_correct' => true,
            ],
            [
                'quiz_question_id' => $q2->id,
                'option_text' => 'JSP',
                'is_correct' => false,
            ],
        ]);
    }
}