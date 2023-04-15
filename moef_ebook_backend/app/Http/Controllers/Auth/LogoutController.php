<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Session;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $clientToken = $request->header('User-Token');
        $sessionToken = Session::get('token');
        if(!$clientToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        } else if(!$sessionToken) {
            return response()->json(['message' => 'Token not found'], 401);
        } else {
            if($clientToken == $sessionToken) {
                Auth::guard('web')->logout(); 
                $request->session()->invalidate();
                $request->session()->regenerateToken();
        
                return response()->json(['message' => 'Logged out successfully']);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        }
    }
}