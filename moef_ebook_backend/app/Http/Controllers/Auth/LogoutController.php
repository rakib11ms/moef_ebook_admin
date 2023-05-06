<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        // dd('check');
        // dd(auth('sanctum')->user()->id());
        $logoutUser = auth('sanctum')->user()->tokens()->delete();
        return response()->json(['status' => 200, 'message' => 'Logged out successfully']);
    }
} 