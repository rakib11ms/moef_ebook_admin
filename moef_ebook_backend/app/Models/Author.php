<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    protected $table='authors';
    protected $primaryKey='id';
    protected $fillable = [
        'Name',
        'Bio',
        'Website_url',
        'Created_by',
    ];
}
