<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // student | instructor
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /* ===== Instructor courses ===== */
    public function courses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    /* ===== Enrollments ===== */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollments');
    }
}