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
            [
                'status'=>200,
                'books_masters'=>$booksMasters
            ]
        );
    }

    public function store(Request $request)
    {
        $booksMaster = new BooksMaster();
        $booksMaster->CatID = $request->CatID;
        $booksMaster->Title = $request->Title;
        $booksMaster->short_desc = $request->short_desc;
        $booksMaster->PublisherID = $request->PublisherID;
        $booksMaster->BookCoverImage = $request->BookCoverImage;
        $booksMaster->LanguageID= $request->LanguageID;
        $booksMaster->Publish_date = $request->Publish_date;
        $booksMaster->file_url = $request->file_url;
        $booksMaster->created_by = $request->created_by;
        $booksMaster->AuthorID = $request->AuthorID;
        $booksMaster->save();
        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster,
                'message'=>"Book created successfully"
            ]
        );
    }

    public function show(Request $request ,string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Books Master deleted successfully'
            ]
        );
    }
}
