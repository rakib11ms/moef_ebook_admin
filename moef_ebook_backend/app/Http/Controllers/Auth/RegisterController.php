<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'OfficeID' => ['required', 'string', 'max:255'],
                'UserName' => ['required', 'string', 'max:255'],
                'userPhone' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
                'password' => ['required', 'string', 'min:4', 'confirmed'],
                'password_confirmation' => ['required', 'string', 'min:4'],
            ]);

            $user = User::create([
                'OfficeID' => $validatedData['OfficeID'],
                'UserName' => $validatedData['UserName'],
                'userPhone' => $validatedData['userPhone'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'],
                'userRoleName' => 'ADMIN',
            ]);

            // $token = $user->createToken('auth-token')->plainTextToken;
            // return response()->json(['token' => $token]);
            return response()->json(['message' => 'User created successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
