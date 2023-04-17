<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsNoticeCategory;
use App\Helpers\helper;

class NewsNoticeCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNoticeCategories = NewsNoticeCategory::all();
                return response()->json($newsNoticeCategories);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNoticeCategory = NewsNoticeCategory::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input'], 500);
                }
                return response()->json($newsNoticeCategory, 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function show(Request $request,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No NNC Found'], 500);
                }
                return response()->json($newsNoticeCategory);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No NNC Found'], 500);
                }
                try {
                    $newsNoticeCategory->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input'], 500);
                }
                return response()->json($newsNoticeCategory, 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }   
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No NNC Found'], 500);
                }
                try {
                    $newsNoticeCategory->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Something went wrong'], 500);
                }
                return response()->json(['message' => 'News Notice Category deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
