<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Office;


class OfficeController extends Controller
{
    public function index(Request $request)
    {
        $offices = Office::all();
        return response()->json(
            [
                'status' => 200,
                'offices' => $offices
            ]
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'OfficeName' => 'required|unique:offices|max:255',
        ]);

        if($validator->fails()) {
            return response()->json(['message' => 'Office Name Exists'], 500);
        } else {
            $office = new Office();
            $office->OfficeName = $request->OfficeName;
            $office->Address = $request->Address;
            // $office->created_by = auth('sanctum')->user()->UserID;
            $office->Created_by = $request->Created_by;
            $office->save();
            return response()->json(
                [
                    'status' => 200,
                    'office' => $office
                ]
            );
        }
    }


    public function show(Request $request, string $id)
    {
        $office = Office::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'office' => $office
            ]
        );
    }


    public function update(Request $request, string $id)
    {
        $office = Office::findOrFail($id);
        $office->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'office' => $office
            ]
        );
    }

    public function destroy(Request $request,string $id)
    {
        $office = Office::findOrFail($id);
        $office->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Office deleted successfully'
            ]
        );
    }
}
