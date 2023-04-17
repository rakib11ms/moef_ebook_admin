<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;
use App\Helpers\helper;

class OfficeController extends Controller
{
    public function index(Request $request)
    {
        $isTokenValid = Helper::validateToken($request);
        if(!$isTokenValid) {
            return response()->json(['message' => 'Invalid Token'], 401);
        } else {
            $offices = Office::all();
            return response()->json($offices);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                try {
                    $office = Office::create($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input'], 500);
                }
                return response()->json($office, 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }


    public function show(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $office = Office::findOrFail($id);
                return response()->json($office);
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
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                try {
                    $office = Office::findOrFail($id);
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Not found in table'], 500);
                }

                try {
                    $office->update($request->all());
                } catch (\Throwable $th) {
                    return response()->json(['message' => 'Provide valid input'], 500);
                }
                return response()->json($office, 200);
            }
    
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Invalid Token'], 401);
            } else {
                $office = Office::findOrFail($id);
                $office->delete();
                return response()->json(['message' => 'Office deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
