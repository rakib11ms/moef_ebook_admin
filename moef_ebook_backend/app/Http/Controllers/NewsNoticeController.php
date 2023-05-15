<?php

namespace App\Http\Controllers;

use App\Models\NewsNotice;
use App\Models\User;
use Illuminate\Http\Request;


class NewsNoticeController extends Controller
{
    public function index(Request $request)
    {
        $newsNotices = NewsNotice::with('category')->with('subCategory')->get();
        return response()->json(
            [   'status'=>200,
                'news_notices'=>$newsNotices
            ]
        );
    }

    public function store(Request $request)
    {
        $newsNotice = new NewsNotice();
        $newsNotice->Title = $request->Title;
        $newsNotice->Description = $request->Description;
        $newsNotice->CategoryId = $request->CategoryId;
        $newsNotice->subCatId = $request->subCatId;
        $newsNotice->redirect_url = $request->redirect_url;
        // $newsNotice->created_by = auth('sanctum')->user()->UserID;
        $newsNotice->created_by = $request->created_by;
   



$firebaseToken = User::whereNotNull('device_token')->pluck('device_token')->all();
// dd($firebaseToken);

        $SERVER_API_KEY = "AAAAcOAYlSo:APA91bE0CzAXkazIrOQ9ZgxSWZsnauhHyCqj-uFApit1othRezO86tcKnFYM6snYYeHD6BD7uLDPd-KRTxZUHqSk0m6rpGs1nwYghR3JFoPokBFo6T5R9co4xnTSfP0lYrzmcfCS9F4g";

        $data = [
            "registration_ids" => $firebaseToken,
            "notification" => [
                "title" => "নতুন বিজ্ঞপ্তি প্রকাশিত হলো। ",
                "body" => date('Y-m-d'),
            ]
        ];
        $dataString = json_encode($data);

        $headers = [
            'Authorization:key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

        $response = curl_exec($ch);
         $newsNotice->save();

        return response()->json(
            [
                'status' => 200,
                'news_notice' => $newsNotice,
                'message'=>"NewsNotice created successfully"
            ]
        );
    }

    public function show(Request $request ,string $id)
    {
        $newsNotice = NewsNotice::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'news_notice' => $newsNotice
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $newsNotice = NewsNotice::findOrFail($id);
        
        
        // $newsNotice->updated_by = auth('sanctum')->user()->UserID;
        $newsNotice->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'news_notice' => $newsNotice
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $newsNotice = NewsNotice::findOrFail($id);
        $newsNotice->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'News Notice deleted successfully'
            ]
        );
    }
}
