<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('userEmail', 'userPassword');
        $credentials['userPassword'] = bcrypt($credentials['userPassword']);

        //dd($credentials);
        if (Auth::attempt($credentials )) {
            dd($credentials);
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;
            return response()->json(['token' => $token]);
        }
        
        return response()-> json(['message' => 'Invalid login detailssss'], 401);
    }

    //function attemptLogin

}

?>