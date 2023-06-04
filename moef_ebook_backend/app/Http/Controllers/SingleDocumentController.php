<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SingleDocument;
use App\Models\NewsNotice;
use App\Models\MainBook;
use Carbon;
use File;

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
    

        if ($request->title !== null && $request->contents !== null && $request->noticeNewsCheckBoxStatus==false && $request->book_id == null && $request->chapter_id == null && $request->paragraph_id == null) {
            $single_document = new SingleDocument();
            $single_document->category = 'শ্রেণী বহির্ভূত';
            $single_document->document_title = $request->title;
            // $single_document->sub_category=$request->sub_category;
            $single_document->published_date = Carbon\Carbon::now();
            $single_document->document_contents = $request->contents;
            $single_document->created_by = $request->created_by;
            $single_document->type = 'single_document';
            $single_document->isPublished = 1;
            $single_document->save();
            return response()->json([
                'status' => 200,
                'message' => 'ডকুমেন্ট তৈরি হয়েছে'

            ]);
        } 
        if ($request->title !== null && $request->contents !== null && $request->noticeNewsCheckBoxStatus==true && $request->book_id == null && $request->chapter_id == null && $request->paragraph_id == null ) {
         $single_document = new SingleDocument();
            $single_document->category = 'শ্রেণী বহির্ভূত';
            $single_document->document_title = $request->title;
            // $single_document->sub_category=$request->sub_category;
            $single_document->published_date = Carbon\Carbon::now();
            $single_document->document_contents = $request->contents;
            $single_document->created_by = $request->created_by;
            $single_document->type = 'single_document';
            $single_document->isPublished = 1;
            $single_document->save();

            $newsNotice = new NewsNotice();
            $newsNotice->Title = $request->title;
            $newsNotice->Description = $request->contents;
            $newsNotice->CategoryId = $request->notice_news_category_id;
            $newsNotice->subCatId = $request->notice_news_subcategory_id;
            $newsNotice->redirect_url = $request->redirect_url;
            // $newsNotice->created_by = auth('sanctum')->user()->UserID;
            $newsNotice->created_by = $request->created_by;
            $newsNotice->isPublished = 1;
            $newsNotice->save();
            return response()->json([
                'status' => 200,
                'message' => 'ডকুমেন্ট এবং নোটিশ তৈরি হয়েছে',
            ]);
        }
    
        if ($request->title !== null && $request->contents !== null && $request->noticeNewsCheckBoxStatus==false && $request->book_id !== null && $request->chapter_id !== null && $request->paragraph_id !== null) {

            $create_book = new MainBook();
            $create_book->book_id = $request->book_id;
            $create_book->chapter_id = $request->chapter_id;
            $create_book->paragraph_id = $request->paragraph_id;
            $create_book->book_content = $request->contents;
            $create_book->created_by = $request->created_by;
            $create_book->type = 'main_book';
            $create_book->isPublished = 1;
            $create_book->save();


            $single_document = new SingleDocument();
            $single_document->category = 'শ্রেণী বহির্ভূত';
            $single_document->document_title = $request->title;
            // $single_document->sub_category=$request->sub_category;
            $single_document->published_date = Carbon\Carbon::now();
            $single_document->document_contents = $request->contents;
            $single_document->created_by = $request->created_by;
            $single_document->type = 'single_document';
            $single_document->isPublished = 1;
            $single_document->save();

            return response()->json([
                'status' => 200,
                'message' => 'ডকুমেন্ট এবং বই তৈরি হয়েছে',

            ]);
        }
      
   
        if ($request->hasFile('file')) {
            $single_document=new SingleDocument();

            $file = $request->file('file');
            $fileName =time().'.'. $file->getClientOriginalName();
            $file->move('files/', $fileName);
            $single_document->file= $fileName;   

         $single_document->document_title=$request->document_title;
        $single_document->type = 'single_document';
        $single_document->category = 'শ্রেণী বহির্ভূত';
        $single_document->created_by = $request->created_by;
        $single_document->isPublished = 1;
        $single_document->save();
  return response()->json(
            [
                'status' => 200,
                'message' => 'ডকুমেন্ট তৈরি হয়েছে'
            ]
        ); 
        }
  

    }



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
         if($request->hasFile('file')){
            // delete old image
            $old_file = $single_document->file;
            if($old_file!== null){
                $file_path = public_path('files/' . $old_file);
                if(file_exists($file_path)){
                    unlink($file_path);
                }
            }
            // upload new file
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('files/', $filename);
            $single_document->file = $filename;
                        $single_document->document_title = $request->document_title;

                    $single_document->update();
                         return response()->json([
            'status' => 200,
            'message' => 'Document updated sucessfully',
            'single_document' => $single_document,
        ]);


        }
        else{

            $single_document->document_title = $request->document_title;
            $single_document->document_contents = $request->document_contents;

        $single_document->update();

        return response()->json([
            'status' => 200,
            'message' => 'Document updated sucessfully',
            'single_document' => $single_document,
        ]);

    }
}

    public function deleteSingleDocument($id)
    {
        $single_document = SingleDocument::find($id);
        if($single_document->file !==null){
            // delete old file
            $old_file = $single_document->file;
                $file_path = public_path('files/' . $old_file);
                if(file_exists($file_path)){
                    unlink($file_path);
                }
    
        }
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