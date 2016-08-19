<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class LoginCheckMiddleware
{
    public function handle($request, Closure $next)
    {
        if(Session::has('user')){
            return $next($request);
        }
        return redirect('/login?url='.urlencode($_SERVER['REQUEST_URI']));
    }
}