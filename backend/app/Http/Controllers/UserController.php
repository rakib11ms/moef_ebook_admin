<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'UserName' => 'required|string|max:255|unique:users',
            'UserRole' => 'required|string',
            'userPhone' => 'required|string',
            'userEmail' => 'required|string|email|max:255|unique:users',
            'userPassword' => 'required|string|min:8',
            'userImage' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $user = new User;
        $user->OfficeID = $request->input('OfficeID');
        $user->UserName = $request->input('UserName');
        $user->UserRole = $request->input('UserRole');
        $user->userPhone = $request->input('userPhone');
        $user->userEmail = $request->input('userEmail');
        $user->userPassword = Hash::make($request->input('userPassword'));

        if ($request->hasFile('userImage')) {
            $image = $request->file('userImage');
            $filename = time() . '_' . $image->getClientOriginalName();
            Storage::disk('public')->putFileAs('images/users', $image, $filename);
            $user->userImage = $filename;
        }

        $user->save();

        return response()->json($user, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $request->validate([
            'OfficeID' => 'required|exists:offices,OfficeID',
            'UserName' => 'required',
            'UserRole' => 'required',
            'userPhone' => 'required',
            'userEmail' => 'required|unique:users,userEmail,' . $id,
            'userPassword' => 'required',
            'userImage' => 'required',
        ]);

        $user = User::findOrFail($id);
        $user->OfficeID = $request->input('OfficeID');
        $user->UserName = $request->input('UserName');
        $user->UserRole = $request->input('UserRole');
        $user->userPhone = $request->input('userPhone');
        $user->userEmail = $request->input('userEmail');
        $user->userPassword = bcrypt($request->input('userPassword'));
        $user->userImage = $request->input('userImage');
        $user->save();

        return response()->json(['message' => 'User updated successfully']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = User::findOrFail($id);
    
            // Update the user object with the request data
            $user->UserName = $request->input('UserName');
            $user->UserRole = $request->input('UserRole');
            $user->userPhone = $request->input('userPhone');
            $user->userEmail = $request->input('userEmail');
            $user->userPassword = bcrypt($request->input('userPassword'));
            $user->userImage = $request->input('userImage');
            $user->isVerified = $request->input('isVerified');
    
            $user->save();
    
            // Return the updated user object and a status code of 200
            return response()->json($user, 200);
    
        } catch (\Throwable $th) {
            return response()->json(['message' => 'User update failed'], 409);
        }    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully'], 200);
    
    }
}
