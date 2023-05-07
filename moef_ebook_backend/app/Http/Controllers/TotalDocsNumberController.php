<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SingleDocument;
use App\Models\BookChapter;
use App\Models\BooksMaster;
use Rakibhstu\Banglanumber\NumberToBangla;


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
        $booksMaster = $numberToBangla->bnNum(BooksMaster::all()->count());

        // return as an array
        return response()->json([
            'status' => 200,
            'singleDocs' => $singleDocs,
            'bookChapter' => $bookChapter,
            'booksMaster' => $booksMaster,
        ]);
    }
}
