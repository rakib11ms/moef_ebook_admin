<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;
    protected $table = 'user_profile';
    protected $primaryKey = 'profileID';
    protected $fillable = [
        'userID',
        'name',
        'bookId',
        'bookmarksID',
        'notificationsId',
        'isEmail',
        'isPhone',
        'isUserName',
        'isPicture',
        'isVerified',
    ];
}
