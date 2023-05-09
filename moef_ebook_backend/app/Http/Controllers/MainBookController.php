<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MainBook;

class MainBookController extends Controller
{
    public function createMainBook(Request $request)
    {
    
            $create_book = new MainBook();
            $create_book->book_id = $request->book_id;
            $create_book->chapter_id = $request->chapter_id;
            $create_book->paragraph_id = $request->paragraph_id;
            $create_book->book_content = $request->content;
            $create_book->created_by = $request->created_by;
            $create_book->save();
              return response()->json(
            [
                'status'=>200,
                'message'=>"Main book created successfully"
            ]
        );

}
}
