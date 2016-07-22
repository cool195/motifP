<?php

namespace App\Http\Middleware;

use Closure;

class LoginCheckMiddleware
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}