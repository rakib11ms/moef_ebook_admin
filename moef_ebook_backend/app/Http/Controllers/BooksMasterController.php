<?php

namespace App\Http\Controllers;

use App\Models\BooksMaster;
use Illuminate\Http\Request;
use App\Helpers\helper;

class BooksMasterController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Helper::validateToken($request);
            if(!$response) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $booksMasters = BooksMaster::all();
                return response()->json($booksMasters);
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
                    $booksMaster = BooksMaster::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json(['message' => 'Books Master created successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
        
    }

    public function show(Request $request ,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                try {
                    $booksMaster = BooksMaster::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Master not found'], 404);
                }
                return response()->json($booksMaster);
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
                    $booksMaster = BooksMaster::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Master not found'], 404);
                }

                try {
                    $booksMaster->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }

                return response()->json(['message' => $booksMaster], 200);
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
                    $booksMaster = BooksMaster::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Books Master not found'], 404);
                }
                
                try {
                    $booksMaster->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Something went wrong'], 404);
                }
                return response()->json(['message' => 'Books Master deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
