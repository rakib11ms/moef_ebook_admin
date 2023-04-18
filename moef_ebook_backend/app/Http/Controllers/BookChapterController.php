<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookChapter;


class BookChapterController extends Controller
{
    public function index(Request $request)
    {
        $bookChapters = BookChapter::all();
        return response()->json($bookChapters);
    }

    public function store(Request $request)
    {
        $bookChapter = BookChapter::create($request->all());
        return response()->json($bookChapter, 201);
    }

    public function show(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        return response()->json($bookChapter);
    }

    public function update(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        $bookChapter->update($request->all());
        return response()->json($bookChapter, 200);
    }

    public function destroy(Request $request, $id)
    {
        $bookChapter = BookChapter::findOrFail($id);
        $bookChapter->delete();
        return response()->json(['message' => 'Record deleted'], 200);
    }
}
