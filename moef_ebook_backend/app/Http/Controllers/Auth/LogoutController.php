<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\helper;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $response = Helper::validateToken($request);
        if(!$response) {
            return response()->json(['message' => 'Invalid Token'], 401);
        } else {
            Auth::guard('web')->logout(); 
            $request->session()->invalidate();
            $request->session()->regenerateToken();
    
            return response()->json(['message' => 'Logged out successfully']);
        }
    }
}