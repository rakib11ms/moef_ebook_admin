<?php

namespace App\Http\Controllers;

use App\Models\BookParagraph;
use Illuminate\Http\Request;


class BookParagraphController extends Controller
{
    public function index(Request $request)
    {
        $bookParagraphs = BookParagraph::all();
   return response()->json(
            ['status'=>200,
            'book_paragraphs'=>$bookParagraphs
            ]
        ); 

           }

    public function store(Request $request)
    {
        $bookParagraph = new bookParagraph();
        $bookParagraph->ParagraphName=$request->paragraphName;
        $bookParagraph->bookId=$request->bookId;
        $bookParagraph->chapterId=$request->chapterId;
        $bookParagraph->save();
   return response()->json(
            ['status'=>200,
            'bookParagraph'=>'Book Paragraph Created Successfully'
            ]
        ); 
    }

    public function show(Request $request, $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        return response()->json($bookParagraph, 200);
    }

    public function update(Request $request, string $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        $bookParagraph->update($request->all());
        return response()->json($bookParagraph, 200);
    }

    public function destroy(Request $request, string $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        $bookParagraph->delete();
        return response()->json(['message' => 'Deleted Successfully'], 200);
    }
}
