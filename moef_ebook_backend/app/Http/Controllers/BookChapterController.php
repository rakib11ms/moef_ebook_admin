<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookChapter;


class BookChapterController extends Controller
{
    public function index(Request $request)
    {
        $bookChapters = BookChapter::all();
        return response()->json(
            [
                'status' => 200,
                'bookChapters' => $bookChapters
            ]
        );
    }

    public function store(Request $request)
    {
        $bookChapter = BookChapter::create($request->all());
        return response()->json(
            [
                'status' => 200,
                'bookChapter' => $bookChapter,
            'message'=>"Book chapter created successfully"

            ]
        );
    }

    public function show(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'bookChapter' => $bookChapter
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        $bookChapter->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'bookChapter' => $bookChapter
            ]
        );
    }

    public function destroy(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        $bookChapter->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'BookChapter deleted successfully'
            ]
        );
    }
}
