<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meeting;

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
}
