<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Helpers\helper;

class PublisherController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                $publishers = Publisher::all();
                return response()->json([$publishers], 200);
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
                    $publisher = Publisher::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json([$publisher], 201);
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
                    $publisher = Publisher::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Publisher not found'], 404);
                }

                return response()->json([$publisher], 200);
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
                    $publisher = Publisher::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Publisher not found'], 404);
                }

                try {
                    $publisher->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }

                return response()->json([$publisher], 200);
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
                    $publisher = Publisher::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Publisher not found'], 404);
                }

                try {
                    $publisher->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Cannot delete this record'], 409);
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
