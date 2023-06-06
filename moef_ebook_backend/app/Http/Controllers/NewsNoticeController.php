<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SingleDocument;
use App\Models\MainBook;
use Carbon;
use File;


class NewsNoticeController extends Controller
{
    public function index(Request $request)
    {
        $newsNotices = SingleDocument::with('user')->where('type','news_notice')->orWhere('type','single_document_and_notice')->orderBy('id','desc')->get();
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
        $newsNotice->isPublished = $request->isPublished;
        $newsNotice->target_users = $request->target_users;
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

    //accept a string
    public function getNewsNoticeByOldestOrNewest($string)
    {
        //for newest get only 3 leatest news notice
        if($string == "newest"){
            $newsNotices = NewsNotice::with('category')->with('subCategory')->orderBy('created_at', 'desc')->take(3)->get();
            return response()->json(
                [   'status'=>200,
                    'news_notices'=>$newsNotices
                ]
            );
        }

        //for oldest get all news notice without the leatest 3 news notice
        if ($string == "oldest") {
            $newsNotices = NewsNotice::
                with('category')
                ->with('subCategory')
                ->orderBy('created_at', 'desc')
                ->skip(3)
                ->take(PHP_INT_MAX)
                ->get();
                
            return response()->json([
                'status' => 200,
                'news_notices' => $newsNotices
            ]);
        }
    }
}
