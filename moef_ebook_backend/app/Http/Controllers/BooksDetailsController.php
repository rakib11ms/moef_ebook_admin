<?php

namespace App\Http\Controllers;

use App\Models\BooksDetails;
use Illuminate\Http\Request;
use App\Helpers\helper;

class BooksDetailsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $booksDetails = BooksDetails::all();
                return response()->json($booksDetails);
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
                $booksDetails = BooksDetails::create($request->all());
                
                $booksDetails->save();
                return response()->json(['message' => 'Books Details created successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $booksDetails = BooksDetails::find($id);
                return response()->json($booksDetails);
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
                $booksDetails = BooksDetails::find($id);
                if($request->has('bookId')) {
                    $booksDetails->bookId = $request->input('bookId');
                }
                if($request->has('ChapterId')) {
                    $booksDetails->ChapterId = $request->input('ChapterId');
                }
                if($request->has('ParagrpahId')) {
                    $booksDetails->ParagrpahId = $request->input('ParagrpahId');
                }
                if($request->has('pageNum')) {
                    $booksDetails->pageNum = $request->input('pageNum');
                }
                if($request->has('Details')) {
                    $booksDetails->Details = $request->input('Details');
                }
                if($request->has('created_by')) {
                    $booksDetails->created_by = $request->input('created_by');
                }

                $booksDetails->save();
                return response()->json(['message' => $booksDetails], 200);
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
                $booksDetails = BooksDetails::find($id);
                if(!$booksDetails) {
                    return response()->json(['message' => 'Books Details not found'], 404);
                }
                $booksDetails->delete();
                return response()->json(['message' => 'Books Details deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
