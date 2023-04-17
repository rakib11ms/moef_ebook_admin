<?php
namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;
use App\Models\Token;


class Helper
{
    public static function validateToken(Request $request)
    {
        $bearerToken = $request->bearerToken();
        // $sessionToken = Session::get('bearer');
        $sessionToken = Token::where('scantum_token', $bearerToken)->take(1)->get();
        if (count($sessionToken) == 0) {
            return false;
        }
        $sessionToken = $sessionToken[0]['scantum_token'];
        
        return !$bearerToken || !$sessionToken ? false : ($bearerToken == $sessionToken ? true : false);
    }
}