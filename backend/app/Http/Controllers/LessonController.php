<?php

namespace App\Http\Controllers;

use App\Models\Lesson;

class LessonController extends Controller
{
    // GET /api/lessons/{id}
    public function show($id)
    {
        return Lesson::findOrFail($id);
    }
}
