<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNoticeSubCategory extends Model
{
    use HasFactory;
    protected $table = 'news_notice_sub_categories';
    protected $primaryKey = 'subCatId';
    protected $fillable = [
        'CategoryId', 'Name', 'created_by'
    ];
}
