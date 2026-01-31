<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'max_attempts',
        'pass_score',
    ];

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}