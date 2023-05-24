<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BooksMaster extends Model
{
    use HasFactory;
    protected $table = 'books_masters';
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
        'created_by',
        'AuthorID',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'CatID', 'id');
    }

    public function mainBooks()
    {
        return $this->hasMany(MainBooks::class, 'BookID', 'id');
    }
}
