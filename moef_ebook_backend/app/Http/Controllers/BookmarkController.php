<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;


class BookmarkController extends Controller
{
    public function index(Request $request)
    {
        $bookmarks = Bookmark::all();
        return response()->json(
            [
                'status' => 200,
                'bookmarks' => $bookmarks
            ]
        );
    }

    public function store(Request $request)
    {
        $bookmark = new Bookmark();
        $bookmark->UserID = $request->UserID;
        $bookmark->Location = $request->Location;
        // $bookmark->created_by = auth('sanctum')->user()->UserID;
        $bookmark->created_by = $request->created_by;
        $bookmark->BookID = $request->BookID;
        $bookmark->save();
        return response()->json(
            [
                'status' => 200,
                'bookmark' => $bookmark
            ]
        );

    }

    public function show(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        return response()->json(
            [
                'status' => 200,
                'bookmark' => $bookmark
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        $bookmark->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'bookmark' => $bookmark
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        $bookmark->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Bookmark deleted successfully'
            ]
        );
    }
}
