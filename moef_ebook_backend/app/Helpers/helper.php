<?php
namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;


class Helper
{
    public static function validateToken(Request $request)
    {
        $bearerToken = $request->bearerToken();
        $sessionToken = Session::get('bearer');
        return !$bearerToken || !$sessionToken ? false : ($bearerToken == $sessionToken ? true : false);
    }
}