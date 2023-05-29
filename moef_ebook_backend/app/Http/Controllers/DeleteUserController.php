<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class DeleteUserController extends Controller
{
    public function update($id)
    {
        // dd($id);
        $user = User::findOrFail($id);
        $user->ActiveStatus = false;
        $user->update();
        return response()->json(
            [
                'status' => 200,
                'message' => 'User deleted successfully'
            ]
        );
    }

    public function activeUser($id)
    {
        // dd($id);
        $user = User::findOrFail($id);
        $user->ActiveStatus = true;
        $user->update();
        return response()->json(
            [
                'status' => 200,
                'message' => 'User activated successfully'
            ]
        );
    }
}
