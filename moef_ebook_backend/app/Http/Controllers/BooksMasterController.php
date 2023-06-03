<?php

namespace App\Http\Controllers;

use App\Models\BooksMaster;
use Illuminate\Http\Request;
use File;
use App\Models\SingleDocument;
use App\Models\MainBook;
// use App\Models\BookCategory;

class BooksMasterController extends Controller
{
    public function index(Request $request)
    {
        $booksMasters = BooksMaster::all();
        return response()->json(
            [
                'status'=>200,
                'books_masters'=>$booksMasters
            ]
        );
    }

    public function store(Request $request)
    {
        $booksMaster = new BooksMaster();
        $booksMaster->CatID = $request->CatID;
        $booksMaster->Title = $request->Title;
        $booksMaster->short_desc = $request->short_desc;
        $booksMaster->PublisherID = $request->PublisherID;
        // $booksMaster->BookCoverImage = $request->BookCoverImage;
        $booksMaster->LanguageID= $request->LanguageID;
        $booksMaster->Publish_date = $request->Publish_date;
        // $booksMaster->file_url = $request->file_url;
        $booksMaster->created_by = $request->created_by;
        $booksMaster->AuthorID = $request->AuthorID;

        if ($request->hasFile('BookCoverImage')) {
            $image = $request->file('BookCoverImage');
            $imageName =time().'.'. $image->getClientOriginalName();
            $image->move('images/', $imageName);
            $booksMaster->BookCoverImage= $imageName;    
        }
        $booksMaster->save();


        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster,
                'message'=>"Book created successfully"
            ]
        );
    }

    public function show(Request $request ,string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->update($request->all());

        return response()->json(
            [
                'status' => 200,
                'books_master' => $booksMaster
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->delete();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Books Master deleted successfully'
            ]
        );
    }

    public function getAllBookAndDocumentsByCategoryID(Request $request, string $id)
    {
        $booksMaster = BooksMaster::where('CatID', $id)->where('isPublished', 1)->get();
        $singleDocuments = SingleDocument::where('isPublished', 1)->get();
        $booksMaster = $booksMaster->merge($singleDocuments);
        return response()->json(
            [
                'status' => 200,
                'data' => $booksMaster
            ]
        );
    }

    public function deleteMainBook(Request $request, string $id)
    {
        //delete all the main books and this master book and all the associated chapters & paragraphs
        // $booksMaster = BooksMaster::findOrFail($id);
        // $booksMaster->delete();
        // $books = MainBook::where('book_id', $id)->get();
        // foreach ($books as $book) {
        //     $book->delete();
        // }
        // $chapter = Chapter::where('book_id', $id)->get();
        // foreach ($chapter as $chap) {
        //     $chap->delete();
        // }
        // $paragraph = Paragraph::where('book_id', $id)->get();
        // foreach ($paragraph as $para) {
        //     $para->delete();
        // }
        // return response()->json(
        //     [
        //         'status' => 200,
        //         'message' => 'Books Master deleted successfully'
        //     ]
        // );



        $booksMaster = BooksMaster::findOrFail($id);
        $booksMaster->delete();
        $books = MainBook::where('book_id', $id)->get();
        foreach ($books as $book) {
            $book->delete();
        }
        return response()->json(
            [
                'status' => 200,
                'message' => 'Books Master deleted successfully'
            ]
        );
    }

    public function getAllBookCategoryFromBookMaster() {
        $booksMaster = BooksMaster::with('category')->get()->unique('CatID');
        $bookCategory = [];
        foreach ($booksMaster as $book) {
            if($book->category != null) {
                array_push($bookCategory, $book->category);
            }
        }
        return response()->json(
            [
                'status' => 200,
                'bookcategories' => $bookCategory
            ]
        );
    }
}
