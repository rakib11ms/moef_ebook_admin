<?php

namespace App\Http\Controllers;

use App\Models\NewsNotice;
use Illuminate\Http\Request;
use App\Helpers\helper;

class NewsNoticeController extends Controller
{
    public function index(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotices = NewsNotice::all();
                return response()->json($newsNotices);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotice = new NewsNotice;
                $newsNotice->Title = $request->input('Title');
                $newsNotice->Description = $request->input('Description');
                $newsNotice->image = 'NA';
                $newsNotice->CategoryId = $request->input('CategoryId');
                $newsNotice->subCatId = $request->input('subCatId');
                $newsNotice->redirect_url = $request->input('redirect_url');
                $newsNotice->created_by = $request->input('created_by');
                $newsNotice->updated_by = $request->input('updated_by');;
                $newsNotice->save();
                return response()->json(['message' => 'News Notice created successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function show(Request $request ,string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotice = NewsNotice::findOrFail($id);
                return response()->json($newsNotice);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            // dd($request->all());
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotice = NewsNotice::findOrFail($id);

                if($request->has('Title')) {
                    $newsNotice->Title = $request->input('Title');
                }
                if($request->has('Description')) {
                    $newsNotice->Description = $request->input('Description');
                }
                if($request->has('image')) {
                    $newsNotice->image = $request->input('image');
                }
                if($request->has('CategoryId')) {
                    $newsNotice->CategoryId = $request->input('CategoryId');
                }
                if($request->has('subCatId')) {
                    $newsNotice->subCatId = $request->input('subCatId');
                }
                if($request->has('redirect_url')) {
                    $newsNotice->redirect_url = $request->input('redirect_url');
                }
                if($request->has('updated_by')) {
                    $newsNotice->updated_by = $request->input('updated_by');
                }
                if($request->has('isPublished')) {
                    $newsNotice->isPublished = $request->input('isPublished');
                }

                $newsNotice->save();
                return response()->json(['message' => $newsNotice], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        try {
            $isTokenValid = Helper::validateToken($request);
            if(!$isTokenValid) {
                return response()->json(['message' => 'Token not provided'], 401);
            } else {
                $newsNotice = NewsNotice::findOrFail($id);
                $newsNotice->delete();
                return response()->json(['message' => 'News Notice deleted successfully'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
