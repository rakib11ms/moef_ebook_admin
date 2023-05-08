<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
 
class ResetPasswordController extends Controller
{
    /**
     * Ship the given order.
     */
    public function resetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        // dd($user);
        if ($user) {
            // $resetLink = url('/localhost:3000/reset-password-confirm/' . $user->id);
            $resetLink = $user->id;
                // dd($resetLink);
            $res =  Mail::to($user->email)->send(new ResetPassword($resetLink));
            // dd($res);
            return response()->json([
                'status'=>200,
                'message'=>"Password reset link has been sent to your email"
            ]);
        }
        else {
             return response()->json([
                'status'=>200,
                'message'=>"User not found!"
            ]);
        }
    }
}