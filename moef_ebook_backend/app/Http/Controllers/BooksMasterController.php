<?php

namespace App\Http\Controllers;

use App\Models\BooksMaster;
use Illuminate\Http\Request;
use App\Helpers\helper;

class BooksMasterController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $booksMasters = BooksMaster::all();
                return response()->json($booksMasters);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $booksMaster = new BooksMaster;
                $booksMaster->CatID = $request->input('CatID');
                $booksMaster->Title = $request->input('Title');
                $booksMaster->author = $request->input('author');
                $booksMaster->short_desc = $request->input('short_desc');
                $booksMaster->publisher_id = $request->input('publisher_id');
                $booksMaster->BookCoverImage = $request->input('BookCoverImage');
                $booksMaster->language_id = $request->input('language_id');
                $booksMaster->publish_date = $request->input('publish_date');
                $booksMaster->file_url = $request->input('file_url');
                $booksMaster->created_by = $request->input('created_by');
                $booksMaster->Author_id = $request->input('Author_id');
                
                $booksMaster->save();
                return response()->json(['message' => 'Books Master created successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request ,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $booksMaster = BooksMaster::findOrFail($id);
                return response()->json($booksMaster);
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
                $booksMaster = BooksMaster::findOrFail($id);
                if($request->has('CatID')) {
                    $booksMaster->CatID = $request->input('CatID');
                }
                if($request->has('Title')) {
                    $booksMaster->Title = $request->input('Title');
                }
                if($request->has('author')) {
                    $booksMaster->author = $request->input('author');
                }
                if($request->has('short_desc')) {
                    $booksMaster->short_desc = $request->input('short_desc');
                }
                if($request->has('publisher_id')) {
                    $booksMaster->publisher_id = $request->input('publisher_id');
                }
                if($request->has('BookCoverImage')) {
                    $booksMaster->BookCoverImage = $request->input('BookCoverImage');
                }
                if($request->has('language_id')) {
                    $booksMaster->language_id = $request->input('language_id');
                }
                if($request->has('publish_date')) {
                    $booksMaster->publish_date = $request->input('publish_date');
                }
                if($request->has('file_url')) {
                    $booksMaster->file_url = $request->input('file_url');
                }
                if($request->has('created_by')) {
                    $booksMaster->created_by = $request->input('created_by');
                }
                if($request->has('Author_id')) {
                    $booksMaster->Author_id = $request->input('Author_id');
                }

                $booksMaster->save();
                return response()->json(['message' => $booksMaster], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $booksMaster = BooksMaster::findOrFail($id);
                $booksMaster->delete();
                return response()->json(['message' => 'Books Master deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
