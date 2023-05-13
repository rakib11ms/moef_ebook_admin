<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\MainBook;

class MainBookController extends Controller
{
  public function getAllMainBook() {
    $all_main_book = MainBook::with('bookMaster','bookChapter','bookParagraph')->get();
    return response()->json(
      [
        'status'=>200,
        'message'=>"All main book",
        'data'=>$all_main_book
      ]
    );
  }

  public function getMainBookByID($id) {
    $main_book_by_id = MainBook::with('bookMaster','bookChapter','bookParagraph')->find($id);
    return response()->json(
      [
        'status'=>200,
        'message'=>"Main book by id",
        'data'=>$main_book_by_id
      ]
    );
  }

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

  public function updateMainBook(Request $request, $id)
  {
    $main_book = MainBook::find($id);
    $main_book->update($request->all());

    return response()->json(
      [
        'status'=>200,
        'data'=>$main_book,
        'message'=>"Main book updated successfully"
      ]
    );
  }

  public function deleteMainBook($id)
  {
    $main_book = MainBook::find($id);
    $main_book->delete();

    return response()->json(
      [
        'status'=>200,
        'message'=>"Main book deleted successfully"
      ]
    );
  }

}
