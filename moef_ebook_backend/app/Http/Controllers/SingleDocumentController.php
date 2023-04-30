<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SingleDocument;

class SingleDocumentController extends Controller
{

    public function allSingleDocument(){
        $single_document=SingleDocument::all();
        return response()->json([
            'status' => 200,
            'single_document' => $single_document,
       
        ]);
    }
    public function saveSingleDocument(Request $request){
        $single_document=new SingleDocument();
        $single_document->category=$request->category;
        $single_document->sub_category=$request->sub_category;
        $single_document->published_date=$request->published_date;
        $single_document->document_contents=$request->document_contents;
        $single_document->save();

    }
    public function getSingleDocument($id){
        $single_document=SingleDocument::find($id);
        return response()->json([
            'status' => 200,
            'single_document' => $single_document,
            'message'=>'Document saved sucessfully'
       
        ]);

    }
}
