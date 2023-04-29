<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNoticeCategory extends Model
{
    use HasFactory;
    protected $table = 'news_notice_categories';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Name',
        'IsActive',
        'created_by',
    ];
}
