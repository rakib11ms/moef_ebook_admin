<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /**
     * Ship the given order.
     */
    public function resetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
     
        if ($user) {
            $resetLink=$user->id;

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
    public function resetPasswordConfirm(Request $request,$id){
        $user = User::where('email', $request->email)->first();
        if($user){
                $user=User::find($id);
            $user->password= Hash::make($request->password);
            $user->confirm_password = Hash::make($request->confirm_password);    
            $user->update();
            return response()->json([
                'status'=>200,
                 'message'=>"Password Changed Successful"

            ]);

            }
        else{
   return response()->json([
                'status'=>200,
                 'message'=>"User not found"

            ]);
        }
    }
}