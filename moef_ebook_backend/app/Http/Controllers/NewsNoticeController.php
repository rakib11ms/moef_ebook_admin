<?php

namespace App\Http\Controllers;

use App\Models\NewsNotice;
use Illuminate\Http\Request;
use App\Helpers\helper;

class NewsNoticeController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotices = NewsNotice::all();
                return response()->json($newsNotices);
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
                    $newsNotice = NewsNotice::create($request->all());
                    return response()->json($newsNotice);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input.'], 500);
                }
                return response()->json(['message' => 'News Notice created successfully'], 200);
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
                    $newsNotice = NewsNotice::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Found'], 500);
                }
                return response()->json($newsNotice);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            // dd($request->all());
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $newsNotice = NewsNotice::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Found'], 500);
                }
                try {
                    $newsNotice->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input.'], 500);
                }

                return response()->json(['message' => $newsNotice], 200);
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
                    $newsNotice = NewsNotice::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'No News Notice Found'], 500);
                }
                try {
                    $newsNotice->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Something went wrong'], 500);
                }
                return response()->json(['message' => 'News Notice deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
