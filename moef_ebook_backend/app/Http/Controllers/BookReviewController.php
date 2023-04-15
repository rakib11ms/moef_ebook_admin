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
                $bookReview = BookReview::create($request->all());
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
                $bookReview = BookReview::find($id);
                if(!$bookReview) {
                    return response()->json(['message' => 'No Record found'], 404);
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
                $bookReview = BookReview::find($id);
                if(!$bookReview) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $bookReview->update($request->all());
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
                $bookReview = BookReview::find($id);
                if(!$bookReview) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $bookReview->delete();
                return response()->json(['message' => 'Record deleted successfully'], 200);
            }
            
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
