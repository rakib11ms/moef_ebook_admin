<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meeting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class MeetingController extends Controller
{

    public function createMeeting(Request $request)
    {

        $links=['https://meet.google.com/ywp-qapp-zie',
'https://meet.google.com/ajs-wwez-gfi',
'https://meet.google.com/kvx-ynhs-rtj',
'https://meet.google.com/znc-izze-puj',
'https://meet.google.com/bsk-cate-zdc',
'https://meet.google.com/iuf-hwqo-yvr',
'https://meet.google.com/kkt-xodf-psm',
'https://meet.google.com/bcr-huri-hkd',
'https://meet.google.com/fev-urte-wrm',
'https://meet.google.com/cqw-mveu-rnb',
'https://meet.google.com/cpc-kpfj-ftt',
'https://meet.google.com/ugn-pfyq-gvi',
'https://meet.google.com/kyt-kiey-isa',
'https://meet.google.com/ent-nbns-vrj',
'https://meet.google.com/eez-vwoy-ret',
'https://meet.google.com/ppr-hegy-dtx',
'https://meet.google.com/bbs-joex-eew',
'https://meet.google.com/nnj-xbnj-pvd',
'https://meet.google.com/pra-bxnk-qgi',
'https://meet.google.com/xtr-jjoh-jqu',
'https://meet.google.com/dvm-svnj-eug',
'https://meet.google.com/igf-rfhw-jik',
'https://meet.google.com/juu-mqsg-xeh',
'https://meet.google.com/znw-uxoi-xuh',
'https://meet.google.com/gvx-pdau-dea',
'https://meet.google.com/kvt-bvey-ewr',

'https://meet.google.com/kvd-jqkj-ijq'];

    $randomIndex = array_rand($links);
    $randomLink = $links[$randomIndex];

        $meeting = new Meeting();
        $meeting->meeting_title = $request->meeting_title;
        // $meeting->meeting_link = $request->meeting_link;
    $meeting->meeting_link = $randomLink;

        $meeting->meeting_date = $request->meeting_date;
        $meeting->meeting_time = $request->meeting_time;
        $meeting->participant_users = $request->participant_users;
        $meeting->created_by = $request->created_by;
        $meeting->save();

         $firebaseToken = User::whereNotNull('device_token')->pluck('device_token')->all();

        $SERVER_API_KEY = "AAAAlxMWmLE:APA91bGE4xTGl3u7MOzRH4gOKSVM00Cp46ILE3Dn9YywzM-Jip-dFBzdtQaMd4eOTmKGEnRT9AAENpCaxYx9g51JdG0i7btNE53DmYj2-tA5vEPkKKaPRP-ETxTx9JpaNXO0IMzxIA29";

        $data = [
            "users" => $firebaseToken,
            "notification" => [
                "title" => $request->meeting_title,
                "body" => $request->meeting_date .'|'. $request->meeting->time,
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




        return response()->json(
            [
                'status' => 200,
                'message' => 'Meeting created successfully',
            ]
        );
    }

    public function upcomingMeetings()
    {
        $currentDateTime = Carbon::now()->toDateTimeString();

        $upcoming_meetings = Meeting::whereRaw("CONCAT(meeting_date, ' ', meeting_time) > ?", [$currentDateTime])
            ->get();
        return response()->json(
            [
                'status' => 200,
                'upcoming_meetings' => $upcoming_meetings,
            ]
        );
    }




    public function allMeetings()
    {
        $all = Meeting::orderBy('id','desc')->get();
        return response()->json(
            [
                'status' => 200,
                'data' => $all,
            ]
        );
    }

     public function allOldMeetings(){
     $currentDateTime = Carbon::now()->toDateTimeString();

        $old_meetings = Meeting::whereRaw("CONCAT(meeting_date, ' ', meeting_time) < ?", [$currentDateTime])
            ->get();
         return response()->json(
            [
                'status' => 200,
                'data' => $old_meetings,
            ]
        );
    }

    public function viewParticipantUsersByMeetingId($meetingId)
    {
        $participant_users = Meeting::where('id', $meetingId)->first();

        // dd($participant_users);
        if ($participant_users->participant_users == 'এডমিন') {

            $users = User::role('এডমিন')->get();
            return response()->json(
                [
                    'status' => 200,
                    'users' => $users,
                ]
            );
        }
        if ($participant_users->participant_users == 'মডারেটর') {
            $users = User::role('মডারেটর')->get();
            return response()->json(
                [
                    'status' => 200,
                    'users' => $users,
                ]
            );
        }
        if ($participant_users->participant_users == 'ইউজার') {
            $users = User::role('ইউজার')->select('id', 'UserName', 'userImage', 'email', 'userPhone')->get();
            return response()->json(
                [
                    'status' => 200,
                    'users' => $users,
                ]
            );
        }
    }

    public function meetingJoinedUsers(Request $request,$meetingId)
    {
        $meeting = Meeting::find($meetingId);

        // Split the existing values into an array

        if ($meeting->meeting_joined_users) {
            $existingValues = explode(',', $meeting->meeting_joined_users);

        }

        // Split the new values into an array
        if ($meeting->meeting_joined_users) {
            $newValues = explode(',', $request->userId);
        }

        // Merge the existing and new values, removing duplicates

        if($meeting->meeting_joined_users){
        $mergedValues = array_unique(array_merge($existingValues, $newValues));
        // Convert the array back to a comma-separated string
        $updatedValues = implode(',', $mergedValues);
                $meeting->meeting_joined_users = $updatedValues;
        $meeting->update();
        }



        return response()->json(
            [
                'status' => 200,
                'message'=>'user joined this meeting',
                // 'meeting_data' => $meeting,
            ]
        );


    }

     public function userJoinedMeetings($userId){
$meetings = Meeting::whereRaw('FIND_IN_SET(?, meeting_joined_users)', [$userId])->get();
      return response()->json(
            [
                'status' => 200,
                'joined_meetings'=>$meetings,
            ]
        ); 
    
}

     public function userUnJoinedMeetings($userId){
$meetingsJoined = Meeting::whereRaw('FIND_IN_SET(?, meeting_joined_users)', [$userId])->get();

$meetingsNotJoined = Meeting::whereNotIn('id', function ($query) use ($userId) {
    $query->select('meeting_joined_users')
          ->from('meetings')
          ->where('user_id', $userId);
})->get();

      return response()->json(
            [
                'status' => 200,
                'unJoined_meetings'=>$meetingsNotJoined,
            ]
        ); 
    
}

// function generateRandomGoogleMeetLink()
// {
//     function  callFunc(){
//     $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
//     $link = 'https://meet.google.com/';

//     for ($i = 0; $i < 10; $i++) {
//         $link .= $characters[rand(0, strlen($characters) - 1)];
//     }

//     return $link;
//     }
// // Generate a random Google Meet link
// $randomLink = callFunc();
// echo $randomLink;
// }



}