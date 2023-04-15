<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Session;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $varifyUser = User::where('email', $email)->take(1)->get();
        if (count($varifyUser) == 0) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        foreach($varifyUser as $user) {
            $oldPassword = $user->password;
        }


        if (Hash::check($password, $oldPassword)) {
            $token = $user->createToken('auth-token')->plainTextToken;
            Session::put('bearer', $token);
            return response()->json(['token' => $token]);
        }

        return response()-> json(['message' => 'Invalid login detailssss'], 401);
    }

        
}

?>