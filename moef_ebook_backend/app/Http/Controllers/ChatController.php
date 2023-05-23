<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PRedis;
use App\Models\Message;
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
            $new=new Message();
            $new->message=$request->message;
            $new->sender=$request->sender;
            $new->save();
             

        return response()->json(['success' => true]);
    }

    public function getAllMessage(){
        $messages=Message::all()->take(50);
     return response()->json([
        'status' => 200,
        'messages'=>$messages
 ]);

    }
}
