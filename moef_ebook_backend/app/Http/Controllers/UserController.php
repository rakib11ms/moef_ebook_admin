<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if($request->has('UserName'))
            $user->UserName = $request->UserName;

        if($request->has('userPhone'))
            $user->userPhone = $request->userPhone;
 
        if ($request->hasFile('userImage')) {
            $image = $request->file('userImage');
            $userName = $user->userID;
            $imageName = $userName . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/user'), $imageName);
            $user->userImage = $imageName;
        }

        $user->save();

        return response()->json(
            [
                'status' => 200,
                'user' => $user
            ]
        );
    }
}

