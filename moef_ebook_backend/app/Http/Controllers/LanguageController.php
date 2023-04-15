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
                $language = Language::create($request->all());
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
                $language = Language::find($id);
                if (!$language) {
                    return response()->json(['message' => 'No Record found'], 404);
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
                $language = Language::find($id);
                if (!$language) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $language->update($request->all());
                return response()->json(['message' => $language], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Language $language)
    {
        try {
            $isTokenValid = helper::validateToken($request);
            if ($isTokenValid) {
                $language = Language::find($id);
                if (!$language) {
                    return response()->json(['message' => 'No Record found'], 404);
                }
                $language->delete();
                return response()->json(['message' => 'Language deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
