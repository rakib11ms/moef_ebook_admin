<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookChapter;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
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
    $validator = Validator::make(
        $request->all(),
        [
            'ChapterName' => 'unique:book_chapters,ChapterName,NULL,NULL,BookID,' . $request->input('BookID')
        ]
    );

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'validation_errors' => $validator->messages()
        ]);
    } else {
        $bookChapter = BookChapter::create($request->all());
        return response()->json(
            [
                'status' => 200,
                'bookChapter' => $bookChapter,
                'message' => "Book chapter created successfully"
            ]
        );
    }
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
