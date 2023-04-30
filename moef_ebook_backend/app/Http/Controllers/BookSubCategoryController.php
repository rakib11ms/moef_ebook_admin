<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookSubCategory;
use Illuminate\Support\Facades\Validator;

class BookSubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $subcategories = BookSubCategory::with('bookCategory')->get();
        return response()->json($subcategories);
    }

    public function getBookSubCategoryByCategoryID(Request $request, string $id)
    {
        $subcategories = BookSubCategory::where('CategoryID', $id)->get();
        return response()->json($subcategories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'SubCatName' => 'required|unique:book_sub_categories',
            'CategoryID' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $subcategory = new BookSubCategory();
            $subcategory->SubCatName = $request->SubCatName;
            $subcategory->CategoryID = $request->CategoryID;
            $subcategory->Created_by = $request->Created_by;
            $subcategory->save();
            return response()->json([$subcategory], 201);
        }
    }

    public function show(Request $request, string $id)
    {
        $subcategory = BookSubCategory::findOrFail($id);
        return response()->json([$subcategory], 200);
    }

    public function update(Request $request, string $id)
    {
        $subcategory = BookSubCategory::findOrFail($id);
        $subcategory->update($request->all());
        return response()->json([$subcategory], 200);
    }

    public function destroy(Request $request, string $id)
    {
        $subcategory = BookSubCategory::findOrFail($id);
        $subcategory->delete();
        return response()->json([$subcategory], 200);
    }
}
