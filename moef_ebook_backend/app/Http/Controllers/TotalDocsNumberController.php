<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SingleDocument;
use App\Models\BookChapter;
// use App\Models\BooksMaster;
use App\Models\MainBook;
use Rakibhstu\Banglanumber\NumberToBangla;
use DB;

class TotalDocsNumberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $singleDocs = SingleDocument::all()->count();
        // $bookChapter = BookChapter::all()->count();
        // $booksMaster = BooksMaster::all()->count();
        $numberToBangla = new NumberToBangla();
        $singleDocs = $numberToBangla->bnNum(SingleDocument::all()->count());
        $bookChapter = $numberToBangla->bnNum(BookChapter::all()->count());

        // all unique book_id from main_books table
        $booksMaster =  $numberToBangla->bnNum(MainBook::with('bookMaster')->get()->unique('book_id')->count());

        // return as an array
        return response()->json([
            'status' => 200,
            'singleDocs' => $singleDocs,
            'bookChapter' => $bookChapter,
            'booksMaster' => $booksMaster,
        ]);
    }
}
