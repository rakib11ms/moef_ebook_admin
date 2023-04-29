<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsNotice extends Model
{
    use HasFactory;
    protected $table = 'news_notices';
    protected $primarykey = 'id';
    protected $fillable = [
        'Title',
        'Description',
        'Image',
        'CategoryId',
        'subCatId',
        'redirect_url',
        'created_by',
        'updated_by',
        'isPublished',
    ];
}
