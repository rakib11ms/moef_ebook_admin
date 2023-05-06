<?php

namespace App\Http\Controllers;

use App\Models\BookReview;
use Illuminate\Http\Request;


class BookReviewController extends Controller
{
    public function index(Request $request)
    {
        $bookReviews = BookReview::all();
        return response()->json(
            [
                'status'=>200,
                'book_reviews'=>$bookReviews
            ]
        );
    }

    public function store(Request $request)
    {
        $bookReview = BookReview::create($request->all());
        return response()->json(
            [
                'status'=>200,
                'book_review'=>$bookReview
            ]
        );
    }

    public function show(Request $request, $id)
    {
        $bookReview = BookReview::findOrFail($id);
        return response()->json(
            [
                'status'=>200,
                'book_review'=>$bookReview
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $bookReview = BookReview::findOrFail($id);
        $bookReview->update($request->all());
        return response()->json(
            [
                'status'=>200,
                'book_review'=>$bookReview
            ]
        );
    }

    public function destroy(Request $request, $id)
    {
        $bookReview = BookReview::findOrFail($id);
        $bookReview->delete();
        return response()->json(
            [
                'status'=>200,
                'message'=>'BookReview deleted successfully'
            ]
        );
    }
}
