<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\NewsNoticeSubCategory;
use Illuminate\Http\Request;


class NewsNoticeSubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $newsNoticeSubCategories = NewsNoticeSubCategory::with('categoryName')->get();
        return response()->json([
            'status'=>200,
            'news_notices_sub_categories'=>$newsNoticeSubCategories
        ]);
    }

    public function getSubCategoryByCategoryID(Request $request, string $id)
    {
        $newsNoticeSubCategories = NewsNoticeSubCategory::where('CategoryId', $id)->get();
        return response()->json($newsNoticeSubCategories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Name' => 'required|unique:news_notice_sub_categories|max:255',
        ]);
        
        if($validator->fails()) {
            return response()->json(['message' => 'Provide valid input'], 500);
        } else {
            $newsNoticeSubCategory = new NewsNoticeSubCategory();
            $newsNoticeSubCategory->Name = $request->Name;
            $newsNoticeSubCategory->CategoryId = $request->CategoryId;
            // $newsNoticeSubCategory->created_by = auth('sanctum')->user()->UserID;
            $newsNoticeSubCategory->created_by = $request->created_by;
            $newsNoticeSubCategory->save();
            return response()->json($newsNoticeSubCategory, 201);
        }
    }

    public function show(Request $request ,string $id)
    {
        $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
        return response()->json($newsNoticeSubCategory);
    }

    public function update(Request $request, string $id)
    {
        $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
        $newsNoticeSubCategory->update($request->all());
        return response()->json($newsNoticeSubCategory, 201);
    }

    public function destroy(Request $request, string $id)
    {
        $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
        $newsNoticeSubCategory->delete();
        return response()->json(['message' => 'News Notice Sub Category deleted successfully'], 201);
    }
}
