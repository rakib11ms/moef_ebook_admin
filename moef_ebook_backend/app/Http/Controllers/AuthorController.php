<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Author;
use Session;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clientToken = $request->header('User-Token');
        $sessionToken = Session::get('token');
        if(!$clientToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        } else if(!$sessionToken) {
            return response()->json(['message' => 'Token not found'], 401);
        } else {
            if($clientToken == $sessionToken) {
                $authors = Author::all();
                return response()->json($authors);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        }
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
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');

            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $author = new Author;
                    $author->Name = $request->input('Name');
                    $author->bio = $request->input('bio');
                    $author->website_url = $request->input('website_url');
                    $author->Created_by = $request->input('Created_by');
                    
                    $author->save();
                    
                    // Return the author object and a status code of 201
                    return response()->json($author, 201);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            //response the error
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {   
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            // dd($clientToken);
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $author = Author::findOrFail($id);
                    return response()->json($author);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');

            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $author = Author::findOrFail($id);
                    if($request->input('Name')) {
                        $author->Name = $request->input('Name');
                    }
                    if($request->input('bio')) {
                        $author->bio = $request->input('bio');
                    }

                    if($request->input('website_url')) {
                        $author->website_url = $request->input('website_url');
                    }
                    
                    $author->save();
            
                    return response()->json($author, 200);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }

        } catch (\Throwable $th) {
            //response the error
            return response()->json(['message' => $th->getMessage()], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $author = Author::findOrFail($id);
                    $author->delete();
                    return response()->json(['message' => 'Author deleted successfully'], 200);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
