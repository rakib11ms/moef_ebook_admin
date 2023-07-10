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
    
    public function createMeeting(Request $request){
      
      $meeting=new Meeting();
      $meeting->meeting_title=$request->meeting_title;
      $meeting->meeting_link=$request->meeting_link;
      $meeting->meeting_date=$request->meeting_date;
      $meeting->meeting_time=$request->meeting_time;
      $meeting->participant_users=$request->participant_users;
      $meeting->created_by=$request->created_by;
      $meeting->save();
      return response()->json(
    [
        'status'=>200,
        'message'=>'Meeting created successfully',
    ]);
    }

    public function upcomingMeetings(){
$currentDateTime = Carbon::now()->toDateTimeString();

$upcoming_meetings = Meeting::whereRaw("CONCAT(meeting_date, ' ', meeting_time) > ?", [$currentDateTime])
    ->get();
     return response()->json(
    [
        'status'=>200,
        'upcoming_meetings'=>$upcoming_meetings,
    ]);
    }




    public function allMeetings(){
        $all=Meeting::all();
             return response()->json(
    [
        'status'=>200,
        'data'=>$all,
    ]);
    }

    public function viewParticipantUsersByMeetingId($meetingId){
  $participant_users=Meeting::where('id',$meetingId)->first();

  // dd($participant_users);
  if ($participant_users->participant_users == 'এডমিন') {

    $users = User::role('এডমিন')->get();
    return response()->json(
    [
        'status'=>200,
        'users'=>$users,
    ]);
} 
if ($participant_users->participant_users == 'মডারেটর') {
    $users = User::role('মডারেটর')->get();
      return response()->json(
    [
        'status'=>200,
        'users'=>$users,
    ]);
} 
 if($participant_users->participant_users == 'ইউজার'){
  $users = User::role('ইউজার')->select('id','UserName','userImage','email','userPhone')->get();
      return response()->json(
    [
        'status'=>200,
        'users'=>$users,
    ]);
  }
    }
}
