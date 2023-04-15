<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsNoticeSubCategory;
use Session;

class NewsNoticeSubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $newsNoticeSubCategories = NewsNoticeSubCategory::all();
                    return response()->json($newsNoticeSubCategories);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $clientToken = $request->header('User-Token');
        $sessionToken = Session::get('token');
        if(!$clientToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        } else if(!$sessionToken) {
            return response()->json(['message' => 'Token not found'], 401);
        } else {
            if($clientToken == $sessionToken) {
                $newsNoticeSubCategory = new NewsNoticeSubCategory;
                $newsNoticeSubCategory->Name = $request->input('Name');
                $newsNoticeSubCategory->Created_by = $request->input('created_by');
                $newsNoticeSubCategory->CategoryId = $request->input('CategoryId');
                $newsNoticeSubCategory->save();
                return response()->json(['message' => 'News Notice Sub Category created successfully'], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request ,string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                    return response()->json($newsNoticeSubCategory);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                    if($request->input('Name')) {
                        $newsNoticeSubCategory->Name = $request->input('Name');
                    }
                    if($request->input('CategoryId')) {
                        $newsNoticeSubCategory->CategoryId = $request->input('CategoryId');
                    }

                    $newsNoticeSubCategory->save();
                    return response()->json(['message' => 'News Notice Sub Category updated successfully'], 200);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');

            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $newsNoticeSubCategory = NewsNoticeSubCategory::findOrFail($id);
                    $newsNoticeSubCategory->delete();
                    return response()->json(['message' => 'News Notice Sub Category deleted successfully'], 200);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
