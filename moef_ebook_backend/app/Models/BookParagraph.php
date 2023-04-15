<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookParagraph extends Model
{
    use HasFactory;
    protected $table = 'book_paragraphs';
    protected $primaryKey = 'paragraphId';
    protected $fillable = [
        'paragraphName',
        'bookId',
        'chapterId',
    ];
}
