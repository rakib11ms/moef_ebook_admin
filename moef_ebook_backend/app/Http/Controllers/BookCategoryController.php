<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookCategory;
use Illuminate\Support\Facades\Validator;

class BookCategoryController extends Controller
{
    public function index(Request $request)
    {
        $bookcategories = BookCategory::all();
        return response()->json(
            [
                'status' => 200,
                'bookcategories' => $bookcategories
            ]
        );
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CategoryName' => 'required|unique:book_categories',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $bookcategory = new BookCategory();
            $bookcategory->CategoryName = $request->CategoryName;
            $bookcategory->Created_by = $request->Created_by;
            $bookcategory->save();
            return response()->json(
                [
                    'status' => 200,
                    'bookcategory' => $bookcategory
                ]
            );
        }
    }

    public function show(Request $request, string $id)
    {
        $bookcategory = BookCategory::find($id);
        return response()->json(
            [
                'status' => 200,
                'bookcategory' => $bookcategory
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $bookcategory = BookCategory::findOrFail($id);
        $bookcategory->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'bookcategory' => $bookcategory
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $bookcategory = BookCategory::findOrFail($id);
        $bookcategory->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Book Category deleted successfully'
            ]
        );
    }
}
