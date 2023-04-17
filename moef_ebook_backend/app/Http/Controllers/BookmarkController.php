<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Helpers\helper;

class BookmarkController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                $bookmarks = Bookmark::all();
                return response()->json([$bookmarks], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $bookmark = Bookmark::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json([$bookmark], 201);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try { 
                    $bookmark = Bookmark::find($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => $th->getMessage()], 500);
                }
                return response()->json([$bookmark], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $bookmark = Bookmark::find($id);
                    $bookmark->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json([$bookmark], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $bookmark = Bookmark::find($id);
                    $bookmark->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Bookmark not found'], 404);
                }
                return response()->json(['message' => 'Bookmark deleted'], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
