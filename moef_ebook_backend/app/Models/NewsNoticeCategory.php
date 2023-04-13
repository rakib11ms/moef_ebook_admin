<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNoticeCategory extends Model
{
    use HasFactory;
    protected $table = 'news_notice_category';
    protected $primaryKey = 'CategoryId';
    protected $fillable = [
        'Name',
        'isActive',
        'created_by',
    ];
}
