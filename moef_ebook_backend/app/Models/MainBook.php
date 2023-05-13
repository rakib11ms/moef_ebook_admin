<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainBook extends Model
{
    use HasFactory;
    protected $table = 'main_books';
    protected $primaryKey = 'id';

    protected $fillable = [
        'book_id',
        'chapter_id',
        'paragraph_id',
        'book_content',
    ];

    public function bookMaster() {
        return $this->belongsTo('App\Models\BooksMaster','book_id');
    }

    public function bookChapter() {
        return $this->belongsTo('App\Models\BookChapter','chapter_id');
    }

    public function bookParagraph() {
        return $this->belongsTo('App\Models\BookParagraph','paragraph_id');
    }
}
