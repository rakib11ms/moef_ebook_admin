<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;


class PublisherController extends Controller
{
    public function index(Request $request)
    {
        $publishers = Publisher::all();
        return response()->json(
            [
                'status' => 200,
                'publishers' => $publishers
            ]
        );
    }

    public function store(Request $request)
    {
        $publisher = Publisher::create($request->all());
        return response()->json(
            [
                'status' => 200,
                'publisher' => $publisher
            ]
        );
    }

    public function show(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'publisher' => $publisher
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        $publisher->update($request->all());
        return response()->json(
            [
                'status' => 200,
                'publisher' => $publisher
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        $publisher->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Publisher deleted successfully'
            ]
        );
    }
}
