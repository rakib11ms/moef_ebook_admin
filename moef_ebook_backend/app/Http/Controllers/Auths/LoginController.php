<?php

namespace App\Http\Controllers\Auths;

use App\Models\User;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Session;
use Spatie\Permission\Models\Role;

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
                'status' => 400,
                'message' => 'Invalid credentials'
            ];
            return response($response, 400);
        } else {
            if($user->ActiveStatus == false) {
                $response = [
                    'status' => 400,
                    'message' => 'User is inactive'
                ];
                return response($response, 400);
            }
            $token = $user->createToken('auth-token')->plainTextToken;
            $user_data=User::find($user->id);
            $user_data->device_token=$request->device_token;
            $user_data->update();


            $check=$user->roles[0]['id'];
           $role=Role::where('id',$check)->first();

          
            return response()->json([
                'status'=>200,
                'user' => $user,
                'permissions'=>$user->getAllPermissions(),
                'only_permissions'=>$role->permissions->pluck('name'),
                'token' => $token
            ]);
         
        } 

    }
}
