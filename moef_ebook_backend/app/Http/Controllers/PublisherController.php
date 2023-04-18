<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;


class PublisherController extends Controller
{
    public function index(Request $request)
    {
        $publishers = Publisher::all();
        return response()->json($publishers);
    }

    public function store(Request $request)
    {
        $publisher = Publisher::create($request->all());
        return response()->json($publisher, 201);
    }

    public function show(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        return response()->json($publisher);
    }

    public function update(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        $publisher->update($request->all());
        return response()->json($publisher, 200);
    }

    public function destroy(Request $request, string $id)
    {
        $publisher = Publisher::findOrFail($id);
        $publisher->delete();
        return response()->json(['message' => 'Record deleted'], 200);
    }
}
