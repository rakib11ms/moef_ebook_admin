<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;


class BookmarkController extends Controller
{
    public function index(Request $request)
    {
        $bookmarks = Bookmark::all();
        return response()->json([$bookmarks], 200);
    }

    public function store(Request $request)
    {
        $bookmark = new Bookmark();
        $bookmark->User_ID = $request->User_ID;
        $bookmark->Location = $request->Location;
        $bookmark->created_by = auth('sanctum')->user()->UserID;
        $bookmark->Book_id = $request->Book_id;
        $bookmark->save();
        return response()->json([$bookmark], 201);

    }

    public function show(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        return response()->json([$bookmark], 200);
    }

    public function update(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        $bookmark->update($request->all());
        return response()->json([$bookmark], 200);
    }

    public function destroy(Request $request, string $id)
    {
        $bookmark = Bookmark::find($id);
        $bookmark->delete();
        return response()->json(['message' => 'Deleted Successfully'], 200);
    }
}
