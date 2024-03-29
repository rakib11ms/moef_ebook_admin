<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Language;
use Illuminate\Http\Request;


class LanguageController extends Controller
{
    public function index(Request $request)    
    {
        $languages = Language::all();
        return response()->json(
            [
                'status'=>200,
                'languages'=>$languages
            ]
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Name' => 'required|unique:languages',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $language = new Language();
            $language->Name = $request->Name;
            $language->save();
            return response()->json(
                [
                    'status'=>200,
                    'language'=>$language
                ]
            );
        }
    }

    public function show(Request $request, string $id)
    {
        $language = Language::find($id);
        return response()->json(
            [
                'status'=>200,
                'language'=>$language
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $language = Language::findOrFail($id);
        $language->update($request->all());
        return response()->json(
            [
                'status'=>200,
                'language'=>$language
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $language = Language::findOrFail($id);
        $language->delete();
        return response()->json(
            [
                'status'=>200,
                'message'=>'Language deleted successfully.'
            ]
        );
    }
}
