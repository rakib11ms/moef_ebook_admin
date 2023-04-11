<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::all();
        return response()->json($authors);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //response user created successfully
        return response()->json(['message' => 'Author created successfully'], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $author = new Author;
            $author->Name = $request->input('Name');
            $author->bio = $request->input('bio');
            $author->website_url = $request->input('website_url');
            $author->Created_by = $request->input('Created_by');
            
            $author->save();
            
            // Return the author object and a status code of 201
            return response()->json($author, 201);
        
        } catch (\Throwable $th) {
            //response the error
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $author = Author::findOrFail($id);
        return response()->json($author);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $author = Author::findOrFail($id);

        $author->Name = $request->input('Name');
        $author->bio = $request->input('bio');
        $author->website_url = $request->input('website_url');
        $author->save();

        return response()->json($author, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $author = Author::findOrFail($id);
        $author->Name = $request->input('Name');
        $author->bio = $request->input('bio');
        $author->website_url = $request->input('website_url');
        $author->save();

        return response()->json($author);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $author = Author::findOrFail($id);
            $author->delete();
            return response()->json(['message' => 'Author deleted successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
