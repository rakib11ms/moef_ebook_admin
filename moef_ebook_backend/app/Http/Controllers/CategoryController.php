<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\helper;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                $categories = Category::all();
                return response()->json([$categories], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $category = Category::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json([$category], 201);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try { 
                    $category = Category::find($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => $th->getMessage()], 500);
                }
                return response()->json([$category], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $category = Category::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Category not found'], 404);
                }

                try {
                    $category->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }

                return response()->json([$category], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                try {
                    $category = Category::find($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => $th->getMessage()], 500);
                }

                try {
                    $category->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Delete all the records associated with this category first'], 409);
                }
                return response()->json(['message' => 'Record deleted'], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
