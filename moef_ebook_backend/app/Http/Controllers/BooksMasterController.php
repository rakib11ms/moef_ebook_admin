<?php

namespace App\Http\Controllers;

use App\Models\BooksMaster;
use Illuminate\Http\Request;


class BooksMasterController extends Controller
{
    public function index(Request $request)
    {
        $booksMasters = BooksMaster::all();
        return response()->json(
                ['status'=>200,
                    'books'=>$booksMasters
            ]

        );
    }

    public function store(Request $request)
    {
        $booksMaster = new BooksMaster();
        $booksMaster->CatID = $request->CatID;
        $booksMaster->Title = $request->Title;
        $booksMaster->short_desc = $request->short_desc;
        $booksMaster->publisherId = $request->publisher_id;
        $booksMaster->BookCoverImage = $request->BookCoverImage;
        $booksMaster->languageId = $request->language_id;
        $booksMaster->publish_date = $request->publish_date;
        $booksMaster->file_url = $request->file_url;
        $booksMaster->created_by = $request->created_by;
        $booksMaster->AuthorId = $request->Author_id;
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
