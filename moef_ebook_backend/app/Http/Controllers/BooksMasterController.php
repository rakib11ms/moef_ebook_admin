<?php

namespace App\Http\Controllers;

use App\Models\BooksMaster;
use Illuminate\Http\Request;


class BooksMasterController extends Controller
{
    public function index(Request $request)
    {
        $booksMasters = BooksMaster::all();
        return response()->json($booksMasters);
    }

    public function store(Request $request)
    {
        $booksMaster = new BooksMaster();
        $booksMaster->CatID = $request->CatID;
        $booksMaster->Title = $request->Title;
        $booksMaster->author = $request->author;
        $booksMaster->short_desc = $request->short_desc;
        $booksMaster->publisher_id = $request->publisher_id;
        $booksMaster->BookCoverImage = $request->BookCoverImage;
        $booksMaster->language_id = $request->language_id;
        $booksMaster->publish_date = $request->publish_date;
        $booksMaster->file_url = $request->file_url;
        $booksMaster->created_by = auth('sanctum')->user()->UserID;
        $booksMaster->Author_id = $request->Author_id;
        $booksMaster->save();
        return response()->json($booksMaster, 201);
    }

    public function show(Request $request ,string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        return response()->json($booksMaster, 200);
    }

    public function update(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->update($request->all());
        return response()->json($booksMaster, 200);
    }

    public function destroy(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->delete();
        return response()->json(['message' => 'Deleted Successfully'], 200);
    }
}
