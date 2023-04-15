<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Helpers\helper;

class AuthorController extends Controller
{

    public function index(Request $request)
    {
        $isTokenValid = Helper::validateToken($request);
        if(!$request) {
            return response()->json(['message' => 'Invalid Token'], 401);
        } else {
            $authors = Author::all();
            return response()->json($authors);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $author = new Author;
                $author->Name = $request->input('Name');
                $author->bio = $request->input('bio');
                $author->website_url = $request->input('website_url');
                $author->Created_by = $request->input('Created_by');

                $author->save();
                return response()->json($author, 201);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request, string $id)
    {   
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $author = Author::findOrFail($id);
                return response()->json($author);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);

            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $author = Author::findOrFail($id);
                $author -> update($request->all());
                $author->save();
        
                return response()->json($author, 200);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }

    }


    public function destroy(Request $request, int $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $author = Author::findOrFail($id);
                if(!$author) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $author->delete();
                return response()->json(['message' => 'Author deleted successfully'], 200);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
