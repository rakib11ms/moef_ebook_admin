<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsNoticeCategory;
use App\Models\NewsNoticeSubCategory;

class NewsCategoryController extends Controller
{
    public function saveNewsCategorySubCategory(Request $request){
          $save_sub_catergory=new NewsNoticeSubCategory();
            $save_sub_catergory->sub_category_name=$request->sub_category_name;
            $save_sub_catergory->category_id=$request->category_id;
            $save_sub_catergory->save();
    }

    public function saveNewsCategory(Request $request){
            $save_catergory=new NewsNoticeCategory();
            $save_catergory->category_name=$request->category_name;
            $save_catergory->save();
    }
}
