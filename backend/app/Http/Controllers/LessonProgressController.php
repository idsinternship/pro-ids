<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonCompletion;

class LessonProgressController extends Controller
{
    public function complete($lessonId)
    {
        $user = auth('api')->user();

        LessonCompletion::firstOrCreate([
            'user_id' => $user->id,
            'lesson_id' => $lessonId,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
