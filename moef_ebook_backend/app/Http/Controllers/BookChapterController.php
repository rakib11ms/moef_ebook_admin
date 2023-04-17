<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookChapter;
use App\Helpers\helper;

class BookChapterController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $bookChapters = BookChapter::all();
                return response()->json($bookChapters);
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
                    $bookChapter = BookChapter::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json(['message' => $bookChapter], 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request, $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $bookChapter = BookChapter::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Chapter not found'], 404);
                }
                return response()->json($bookChapter);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $bookChapter = BookChapter::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Chapter not found'], 404);
                }
                
                try {
                    $bookChapter->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json(['message' => $bookChapter], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $bookChapter = BookChapter::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Chapter not found'], 404);
                }
                $bookChapter->delete();
                return response()->json(['message' => 'Book Chapter deleted'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
