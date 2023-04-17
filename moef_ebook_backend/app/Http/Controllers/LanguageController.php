<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use App\Helpers\helper;

class LanguageController extends Controller
{
    public function index(Request $request)    
    {
        try {
            $istokenValid = helper::validateToken($request);
            if ($istokenValid) {
                $languages = Language::all();
                return response()->json([$languages], 200);
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
                    $language = Language::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json(['message' => $language], 200);
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
                    $language = Language::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Language not found'], 404);
                }
 
                return response()->json(['message' => $language], 200);
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
                    $language = Language::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Language not found'], 404);
                }
                try {
                    $language->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide correct inputs with right foreign key'], 409);
                }
                return response()->json(['message' => $language], 200);
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
                    $language = Language::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Language not found'], 404);
                }

                try {
                    $language->delete();
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Language not found'], 404);
                }

                return response()->json(['message' => 'Language deleted successfully'], 200);

            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
