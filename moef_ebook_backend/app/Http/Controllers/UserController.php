<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUserInfo()
    {
        $users = User::with(['roles' => function ($query) {
            $query->select('name');
        }])->where('ActiveStatus',1)->get();

        $users = $users->map(function ($user) {
            $roleName = $user->roles->first()['name'] ?? null;

            return [
                'id' => $user->id,
                'UserName' => $user->UserName,
                'userEmail' => $user->email,
                'userPhone' => $user->userPhone,
                'userID' => $user->userID,
                'officeID' => $user->OfficeID,
                'userRole' => $roleName,
                'activeStatus' => $user->ActiveStatus,
                'created_at' => $user->created_at,
                'userImage' => $user->userImage ?? 'default.png',
            ];
        });

        $deactive_users = User::with(['roles' => function ($query) {
            $query->select('name');
        }])->where('ActiveStatus',0)->get();

        $deactive_users1 = $deactive_users->map(function ($user) {
            $roleName = $user->roles->first()['name'] ?? null;

            return [
                'id' => $user->id,
                'UserName' => $user->UserName,
                'userEmail' => $user->email,
                'userPhone' => $user->userPhone,
                'userID' => $user->userID,
                'officeID' => $user->OfficeID,
                'userRole' => $roleName,
                'activeStatus' => $user->ActiveStatus,
                'created_at' => $user->created_at,
                'userImage' => $user->userImage ?? 'default.png',
            ];
        });


        return response()->json([
            'status' => 200,
            'users' => $users,
            'deactive_users'=>$deactive_users1
        ]);
    }

    public function getUserInfo($id)
    {
        $user = User::with(['roles' => function ($query) {
            $query->select('name');
        }])->find($id);


        $roleName = $user->roles->first()['name'] ?? null;
        //return onlt username, email and phone number
        $userInfo = [
            'id' => $user->id,
            'UserName' => $user->UserName,
            'userEmail' => $user->email,
            'userPhone' => $user->userPhone,
            'userID' => $user->userID,
            'officeID' => $user->OfficeID,
            'userRole' => $roleName,
            'activeStatus' => $user->ActiveStatus,
            'created_at' => $user->created_at,
            'userImage' => $user->userImage ?? 'default.png'
        ];

        return response()->json(
            [
                'status' => 200,
                'userInfo' => $userInfo
            ]
        );
    }

    public function getUserImage($id)
    {
        $user = User::find($id);
        $image = $user->userImage;
        $image_path = public_path('images/user/' . $image);
        if (file_exists($image_path)) {
            // return response()->file($image_path);
            return response()->json([
                'status'=>200,
                'image'=>$image
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

        if($request->has('userEmail'))
            $user->email = $request->userEmail;

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

        $user->update();
        return response()->json(
            [
                'status' => 200,
                'user' => $user
            ]
        );
    }



    public function globalSearchUserByUserNameAndUserEmail(Request $request)
    {
        if ($request->search == null) {
            return response()->json([
                'status' => 200,
                'users' => []
            ]);
        }
        
        $search = $request->search;
        // dd('check',$search);
        $users = User::where(function ($query) use ($search) {
            $query->where('UserName', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%");
        })->get();

        $users = $users->map(function ($user) {
            $roleName = $user->roles->first()['name'] ?? null;

            return [
                'id' => $user->id,
                'UserName' => $user->UserName,
                'userEmail' => $user->email,
                'userPhone' => $user->userPhone,
                'userID' => $user->userID,
                'officeID' => $user->OfficeID,
                'userRole' => $roleName,
                'activeStatus' => $user->ActiveStatus,
                'created_at' => $user->created_at,
                'userImage' => $user->userImage ?? 'default.png',
            ];
        });

        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }

    public function changeUserRole(Request $request, $id)
    {
        $user = User::find($id);
        $user->roles()->detach();
        $user->roles()->attach($request->role_id);
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }


public function searchUserInformation($searchParams) {
    $filter_users1 = User::with('roles')
        ->where('UserName', 'LIKE', '%' . $searchParams . '%')
        ->orWhere('userPhone', 'LIKE', '%' . $searchParams . '%')
        ->orWhere('email', 'LIKE', '%' . $searchParams . '%')
        ->orWhere('OfficeID', 'LIKE', '%' . $searchParams . '%')
        ->get();


        $filter_users = $filter_users1->map(function ($user) {
            $roleName = $user->roles->first()['name'] ?? null;

            return [
                'id' => $user->id,
                'UserName' => $user->UserName,
                'userEmail' => $user->email,
                'userPhone' => $user->userPhone,
                'userID' => $user->userID,
                'officeID' => $user->OfficeID,
                'userRole' => $roleName,
                'activeStatus' => $user->ActiveStatus,
                'created_at' => $user->created_at,
                'userImage' => $user->userImage ?? 'default.png',
            ];
        });

    return response()->json([
        'status' => 200,
        'filter_users' => $filter_users
    ]);
}

}

