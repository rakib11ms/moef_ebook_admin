<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BooksMaster extends Model
{
    use HasFactory;
    protected $table = 'BooksMaster';
    protected $primaryKey = 'BookID';
    protected $fillable = [
        'CatID',
        'Title',
        'author',
        'short_desc',
        'publisher_id',
        'BookCoverImage',
        'language_id',
        'publish_date',
        'file_url',
        'created_by',
        'Author_id'
    ];
}
