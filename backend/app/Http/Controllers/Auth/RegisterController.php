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
                'userEmail' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'userEmail')],
                'userPassword' => ['required', 'string', 'min:4', 'confirmed'],
                'userPassword_confirmation' => ['required', 'string', 'min:4'],
            ]);

            $user = User::create([
                'OfficeID' => $validatedData['OfficeID'],
                'UserName' => $validatedData['UserName'],
                'userPhone' => $validatedData['userPhone'],
                'userEmail' => $validatedData['userEmail'],
                'userPassword' => Hash::make($validatedData['userPassword']),
            ]);

            $token = $user->createToken('auth-token')->plainTextToken;
            return response()->json(['token' => $token]);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
