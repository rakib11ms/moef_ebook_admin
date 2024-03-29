<?php

namespace App\Http\Controllers\Auths;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;


class RegisterController extends Controller
{
    public function register(Request $request)
    {


        $validator = Validator::make(
            $request->all(),
            [
                'OfficeID' => 'max:191',
                'UserName' => 'required|max:191',
                'password' => 'required|min:6',
                // 'userID' => 'required|unique:users',
                'email' => 'required|email|max:191|unique:users,email',
                'userPhone' => 'required|unique:users',
                'confirm_password' => 'required|same:password|min:6',
                // 'isVerified' => 'required|in:guest,verified',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'validation_errors' => $validator->messages()
            ]);
        } else {

            $user=new User();
            $user->OfficeID=$request->OfficeID;
            $user->UserName=$request->UserName;
            $user->userPhone=$request->userPhone;
            $user->email=$request->email;
            $user->userID=$request->userID;
            $user->password= Hash::make($request->password);
            // $user->isVerified=$request->isVerified;
            $user->confirm_password = Hash::make($request->confirm_password);
            // $user->userRoleName='ইউজার';
            $user->assignRole('ইউজার '); 
            $user->userImage=$request->userImage;
            $user->save();

            // $token = $user->createToken($user->email . '_Token')->plainTextToken;
            
            return response()->json([
            'status' => 200,
            // 'token' => $token,
            'user' => $user,
            'message' => 'Registration Successfull'
            ]);
        }
    }
}
