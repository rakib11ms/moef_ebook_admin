<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;


class AuthorController extends Controller
{

    public function index(Request $request)
    {
        $authors = Author::all();
        return response()->json($authors);
    }

    public function store(Request $request)
    {
        $author = new Author();
        $author->Name = $request->Name;
        $author->bio = $request->bio;
        $author->website_url = $request->website_url;
        $author->Created_by = auth('sanctum')->user()->UserID;
        $author->save();
        return response()->json($author, 201);
    }

    public function show(Request $request, string $id)
    {
        $author = Author::findOrFail($id);
        return response()->json($author);
    }

    public function update(Request $request, string $id)
    {
        $author = Author::findOrFail($id);
        $author->update($request->all());
        return response()->json($author, 200);
    }


    public function destroy(Request $request, int $id)
    {
        $author = Author::findOrFail($id);
        $author->delete();
        return response()->json(['message' => 'Record deleted'], 200);
    }
}
