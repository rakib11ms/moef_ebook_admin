<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;
use Session;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clientToken = $request->header('User-Token');
        $sessionToken = Session::get('token');
        if(!$clientToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        } else if(!$sessionToken) {
            return response()->json(['message' => 'Token not found'], 401);
        } else {
            if($clientToken == $sessionToken) {
                $offices = Office::all();
                return response()->json($offices);
            } else {
                return response()->json(['message' => 'Invalid Token'], 401);
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $office = new Office();
                    $office->OfficeName = $request->input('OfficeName');
                    $office->Address = $request->input('Address');
                    $office->Created_by = $request->input('Created_by');
                    $office->save();
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }

            
            return response()->json($office, 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $office = Office::findOrFail($id);
                    return response()->json($office);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
    
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $office = Office::findOrFail($id);
    
                    if ($request->has('OfficeName')) {
                        $office->OfficeName = $request->input('OfficeName');
                    }
                    if ($request->has('Address')) {
                        $office->Address = $request->input('Address');
                    }
    
                    $office->save();
        
                    return response()->json($office, 200);
                
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
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
            $clientToken = $request->header('User-Token');
            $sessionToken = Session::get('token');
            if(!$clientToken) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else if(!$sessionToken) {
                return response()->json(['message' => 'Token not found'], 401);
            } else {
                if($clientToken == $sessionToken) {
                    $office = Office::findOrFail($id);
                    $office->delete();
                    return response()->json(['message' => 'Office deleted successfully'], 200);
                } else {
                    return response()->json(['message' => 'Invalid Token'], 401);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
