<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BooksMaster extends Model
{
    use HasFactory;
    protected $table = 'books_master';
    protected $primaryKey='id';
    protected $fillable = [
        'CatID',
        'Title',
        'Short_desc',
        'PublisherID',
        'BookCoverImage',
        'LanguageID',
        'Publish_date',
        'File_url',
        'Created_by',
        'AuthorID',
    ];
}
