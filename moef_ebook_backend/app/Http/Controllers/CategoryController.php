<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        return response()->json(

            $categories, 200)
        ;
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CategoryName' => 'required|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $category = new Category();
            $category->CategoryName = $request->CategoryName;
            $category->Created_by = $request->Created_by;
            $category->save();
            return response()->json([$category], 201);
        }
    }

    public function show(Request $request, string $id)
    {
        $category = Category::find($id);
        return response()->json([$category], 200);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json([$category], 200);
    }

    public function destroy(Request $request, string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
