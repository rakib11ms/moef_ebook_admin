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
                try {
                    $booksDetails = BooksDetails::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
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
                try {
                    $booksDetails = BooksDetails::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Details not found'], 404);
                }
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
                try {
                    $booksDetails = BooksDetails::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Details not found'], 404);
                }

                try {
                    $booksDetails->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }

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
                try {
                    $booksDetails = BooksDetails::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Details not found'], 404);
                }

                try {
                    $booksDetails->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Details not found'], 404);
                }
                
                return response()->json(['message' => 'Books Details deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
