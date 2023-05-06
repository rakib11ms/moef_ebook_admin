<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;


class UserProfileController extends Controller
{
    public function index(Request $request)
    {
        $userProfiles = UserProfile::all();
        return response()->json(
            [
                'status' => 200,
                'user_profiles' => $userProfiles
            ]
        );
    }

    public function store(Request $request)
    {
        $userProfile = UserProfile::create($request->all());
        return response()->json(
            [
                'status' => 200,
                'user_profile' => $userProfile
            ]
        );
    }

    public function show(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'user_profile' => $userProfile
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $userProfile->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'user_profile' => $userProfile
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $userProfile->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'User profile deleted successfully'
            ]
        );
    }
}
