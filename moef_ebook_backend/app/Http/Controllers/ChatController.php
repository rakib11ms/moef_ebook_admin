<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PRedis;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendMessage(Request $request)
    {
        // $redis = PRedis::connection();

        // $data = ['message' => Request::input('message'), 'user' => Request::input('user')];

        // $redis->publish('message', json_encode($data));

        // return response()->json(['success' => true]);
        $new = new Message();
        $new->message = $request->message;
        $new->sender = $request->sender;
        $new->user_id = $request->user_id;
        $new->save();

        $response_message = DB::table('messages')->leftJoin('users', 'messages.user_id', '=', 'users.id')
            ->select('messages.id', 'messages.sender', 'messages.message', 'messages.user_id', 'users.userImage', 'messages.created_at')->orderBy('messages.id', 'desc')
            ->first();

        return response()->json(['response_message' => $response_message]);
    }

    public function getAllMessage()
    {

        $response_message = DB::table('messages')->leftJoin('users', 'messages.user_id', '=', 'users.id')
            ->select('messages.id', 'messages.sender', 'messages.message', 'messages.user_id', 'users.userImage', 'messages.created_at')
            ->get();


        return response()->json([
            'status' => 200,
            'messages' => $response_message
        ]);

    }
}