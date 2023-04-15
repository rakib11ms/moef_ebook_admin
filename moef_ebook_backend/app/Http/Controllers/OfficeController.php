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
                $office = new Office();
                $office->OfficeName = $request->input('OfficeName');
                $office->Address = $request->input('Address');
                $office->Created_by = $request->input('Created_by');
                $office->save();
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
                $office = Office::findOrFail($id);
    
                if ($request->has('OfficeName')) {
                    $office->OfficeName = $request->input('OfficeName');
                }
                if ($request->has('Address')) {
                    $office->Address = $request->input('Address');
                }
                $office->save();
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
