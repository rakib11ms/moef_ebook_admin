<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BooksDetails extends Model
{
    use HasFactory;
    protected $table = 'book_details';
    protected $primaryKey = 'bookdetailsId';
    protected $fillable = [
        'bookId',
        'ChapterId',
        'ParagrpahId',
        'pageNum',
        'Details',
        'created_by',
    ];
}
