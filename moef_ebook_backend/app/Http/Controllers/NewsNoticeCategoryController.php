<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsNoticeCategory;
use Session;

class NewsNoticeCategoryController extends Controller
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
                    $newsNoticeCategories = NewsNoticeCategory::all();
                    return response()->json($newsNoticeCategories);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
                    $newsNoticeCategory = new NewsNoticeCategory;
                    $newsNoticeCategory->Name = $request->input('Name');
                    $newsNoticeCategory->Created_by = $request->input('created_by');
                    $newsNoticeCategory->save();
                    return response()->json(['message' => 'News Notice Category created successfully'], 201);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
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
                    $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                    return response()->json($newsNoticeCategory);
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
                    $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                    if($request->input('Name')) {
                        $newsNoticeCategory->Name = $request->input('Name');
                    }
                    $newsNoticeCategory->save();
                    return response()->json(['message' => 'News Notice Category updated successfully'], 201);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $clientToken = $request->header('User-Token');
        $sessionToken = Session::get('token');
        if(!$clientToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        } else if(!$sessionToken) {
            return response()->json(['message' => 'Token not found'], 401);
        } else {
            if($clientToken == $sessionToken) {
                $newsNoticeCategory = NewsNoticeCategory::findOrFail($id);
                $newsNoticeCategory->delete();
                return response()->json(['message' => 'News Notice Category deleted successfully'], 201);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        }
    }
}
