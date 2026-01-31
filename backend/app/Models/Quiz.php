<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'published',
        'passing_score',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function hasPassed(int $userId): bool
    {
        return $this->attempts()
            ->where('user_id', $userId)
            ->where('score', '>=', $this->passing_score)
            ->exists();
    }
}