<?php

namespace App\Http\Controllers;

use App\Models\BookParagraph;
use Illuminate\Http\Request;
use App\Helpers\helper;

class BookParagraphController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $bookParagraphs = BookParagraph::all();
                return response()->json($bookParagraphs);
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
                $bookParagraph = new BookParagraph;
                $bookParagraph->paragraphName = $request->input('paragraphName');
                $bookParagraph->bookId = $request->input('bookId');
                $bookParagraph->chapterId = $request->input('chapterId');
                
                $bookParagraph->save();
                return response()->json(['message' => $bookParagraph], 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request, $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $bookParagraph = BookParagraph::find($id);
                if(!$bookParagraph) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                return response()->json($bookParagraph);
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
                $bookParagraph = BookParagraph::find($id);
                if(!$bookParagraph) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                if($request->has('paragraphName')) {
                    $bookParagraph->paragraphName = $request->input('paragraphName');
                }
                if($request->has('bookId')) {
                    $bookParagraph->bookId = $request->input('bookId');
                }
                if($request->has('chapterId')) {
                    $bookParagraph->chapterId = $request->input('chapterId');
                }

                $bookParagraph->save();
                return response()->json(['message' => $bookParagraph], 201);
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
                $bookParagraph = BookParagraph::find($id);
                if(!$bookParagraph) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $bookParagraph->delete();
                return response()->json(['message' => 'Record deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
