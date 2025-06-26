<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Kreait\Firebase\Factory;

class FirebaseAuth
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken(); // Authorization: Bearer <token>

        $auth = (new Factory)
            ->withServiceAccount(storage_path('app/firebase/firebase_credentials.json'))
            ->createAuth();

        try {
            $verifiedIdToken = $auth->verifyIdToken($token);
            $uid = $verifiedIdToken->claims()->get('sub');
            $request->merge(['firebase_uid' => $uid]); // Disponibiliza para controller
            return $next($request);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Token Firebase inválido'], 401);
        }
    }
}
