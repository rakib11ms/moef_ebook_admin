<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsNoticeCategory;
use Illuminate\Support\Facades\Validator;


class NewsNoticeCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $newsNoticeCategories = NewsNoticeCategory::all();
        return response()->json($newsNoticeCategories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Name' => 'required|unique:news_notice_category|max:255',
        ]);

        if($validator->fails()) {
            return response()->json(['message' => 'Provide valid input'], 500);
        } else {
            $newsNoticeCategory = new NewsNoticeCategory();
            $newsNoticeCategory->Name = $request->Name;
            $newsNoticeCategory->created_by = auth('sanctum')->user()->UserID;
            $newsNoticeCategory->save();
            return response()->json($newsNoticeCategory, 201);
        }

    }

    public function show(Request $request,string $id)
    {
        $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
        return response()->json($newsNoticeCategory);
    }

    public function update(Request $request, string $id)
    {
        $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
        $newsNoticeCategory->update($request->all());
        return response()->json($newsNoticeCategory, 201);
    }


    public function destroy(Request $request, string $id)
    {
        $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
        $newsNoticeCategory->delete();
        return response()->json(['message' => 'News Notice Category deleted successfully'], 201);
    }
}