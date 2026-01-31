<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'instructor_id',
    ];

    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }
}