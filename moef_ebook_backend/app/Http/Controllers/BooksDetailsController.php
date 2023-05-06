<?php

namespace App\Http\Controllers;

use App\Models\BookDetails;
use Illuminate\Http\Request;


class BooksDetailsController extends Controller
{
    public function index(Request $request)
    {
        $booksDetails = BookDetails::all();
        return response()->json(
            [
                'status'=>200,
                'books_details'=>$booksDetails
            ]
        );
    }

    public function store(Request $request)
    {
        $booksDetails = new BookDetails();
        $booksDetails->bookID = $request->bookID;
        $booksDetails->ChapterID = $request->ChapterID;
        $booksDetails->ParagraphID = $request->ParagrpahID;
        $booksDetails->pageNum = $request->pageNum;
        $booksDetails->Details = $request->Details;
        // $booksDetails->created_by = auth('sanctum')->user()->UserID;
        $booksDetails->created_by = $request->created_by;
        $booksDetails->save();
        return response()->json(
            [
                'status' => 200,
                'books_details' => $booksDetails
            ]
        );
    }

    public function show(Request $request,string $id)
    {
        $booksDetails = BookDetails::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'books_details' => $booksDetails
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $booksDetails = BookDetails::findOrFail($id);
        $booksDetails->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'books_details' => $booksDetails
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $booksDetails = BookDetails::findOrFail($id);
        $booksDetails->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Book Details Deleted Successfully.'
            ]
        );
    }
}
