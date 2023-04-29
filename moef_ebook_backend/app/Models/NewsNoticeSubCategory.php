<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNoticeSubCategory extends Model
{
    use HasFactory;
    protected $table = 'news_notice_sub_categories';
    protected $primarykey = 'id';
    protected $fillable = [
        'CategoryID',
        'Name',
        'created_by',
    ];
    public function categoryName() {
        return $this->belongsTo('App\Models\NewsNoticeCategory','CategoryID');
    }

}
