<?php

namespace App\Http\Controllers;

use App\Models\BooksDetails;
use Illuminate\Http\Request;


class BooksDetailsController extends Controller
{
    public function index(Request $request)
    {
        $booksDetails = BooksDetails::all();
        return response()->json($booksDetails);
    }

    public function store(Request $request)
    {
        $booksDetails = new BooksDetails();
        $booksDetails->bookId = $request->bookId;
        $booksDetails->ChapterId = $request->ChapterId;
        $booksDetails->ParagrpahId = $request->ParagrpahId;
        $booksDetails->pageNum = $request->pageNum;
        $booksDetails->Details = $request->Details;
        // $booksDetails->created_by = auth('sanctum')->user()->UserID;
        $booksDetails->created_by = $request->created_by;
        $booksDetails->save();
        return response()->json($booksDetails, 201);
    }

    public function show(Request $request,string $id)
    {
        $booksDetails = BooksDetails::findOrFail($id);
        return response()->json($booksDetails, 200);
    }

    public function update(Request $request, string $id)
    {
        $booksDetails = BooksDetails::findOrFail($id);
        $booksDetails->update($request->all());
        return response()->json($booksDetails, 200);
    }

    public function destroy(Request $request, string $id)
    {
        $booksDetails = BooksDetails::findOrFail($id);
        $booksDetails->delete();
        return response()->json(['message' => 'Deleted Successfully'], 200);
    }
}
