<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
 
class ResetPasswordController extends Controller
{
    /**
     * Ship the given order.
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $resetLink = url('/reset-password-view/' . $user->id);
            // dd($resetLink);
            // dd($user->email);
            $res =  Mail::to($user->email)->send(new ResetPassword($resetLink));
            dd($res);
            return redirect()->back()->with('message', 'Reset password link sent on your email id.');
        }
        return redirect()->back()->with('message', 'User not found!');
    }
}