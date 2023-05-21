<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SingleDocument;
use App\Models\NewsNotice;
use App\Models\MainBook;
use Carbon;

class SingleDocumentController extends Controller
{

    public function allSingleDocument()
    {
        $single_document = SingleDocument::all();
        return response()->json([
            'status' => 200,
            'single_document' => $single_document,

        ]);
    }
    public function saveSingleDocument(Request $request)
    {

        if ($request->title !== null && $request->contents !== null && $request->book_id == null && $request->chapter_id == null && $request->paragraph_id == null && $request->notice_news_category_id == null && $request->redirect_url == null) {
            $single_document = new SingleDocument();
            $single_document->category = 'শ্রেণী বহির্ভূত';
            $single_document->document_title = $request->title;
            // $single_document->sub_category=$request->sub_category;
            $single_document->published_date = Carbon\Carbon::now();
            $single_document->document_contents = $request->contents;
            $single_document->created_by = $request->created_by;
            $single_document->save();
            return response()->json([
                'status' => 200,
                'message' => 'Document created sucessfully'

            ]);
        } 
         if ($request->title !== null && $request->contents !== null && $request->notice_news_category_id == !null && $request->redirect_url == !null && $request->book_id == null && $request->chapter_id == null && $request->paragraph_id == null ) {

            $newsNotice = new NewsNotice();
            $newsNotice->Title = $request->title;
            $newsNotice->Description = $request->contents;
            $newsNotice->CategoryId = $request->notice_news_category_id;
            $newsNotice->subCatId = $request->notice_news_subcategory_id;
            $newsNotice->redirect_url = $request->redirect_url;
            // $newsNotice->created_by = auth('sanctum')->user()->UserID;
            $newsNotice->created_by = $request->created_by;
            $newsNotice->save();
            return response()->json([
                'status' => 200,
                'message' => 'notice news created successfully',
            ]);
        }
        if ($request->contents !== null && $request->book_id !== null && $request->chapter_id !== null && $request->paragraph_id !== null && $request->notice_news_category_id == null && $request->redirect_url == null) {

            $create_book = new MainBook();
            $create_book->book_id = $request->book_id;
            $create_book->chapter_id = $request->chapter_id;
            $create_book->paragraph_id = $request->paragraph_id;
            $create_book->book_content = $request->contents;
            $create_book->created_by = $request->created_by;
            $create_book->save();
            return response()->json([
                'status' => 200,
                'message' => 'Main Book created successfully',

            ]);
        } 

        if ($request->contents !== null && $request->notice_news_category_id == !null && $request->redirect_url == !null && $request->book_id !== null && $request->chapter_id !== null && $request->paragraph_id !== null) {

            $create_book = new MainBook();
            $create_book->book_id = $request->book_id;
            $create_book->chapter_id = $request->chapter_id;
            $create_book->paragraph_id = $request->paragraph_id;
            $create_book->book_content = $request->contents;
            $create_book->created_by = $request->created_by;
            $create_book->save();


            $newsNotice = new NewsNotice();
            $newsNotice->Title = $request->title;
            $newsNotice->Description = $request->contents;
            $newsNotice->CategoryId = $request->notice_news_category_id;
            $newsNotice->subCatId = $request->notice_news_subcategory_id;
            $newsNotice->redirect_url = $request->redirect_url;
            // $newsNotice->created_by = auth('sanctum')->user()->UserID;
            $newsNotice->created_by = $request->created_by;
            $newsNotice->save();

            return response()->json([
                'status' => 200,
                'message' => 'Main Book and notice news created successfully',

            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Something went wrong',
            ]);
        }


    }




    // else if($request->notice_news_category_id==null &&$request->book_id !==null ){
    //                $create_book= new MainBook();
    //                $create_book->book_id=$request->book_id;
    //                $create_book->chapter_id=$request->chapter_id;
    //                $create_book->paragraph_id=$request->paragraph_id;
    //                $create_book->book_content=$request->contents;
    //                $create_book->created_by = $request->created_by;
    //                $create_book->save();
    //                      return response()->json([
    //     'status' => 200,
    //     'message' => 'book created successfully',

    // ]);

    //         }
    // }


    public function getSingleDocument($id)
    {
        $single_document = SingleDocument::find($id);
        return response()->json([
            'status' => 200,
            'single_document' => $single_document,
            // 'message'=>'Document saved sucessfully'

        ]);

    }

    public function updateSingleDocument(Request $request, $id)
    {
        $single_document = SingleDocument::find($id);

        if ($request->document_title != null){
            $single_document->document_title = $request->document_title;
        }
        if ($request->document_title != null){
            $single_document->document_contents = $request->document_contents;
        }

        $single_document->update();

        return response()->json([
            'status' => 200,
            'message' => 'Document updated sucessfully',
            'single_document' => $single_document,
        ]);

    }

    public function deleteSingleDocument($id)
    {
        $single_document = SingleDocument::find($id);
        $single_document->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Document deleted sucessfully',
        ]);
    }

    public function publishSingleDocument($id)
    {
        $single_document = SingleDocument::find($id);
        $single_document->isPublished = 1;
        $single_document->update();
        // dd($single_document);
        return response()->json([
            'status' => 200,
            'message' => $single_document->document_title . ' published sucessfully',
        ]);
    }
}