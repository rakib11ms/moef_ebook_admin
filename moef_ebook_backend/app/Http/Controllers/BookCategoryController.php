<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookCategory;
use Illuminate\Support\Facades\Validator;

class BookCategoryController extends Controller
{
    public function index()
    {
        $bookcategories = BookCategory::all();
        return response()->json(
            [
                'status' => 200,
                'bookcategories' => $bookcategories
            ]
        );
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CategoryName' => 'required|unique:book_categories',
            // CategoryIcon type png only and size can be 1 mb max
            // 'CategoryIcon' => 'max:100000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $bookcategory = new BookCategory();
            $bookcategory->CategoryName = $request->CategoryName;
            $bookcategory->Created_by = $request->Created_by;

            if($request->hasFile('CategoryIcon')){
                $file = $request->file('CategoryIcon');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/bookcategory/', $filename);
                $bookcategory->CategoryIcon = $filename;
            }else{
                $bookcategory->CategoryIcon = 'default.png';
            }

            $bookcategory->save();
            return response()->json(
                [
                    'status' => 200,
                    'bookcategory' => $bookcategory
                ]
            );
        }
    }

    public function show(Request $request, string $id)
    {
        $bookcategory = BookCategory::find($id);
        return response()->json(
            [
                'status' => 200,
                'bookcategory' => $bookcategory
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $bookcategory = BookCategory::findOrFail($id);
        if ($request->has('CategoryName')) {
            $bookcategory->CategoryName = $request->CategoryName;
        }
        if($request->hasFile('CategoryIcon')){
            // delete old image
            $old_icon = $bookcategory->CategoryIcon;
            if($old_icon != 'default.png' && $old_icon != null){
                $image_path = public_path('uploads/bookcategory/' . $old_icon);
                if(file_exists($image_path)){
                    unlink($image_path);
                }
            }
            // upload new image
            $file = $request->file('CategoryIcon');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('uploads/bookcategory/', $filename);
            $bookcategory->CategoryIcon = $filename;
        }
        $bookcategory->update();
        return response()->json(
            [
                'status' => 200,
                'data' => $bookcategory
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $bookcategory = BookCategory::findOrFail($id);
        $bookcategory->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Book Category deleted successfully'
            ]
        );
    }
}
