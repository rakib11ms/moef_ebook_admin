<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Session;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $varifyUser = User::where('email', $email)->take(1)->get();
        if (count($varifyUser) == 0) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        foreach($varifyUser as $user) {
            $oldPassword = $user->password;
        }


        if (Hash::check($password, $oldPassword)) {
            // $token = $user->createToken('auth-token')->plainTextToken;
            // Session::put('bearer', $token);
            $isUserToken = Token::where('email', $email)->take(1)->get();
            // dd($isUserToken[0]['scantum_token']);


            if (count($isUserToken) == 0) {
                $createToken = $user->createToken('auth-token')->plainTextToken;
                $tokenValidity = date('Y-m-d H:i:s', strtotime('+1 day'));
                $token = new Token;
                $token->email = $email;
                $token->scantum_token = $createToken;
                $token->token_validity = $tokenValidity;
                $token->save();

                return response()->json(['token' => $token->scantum_token], 200);
            } else {
                foreach($isUserToken as $token) {
                    $tokenValidity = $token->token_validity;
                    $currentDate = date('Y-m-d H:i:s');
                }
                if ($currentDate > $tokenValidity) {
                    $createToken = $user->createToken('auth-token')->plainTextToken;
                    $tokenValidity = date('Y-m-d H:i:s', strtotime('+1 day'));
                    $token->scantum_token = $createToken;
                    $token->token_validity = $tokenValidity;
                    $token->save();

                    return response()->json(['token' => $token->scantum_token], 200);
                } else {
                    return response()->json(['message' => 'User Already logged in', 'token' => $token->scantum_token], 200);
                }
            }
            

        }

        return response()-> json(['message' => 'Invalid login detailssss'], 401);
    }

        
}

?>