<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Session;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // dd($request->all());
        $data = $request->validate(
            [
                'id' => 'required|string',
                'password' => 'required|string'
            ]
        );

        $user = User::where('email', $data['id'])->first();
        if(!$user) {
            $user = User::where('OfficeID', $data['id'])->first();
            if(!$user) {
                $user = User::where('userID', $data['id'])->first();
            }
        }

        if (!$user || !Hash::check($data['password'], $user->password)) {
            $response = [
                'message' => 'Invalid credentials',
                'status' => 401
            ];
            return response($response, 401);
        } else {
            $token = $user->createToken('auth-token')->plainTextToken;
            $response = [
                'user' => $user,
                'status' => 200,
                'token' => $token
            ];
            return response($response, 201);
        } 

    }
}
