<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookSubCategory extends Model
{
    use HasFactory;
    protected $table = 'book_sub_categories';
    protected $primaryKey = 'id';
    protected $fillable = [
        'SubCatName',
        'CategoryID',
        'Created_by',
    ];

    public function bookCategory()
    {
        return $this->belongsTo('App\Models\BookCategory', 'CategoryID');
    }
}