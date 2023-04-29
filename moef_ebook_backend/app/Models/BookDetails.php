<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookDetails extends Model
{
    use HasFactory;
    protected $table = 'book_details';
    protected $primaryKey='id';
    protected $fillable = [
        'BookID',
        'ChapterID',
        'ParagraphID',
        'PageNum',
        'Details',
        'Created_by',
    ];
}
