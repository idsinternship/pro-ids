<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureInstructor
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (! $user || $user->role !== 'instructor') {
            return response()->json([
                'error' => 'Instructor access only'
            ], 403);
        }

        return $next($request);
    }
}