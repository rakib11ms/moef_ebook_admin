<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;


class UserProfileController extends Controller
{
    public function index(Request $request)
    {
        $userProfiles = UserProfile::all();
        return response()->json($userProfiles);
    }

    public function store(Request $request)
    {
        $userProfile = UserProfile::create($request->all());
        return response()->json($userProfile, 201);
    }

    public function show(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        return response()->json($userProfile);
    }

    public function update(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $userProfile->update($request->all());
        return response()->json($userProfile, 200);
    }

    public function destroy(Request $request, string $id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $userProfile->delete();
        return response()->json(['message' => 'Record deleted'], 200);
    }
}
