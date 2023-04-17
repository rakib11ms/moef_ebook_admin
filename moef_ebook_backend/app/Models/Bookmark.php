<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    use HasFactory;
    protected $table = 'bookmarks';
    protected $primaryKey = 'bookmarksID';
    protected $fillable = [
        'User_ID',
        'Location',
        'created_by',
        'Book_id',
    ];
}
