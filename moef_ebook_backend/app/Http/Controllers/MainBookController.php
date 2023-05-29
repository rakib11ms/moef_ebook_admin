<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\MainBook;
use App\Models\BookChapter;
use App\Models\BookParagraph;
use App\Models\SingleDocument;
use Illuminate\Support\Facades\DB;
use App\Models\BooksMaster;
use Rajurayhan\Bndatetime\BnDateTimeConverter;

class MainBookController extends Controller
{
  public function getAllMainBook() 
  {
    $all_main_book = MainBook::with('bookMaster','bookChapter','bookParagraph')->get();
    return response()->json(
      [
        'status'=>200,
        'message'=>"All main book",
        'book'=>$all_main_book
      ]
    );
  }

  public function getMainBookByID($id) 
  {
    $main_book_by_id = MainBook::with('bookMaster','bookChapter','bookParagraph')->find($id);
    // $main_book_by_id = MainBook::find($id);

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
    $create_book->type = 'main_book';
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
    $main_book = MainBook::with('bookMaster')->find($id);
    
    $main_book->update($request->all());

    return response()->json(
      [
        'status'=>200,
        'data'=>$main_book,
        'message'=>"Main book updated successfully"
      ]
    );
  }

  // public function deleteMainBook($id)
  // {
  //   $main_book = MainBook::find($id);
  //   $main_book->delete();

  //   return response()->json(
  //     [
  //       'status'=>200,
  //       'message'=>"Main book deleted successfully"
  //     ]
  //   );
  // }

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
    $all_book_count = MainBook::with('bookMaster')->select('id', 'book_id', 'chapter_id', 'paragraph_id', 'book_id')->get();

    $book_count = array();
    $book_ids = array();

    
    foreach ($all_book_count as $book) {
      $book_id = $book->book_id;
      $id = $book->id;
        
      if (in_array($book_id, $book_ids)) {
        continue;
      }

      $book_count[] = [
        'id' => $id,
        'book_id' => $book_id,
        'book_title' => $book->bookMaster->Title,
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
    // $all_main_book = MainBook::with('bookMaster')->get()->map(function ($item, $key) {
    //   return [
    //     'id' => $item->id,
    //     'book_id' => $item->book_id,
    //     'chapter_id' => $item->chapter_id,
    //     'paragraph_id' => $item->paragraph_id,
    //     'book_content' => $item->book_content,
    //     'created_by' => $item->created_by,
    //     'isPublished' => $item->isPublished,
    //     'created_at' => $item->created_at,
    //     'updated_at' => $item->updated_at,
    //     'book_master_title' => $item->bookMaster->Title,
    //     'type' => $item->type
    //   ];
    // });

    // get all main book by unique book_id
    $all_main_book=MainBook::with('bookMaster')->get()->unique('book_id')->map(function ($item, $key) {
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
        'book_cover' => $item->bookMaster->BookCoverImage,
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

  public function getLeatestTwoMainBooksAndSingleDocumentsInDecendingOrder() 
  {
    $dateConverter = new BnDateTimeConverter();

    $all_main_book = MainBook::with('bookMaster', 'user')->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'created_by' => $item->created_by,
        'created_at' => $item->created_at,
        'title' => $item->bookMaster->Title,
        'type' => $item->type,
        'user_name' => $item->user->UserName,
      ];
    });

    $all_single_document = SingleDocument::with('user')->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'title' => $item->document_title,
        'created_by' => $item->created_by,
        // convet created_at to 2018-09-07 12:19:50 pm
        'created_at' => $item->created_at,
        'type' => $item->type,
        'user_name' => $item->user->UserName,
      ];
    });

    $all_main_book = $all_main_book->map(function ($item) use ($dateConverter) {
      $item['created_at_ban'] = $dateConverter->getConvertedDateTime($item['created_at'], 'BnEn', '');
      return $item;
    });

    $all_single_document = $all_single_document->map(function ($item) use ($dateConverter) {
      $item['created_at_ban'] = $dateConverter->getConvertedDateTime($item['created_at'], 'BnEn', '');
      return $item;
    });

    $all_main_book_and_single_document = $all_main_book->merge($all_single_document);

    $sorted_collection = $all_main_book_and_single_document->sortByDesc('created_at')->values()->take(2)->all(); 

    return response()->json(
      [
        'status'=>200,
        'message'=>"All main book and single document in descending order",
        'data'=>$sorted_collection
      ]
    );
  }

  public function getAllBookAndDocumentsByCategoryID(Request $request, string $id)
  {
    $booksMaster = MainBook::with(['bookMaster' => function ($query) use ($id) {
      $query->where('CatID', $id);
    }])
    ->get();

    $booksMaster = $booksMaster->pluck('bookMaster');
    foreach ($booksMaster as $key => $value) {
      if ($value == null) {
        $booksMaster->forget($key);
      }
    }
    // dd($booksMaster->toArray());
  
    // $booksMaster = $booksMaster->map(function ($item, $key) {
    //   return [
    //     'book_id' => $item->id,
    //     // 'book_id' => $item->book_id,
    //     // 'chapter_id' => $item->chapter_id,
    //     // 'paragraph_id' => $item->paragraph_id,
    //     // 'book_content' => $item->book_content,
    //     // 'created_by' => $item->created_by,
    //     // 'isPublished' => $item->isPublished,
    //     'created_at' => $item->created_at,
    //     'updated_at' => $item->updated_at,
    //     'book_master_title' => $item->Title,
    //     'type' => $item->type
    //   ];
    // });
    
    $singleDocuments = SingleDocument::where('isPublished', 1)->get();

    $booksMaster = $booksMaster->merge($singleDocuments);
    return response()->json(
        [
          'status' => 200,
          'data' => $booksMaster
        ]
    );
  }

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
  
    //return as an array
    if($unique_main_books->count() > 0 && $all_single_document->count() > 0) {
      $all_main_book_and_single_document = $unique_main_books->merge($all_single_document)->values();
    } else if($unique_main_books->count() > 0 && $all_single_document->count() == 0) {
      $all_main_book_and_single_document = $unique_main_books->values();
    } else if($unique_main_books->count() == 0 && $all_single_document->count() > 0) {
      $all_main_book_and_single_document = $all_single_document->values();
    } else {
      $all_main_book_and_single_document = [];
    }
  
    return response()->json(
      [
        'status' => 200,
        'message' => "All main book and single document in descending order",
        'data' => $all_main_book_and_single_document
      ]
    );
  }

  //global search by books or documents functions

  public function globalSearchByBookOrDocuments($search)
  {

    $results1 =MainBook::with(['bookMaster','bookChapter','bookParagraph'])->whereHas('bookMaster', function ($query) use ($search) {
      $query->where('Title',  'LIKE', '%'.$search.'%');
    })->orWhere('book_content',  'LIKE', '%'.$search.'%')->select('book_id','type')->distinct('book_id')->get()->toArray();



    $results2 = SingleDocument::where('document_title',  'LIKE', '%'.$search.'%')->orWhere('document_contents','LIKE', '%name%')->get()->toArray();

    $results = array_merge($results1, $results2);

    $collection = collect($results);
    $main_book_count=$collection->where('type','main_book')->count();
    $single_document_count=$collection->where('type','single_document')->count();

    return response()->json(
      ['status'=>200,
      'data'=>$results,
      // 'x'=>$results4,
      'main_book_count'=>$main_book_count.'টি বই পাওয়া গিয়েছে',
      'single_document_count'=>$single_document_count.'টি ডকুমেন্ট পাওয়া গিয়েছে' 
    ]);
  }

  public function getAllDraftBooksAndSingleDocumentsByUserID($id) 
  {
    $all_draft_main_book = MainBook::where('created_by', $id)->where('isPublished', 0)->get()->map(function ($item, $key) {
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
    $unique_draft_main_books = $all_draft_main_book->groupBy('book_id')->map(function ($group) {
      return $group->first();
    })->sortByDesc('created_at')->values();
  
    // return document_title as title
    $all_draft_single_document = SingleDocument::where('created_by', $id)->where('isPublished', 0)->get()->map(function ($item, $key) {
      return [
        'id' => $item->id,
        'title' => $item->document_title,
        'document_content' => $item->document_contents,
        'created_by' => $item->created_by,
        'isPublished' => $item->isPublished,
        'created_at' => $item->created_at,
        'updated_at' => $item->updated_at,
        'type' => $item->type
      ];
    })->sortByDesc('created_at');
  
    //return as an array
    if($unique_draft_main_books->count() > 0 && $all_draft_single_document->count() > 0) {
      $all_draft_main_book_and_single_document = $unique_draft_main_books->merge($all_draft_single_document)->values();
    } else if($unique_draft_main_books->count() > 0 && $all_draft_single_document->count() == 0) {
      $all_draft_main_book_and_single_document = $unique_draft_main_books->values();
    } else if($unique_draft_main_books->count() == 0 && $all_draft_single_document->count() > 0) {
      $all_draft_main_book_and_single_document = $all_draft_single_document->values();
    } else {
      $all_draft_main_book_and_single_document = [];
    }

    return response()->json(
      [
        'status' => 200,
        'message' => "All draft main book and single document in descending order",
        'data' => $all_draft_main_book_and_single_document
      ]
    );
  }

  public function publishMainBook($id) 
  {
    $main_book = MainBook::find($id);
    $main_book->isPublished = 1;
    $main_book->save();

    return response()->json(
      [
        'status' => 200,
        'message' => "Main book published successfully",
        'data' => $main_book
      ]
    );
  }

  public function getAllMainBookByBookMasterID($id) 
  {
    $all_main_book = MainBook::where('book_id', $id)
    ->where('isPublished', 1)
    ->with(['bookMaster', 'bookChapter', 'bookParagraph'])
    ->get();

    $bookName = $all_main_book[0]->bookMaster->Title;
    
    $chapters = $all_main_book->groupBy('bookChapter.ChapterName'); // Group by chapter name

    $chapterData = [];

    foreach ($chapters as $chapterName => $chapterItems) {
        $paragraphs = $chapterItems->map(function ($item) {
            return [
              'paragraph_id' => $item->paragraph_id,
              'paragraph_name' => $item->bookParagraph->ParagraphName,
              'book_content' => $item->book_content,
              'main_book_id' => $item->id,
            ];
        });

        $chapterData[] = [
          'book_id' => $chapterItems[0]->book_id,
          'book_name' => $chapterItems[0]->bookMaster->Title,
          'chapter_id' => $chapterItems[0]->chapter_id,
          'chapter_name' => $chapterName,
          'paragraphs' => $paragraphs,
        ];
    }

    return response()->json([
      'status' => 200,
      'message' => "All main book by book master id",
      'data' => $chapterData
    ]);
  }

  public function getAllChpterByBookMasterID($id) 
  {
    $all_main_book = MainBook::where('book_id', $id)
    ->where('isPublished', 1)
    ->with(['bookMaster', 'bookChapter',])
    ->get();


    $chapters = $all_main_book->groupBy('bookChapter.ChapterName'); // Group by chapter name

    $chapterData = [];

    foreach ($chapters as $chapterName => $chapterItems) {
        $chapterData[] = [
          'chapter_id' => $chapterItems[0]->chapter_id,
          'chapter_name' => $chapterName,
        ];
    }

    return response()->json([
      'status' => 200,
      'data' => $chapterData
    ]);
  }

  public function getAllParagraphsByChapterID($id)
  {
    $all_main_book = MainBook::where('chapter_id', $id)
    ->where('isPublished', 1)
    ->with(['bookMaster', 'bookChapter', 'bookParagraph'])
    ->get();

    $paragraphs = $all_main_book->groupBy('bookParagraph.ParagraphName'); // Group by paragraph name

    $paragraphData = [];

    foreach ($paragraphs as $paragraphName => $paragraphItems) {
      $paragraphData[] = [
        'paragraph_name' => $paragraphName,
        'paragraph_content' => $paragraphItems[0]->book_content,
      ];
    }

    return response()->json([
      'status' => 200,
      'data' => $paragraphData
    ]);
  }

  // public function getAllMainBooksByOrder($order)
  // {
  //   // all main book with 
  // }
}