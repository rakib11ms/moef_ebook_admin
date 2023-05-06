<?php

namespace App\Http\Controllers;

use App\Models\NewsNotice;
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
        $newsNotice->save();
        return response()->json(
            [
                'status' => 200,
                'news_notice' => $newsNotice
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
