<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'instructor_id',
        'title',
        'description',
        'category',
        'difficulty',
        'thumbnail',
        'published',
    ];

    /**
     * Instructor
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Enrollments
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Students enrolled
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }
}