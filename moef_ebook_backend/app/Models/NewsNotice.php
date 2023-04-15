<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNotice extends Model
{
    use HasFactory;
    protected $table = 'news_notice';
    protected $primaryKey = 'NoticeID';
    protected $fillable = [
        'Title',
        'Description',
        'image',
        'created_by',
        'CategoryId',
        'subCatId',
        'redirect_url',
        'created_by',
        'updated_by',
        'isPublished',
    ];
}
