<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\helper;
use App\Models\Token;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $response = Helper::validateToken($request);
        if(!$response) {
            return response()->json(['message' => 'Invalid Token'], 401);
        } else {
            $request = Token::where('scantum_token', $request->bearerToken())->delete();
            return response()->json(['message' => 'User logged out'], 200);
        }
    }
}