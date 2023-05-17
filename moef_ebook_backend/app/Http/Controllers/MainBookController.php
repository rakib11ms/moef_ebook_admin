<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\MainBook;
use App\Models\BooksMaster;

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
    $create_book->isPublished = $request->isPublished;
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

  public function getChaptersByBookID($id) {
    $chapters_by_book_id = MainBook::with('bookChapter')->where('book_id',$id)->get();
    return response()->json(
      [
        'status'=>200,
        'message'=>"Chapters by book id",
        'data'=>$chapters_by_book_id
      ]
    );
  }

  public function getAllBookCountByChapterAndParagraph() {
    // return only book name once and the counts of chapter and paragraph of the book
    $all_book_count = MainBook::with('bookMaster')->select('book_id','chapter_id','paragraph_id')->get();

    $book_count = array();
    foreach($all_book_count as $book) {
      $book_count[$book->book_id]['Title'] = $book->bookMaster->Title;
      $book_count[$book->book_id]['chapter_count'] = MainBook::where('book_id',$book->book_id)->count();
      $book_count[$book->book_id]['paragraph_count'] = MainBook::where('book_id',$book->book_id)->count();
    }

    return response()->json(
      [
        'status'=>200,
        'message'=>"All book count",
        'data'=>$book_count
      ]
    );
  }

}
