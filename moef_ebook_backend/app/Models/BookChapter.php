<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookChapter extends Model
{
    use HasFactory;
    protected $table = 'book_chapters';
    protected $primaryKey='id';
    protected $fillable = [
        'ChapterName',
        'BookID',
    ];
}
