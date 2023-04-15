<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use App\Helpers\helper;

class UserProfileController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $userProfiles = UserProfile::all();
                return response()->json($userProfiles);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $userProfile = new UserProfile();
                $userProfile->userID = $request->input('userID');
                $userProfile->bookId = $request->input('bookId');
                $userProfile->bookmarksID = $request->input('bookmarksID');
                $userProfile->notificationsId = $request->input('notificationsId');
                $userProfile->isEmail = $request->input('isEmail');
                $userProfile->isPhone = $request->input('isPhone');
                $userProfile->isUserName = $request->input('isUserName');
                $userProfile->isPicture = $request->input('isPicture');
                $userProfile->isVerified = $request->input('isVerified');
                $userProfile->save();
                return response()->json($userProfile, 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $userProfile = UserProfile::findOrFail($id);
                return response()->json($userProfile);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $userProfile = UserProfile::findOrFail($id);
                if($request->has('userID')) {
                    $userProfile->userID = $request->input('userID');
                }
                if($request->has('bookId')) {
                    $userProfile->bookId = $request->input('bookId');
                }
                if($request->has('bookmarksID')) {
                    $userProfile->bookmarksID = $request->input('bookmarksID');
                }
                if($request->has('notificationsId')) {
                    $userProfile->notificationsId = $request->input('notificationsId');
                }
                if($request->has('isEmail')) {
                    $userProfile->isEmail = $request->input('isEmail');
                }
                if($request->has('isPhone')) {
                    $userProfile->isPhone = $request->input('isPhone');
                }
                if($request->has('isUserName')) {
                    $userProfile->isUserName = $request->input('isUserName');
                }
                if($request->has('isPicture')) {
                    $userProfile->isPicture = $request->input('isPicture');
                }
                if($request->has('isVerified')) {
                    $userProfile->isVerified = $request->input('isVerified');
                }
                $userProfile->save();
                return response()->json($userProfile);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $userProfile= UserProfile::findOrFail($id);
                $userProfile->delete();
                return response()->json(['message' => 'User Profile Deleted']);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
