<?php

namespace App\Http\Controllers;

use App\Models\NewsNoticeSubCategory;
use Illuminate\Http\Request;
use App\Helpers\helper;

class NewsNoticeSubCategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $newsNoticeSubCategories = NewsNoticeSubCategory::all();
                return response()->json($newsNoticeSubCategories);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
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
                    $newsNoticeSubCategory = NewsNoticeSubCategory::create($request->all());
                    return response()->json($newsNoticeSubCategory);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid Publisher ID or Category ID.'], 500);
                }
                return response()->json(['message' => 'News Notice Sub Category created successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request ,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Sub Category Found'], 500);
                }
                return response()->json($newsNoticeSubCategory);
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
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Sub Category Found'], 500);
                }
                try {
                    $newsNoticeSubCategory->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid Publisher ID or Category ID.'], 500);
                }
                return response()->json(['message' => $newsNoticeSubCategory], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
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
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Sub Category Found'], 500);
                }
                try {
                    $newsNoticeSubCategory->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Something went wrong'], 500);
                }
                return response()->json(['message' => 'News Notice Sub Category deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
