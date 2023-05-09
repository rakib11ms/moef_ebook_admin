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
            [
                'status'=>200,
                'book_paragraphs'=>$bookParagraphs
            ]
        ); 
    }

    public function store(Request $request)
    {
        $bookParagraph = new bookParagraph();
        $bookParagraph->ParagraphName=$request->ParagraphName;
        $bookParagraph->BookID=$request->BookID;
        $bookParagraph->ChapterID=$request->chapterID;
        $bookParagraph->save();
        return response()->json(
            [
                'status'=>200,
                'book_paragraph'=>$bookParagraph,
                'message'=>"Book Paragraph created successfully"
            ]
        );
    }

    public function show(Request $request, $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        return response()->json(
            [
                'status'=>200,
                'book_paragraph'=>$bookParagraph
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        $bookParagraph->update($request->all());
        return response()->json(
            [
                'status'=>200,
                'book_paragraph'=>$bookParagraph
            ]
        );
    }

    public function destroy(Request $request, string $id)
    {
        $bookParagraph = BookParagraph::findOrFail($id);
        $bookParagraph->delete();
        return response()->json(
            [
                'status'=>200,
                'message'=>'Book Paragraph deleted successfully'
            ]
        );
    }
}
