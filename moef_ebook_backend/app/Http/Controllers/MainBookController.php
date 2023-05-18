<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\MainBook;
use App\Models\BookChapter;
use App\Models\BookParagraph;
use App\Models\SingleDocument;

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

  public function getChaptersByBookID($id) 
  {
    $chapters_by_book_id = MainBook::with('bookChapter')->where('book_id',$id)->get();
    return response()->json(
      [
        'status'=>200,
        'message'=>"Chapters by book id",
        'data'=>$chapters_by_book_id
      ]
    );
  }

  public function getAllBookCountByChapterAndParagraph() 
  {
    $all_book_count = MainBook::with('bookMaster')->select('book_id', 'chapter_id', 'paragraph_id')->get();

    $book_count = array();
    $book_ids = array();
    
    foreach ($all_book_count as $book) {
      $book_id = $book->book_id;
        
      if (in_array($book_id, $book_ids)) {
        continue;
      }
        
      $book_count[] = [
        'book_id' => $book_id,
        'Title' => $book->bookMaster->Title,
        'chapter_count' => BookChapter::where('BookID', $book_id)->count(),
        'paragraph_count' => BookParagraph::where('BookID', $book_id)->count(),
      ];

      $book_ids[] = $book_id;
    }

    return response()->json([
      'status' => 200,
      'message' => "All book count",
      'data' => $book_count
    ]);
  }

  public function getAllMainBooksAndSingleDocumentsInDecendingOrder() 
  {
    $all_main_book = MainBook::with('bookMaster')->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'book_id' => $item->book_id,
        'chapter_id' => $item->chapter_id,
        'paragraph_id' => $item->paragraph_id,
        'book_content' => $item->book_content,
        'created_by' => $item->created_by,
        'isPublished' => $item->isPublished,
        'created_at' => $item->created_at,
        'updated_at' => $item->updated_at,
        'book_master_title' => $item->bookMaster->Title,
        'type' => $item->type
      ];
    });

    $all_single_document = SingleDocument::get();

    $all_main_book_and_single_document = $all_main_book->merge($all_single_document);

    $sorted_collection = $all_main_book_and_single_document->sortByDesc('created_at')->values()->all();

    return response()->json(
      [
        'status'=>200,
        'message'=>"All main book and single document in descending order",
        'data'=>$sorted_collection
      ]
    );
  }

  // public function getAllMainBooksAndSingleDocsForASpecificUser($id) 
  // {
  //   $all_main_book = MainBook::with('bookMaster')->where('created_by', $id)->get()->map(function ($item, $key) {
  //     return [
  //       'id' => $item->id,
  //       'book_id' => $item->book_id,
  //       'chapter_id' => $item->chapter_id,
  //       'paragraph_id' => $item->paragraph_id,
  //       'book_content' => $item->book_content,
  //       'created_by' => $item->created_by,
  //       'isPublished' => $item->isPublished,
  //       'created_at' => $item->created_at,
  //       'updated_at' => $item->updated_at,
  //       'title' => $item->bookMaster->Title,
  //       'type' => $item->type
  //     ];
  //   });

  //   // return document_title as title
  //   $all_single_document = SingleDocument::where('created_by', $id)->get()->map(function ($item, $key) {
  //     return [
  //       'id' => $item->id,
  //       'title' => $item->document_title,
  //       'document_content' => $item->document_content,
  //       'created_by' => $item->created_by,
  //       'isPublished' => $item->isPublished,
  //       'created_at' => $item->created_at,
  //       'updated_at' => $item->updated_at,
  //       'type' => $item->type
  //     ];
  //   });



  //   $all_main_book_and_single_document = $all_main_book->merge($all_single_document);

  //   // $sorted_collection = $all_main_book_and_single_document->sortByDesc('created_at')->values()->all();

  //   return response()->json(
  //     [
  //       'status'=>200,
  //       'message'=>"All main book and single document in descending order",
  //       'data'=>$all_main_book_and_single_document
  //     ]
  //   );
  // }

  // public function getAllMainBooksAndSingleDocsForASpecificUser($id) 
  // {
  //   $all_main_book = MainBook::with('bookMaster')->where('created_by', $id)->get()->map(function ($item, $key) {
  //     return [
  //       'id' => $item->id,
  //       'book_id' => $item->book_id,
  //       'chapter_id' => $item->chapter_id,
  //       'paragraph_id' => $item->paragraph_id,
  //       'book_content' => $item->book_content,
  //       'created_by' => $item->created_by,
  //       'isPublished' => $item->isPublished,
  //       'created_at' => $item->created_at,
  //       'updated_at' => $item->updated_at,
  //       'title' => $item->bookMaster->Title,
  //       'type' => $item->type
  //     ];
  //   });
  
  //   // Group by book_id and extract the first item from each group
  //   $unique_main_books = $all_main_book->groupBy('book_id')->map(function ($group) {
  //     return $group->first();
  //   })->values();
  
  //   // return document_title as title
  //   $all_single_document = SingleDocument::where('created_by', $id)->get()->map(function ($item, $key) {
  //     return [
  //       'id' => $item->id,
  //       'title' => $item->document_title,
  //       'document_content' => $item->document_content,
  //       'created_by' => $item->created_by,
  //       'isPublished' => $item->isPublished,
  //       'created_at' => $item->created_at,
  //       'updated_at' => $item->updated_at,
  //       'type' => $item->type
  //     ];
  //   });
  
  //   $all_main_book_and_single_document = $unique_main_books->merge($all_single_document);
  
  //   return response()->json(
  //     [
  //       'status' => 200,
  //       'message' => "All main book and single document in descending order",
  //       'data' => $all_main_book_and_single_document
  //     ]
  //   );
  // }
  

  public function getAllMainBooksAndSingleDocsForASpecificUser($id) 
  {
    $all_main_book = MainBook::with('bookMaster')->where('created_by', $id)->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'book_id' => $item->book_id,
        'chapter_id' => $item->chapter_id,
        'paragraph_id' => $item->paragraph_id,
        'book_content' => $item->book_content,
        'created_by' => $item->created_by,
        'isPublished' => $item->isPublished,
        'created_at' => $item->created_at,
        'updated_at' => $item->updated_at,
        'title' => $item->bookMaster->Title,
        'type' => $item->type
      ];
    });
  
    // Group by book_id and extract the first item from each group
    $unique_main_books = $all_main_book->groupBy('book_id')->map(function ($group) {
      return $group->first();
    })->sortByDesc('created_at')->values();
  
    // return document_title as title
    $all_single_document = SingleDocument::where('created_by', $id)->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'title' => $item->document_title,
        'document_content' => $item->document_content,
        'created_by' => $item->created_by,
        'isPublished' => $item->isPublished,
        'created_at' => $item->created_at,
        'updated_at' => $item->updated_at,
        'type' => $item->type
      ];
    })->sortByDesc('created_at');
  
    $all_main_book_and_single_document = $unique_main_books->merge($all_single_document);
  
    return response()->json(
      [
        'status' => 200,
        'message' => "All main book and single document in descending order",
        'data' => $all_main_book_and_single_document
      ]
    );
  }
  
}
