<?php

namespace App\Http\Controllers;

use App\Models\BookReview;
use Illuminate\Http\Request;
use App\Helpers\helper;

class BookReviewController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $bookReviews = BookReview::all();
                return response()->json($bookReviews);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                try {
                    $bookReview = BookReview::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json($bookReview);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request, $id)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                try {
                    $bookReview = BookReview::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Review not found'], 404);
                }
                return response()->json($bookReview);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {

                try {
                    $bookReview = BookReview::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Review not found'], 404);
                }
                
                try {
                    $bookReview->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }

                return response()->json($bookReview);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                try {
                    $bookReview = BookReview::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Book Review not found'], 404);
                }

                try {
                    $bookReview->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Something went wrong'], 404);
                }
                return response()->json(['message' => 'Record deleted successfully'], 200);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
