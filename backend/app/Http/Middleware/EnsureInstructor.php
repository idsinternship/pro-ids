<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureInstructor
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::guard('api')->user();

        if (! $user || $user->role !== 'instructor') {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden: instructor access required'
            ], 403);
        }

        return $next($request);
    }
}