<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookReview extends Model
{
    use HasFactory;
    protected $table='book_reviews';
    protected $primaryKey='id';
    protected $fillable = [
        'UserID',
        'Rating',
        'Comment',
        'BookID',
    ];
}
