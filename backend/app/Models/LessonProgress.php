<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    protected $fillable = [
        'user_id',
        'lesson_id',
        'completed',
        'completed_at',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}