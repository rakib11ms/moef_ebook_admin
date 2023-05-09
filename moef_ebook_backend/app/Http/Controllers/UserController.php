<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUserImage($id)
    {
        $user = User::find($id);
        $image = $user->userImage;
        $image_path = public_path('images/user/' . $image);
        if (file_exists($image_path)) {
            // return response()->file($image_path);
            return response()->json([
                'status'=>200,
                'img_path'=>$image_path
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if($request->has('UserName'))
            $user->UserName = $request->UserName;

        if($request->has('userPhone'))
            $user->userPhone = $request->userPhone;
 
        if ($request->hasFile('userImage')) {
            // Delete old image
            $oldImage = $user->userImage;
            if ($oldImage != 'default.png' && $oldImage != null) {
                $image_path = public_path('images/user/' . $oldImage);
                if (file_exists($image_path)) {
                    unlink($image_path);
                }
            }

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

