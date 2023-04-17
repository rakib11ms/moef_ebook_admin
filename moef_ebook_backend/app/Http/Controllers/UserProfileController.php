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
                try {
                    $userProfile = UserProfile::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
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
                try {
                    $userProfile = UserProfile::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'User Profile not found'], 404);
                }
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
                try {
                    $userProfile = UserProfile::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'User Profile not found'], 404);
                }

                try {
                    $userProfile->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
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
                try {
                    $userProfile = UserProfile::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'User Profile not found'], 404);
                }

                try {
                    $userProfile->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'User Profile not found'], 404);
                }
                return response()->json(['message' => 'User Profile Deleted']);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
